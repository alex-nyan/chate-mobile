import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Article, VideoEpisode, VideoSeries } from '../data/content';
import type { Localized } from '../i18n/strings';
import { fetchSheetTab, isSheetConfigured } from './sheets';

/**
 * Append-only remote content from a Google Sheet (see `sheets.ts`). New webinars
 * and articles are added by appending rows; the app merges them on top of the
 * bundled data in `content.ts`. Mirrors the blog's stale-while-revalidate shape:
 *   in-memory cache → AsyncStorage snapshot → network revalidate → bundled fallback.
 */

export type RemoteContent = { articles: Article[]; videoSeries: VideoSeries[] };

const STORAGE_KEY = 'chate.remoteContent.v1';
const WEBINARS_TAB = 'webinars';
const ARTICLES_TAB = 'articles';

// ── Row → model parsing ─────────────────────────────────────────────────────

/** Build a Localized value, falling back to English when the Burmese cell is blank. */
function loc(en: string | undefined, my: string | undefined): Localized {
  const e = (en ?? '').trim();
  const m = (my ?? '').trim();
  return { en: e, my: m || e };
}

/** Split one language's body cell into sections. A line starting with `## `
 *  begins a heading; blank lines separate paragraphs. */
function splitSections(body: string): { heading: string; text: string }[] {
  return (body ?? '')
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n');
      if (lines[0].startsWith('## ')) {
        return { heading: lines[0].slice(3).trim(), text: lines.slice(1).join('\n').trim() };
      }
      return { heading: '', text: block };
    });
}

/** Pair EN/MY sections by index into the Article `body` shape. */
function parseBody(en: string, my: string): Article['body'] {
  const enSecs = splitSections(en);
  const mySecs = splitSections(my);
  const n = Math.max(enSecs.length, mySecs.length);
  const out: Article['body'] = [];
  for (let i = 0; i < n; i++) {
    const e = enSecs[i] ?? { heading: '', text: '' };
    const m = mySecs[i] ?? e;
    out.push({ heading: loc(e.heading, m.heading), text: loc(e.text, m.text) });
  }
  return out;
}

function parseWebinars(rows: Record<string, string>[]): VideoSeries[] {
  const byId = new Map<string, VideoSeries>();
  const order: string[] = [];
  for (const r of rows) {
    const seriesId = (r.seriesId ?? '').trim();
    const epId = (r.id ?? '').trim();
    const youtubeId = (r.youtubeId ?? '').trim();
    if (!seriesId || !epId || !youtubeId) continue; // skip incomplete rows

    let series = byId.get(seriesId);
    if (!series) {
      series = {
        id: seriesId,
        name: (r.seriesName ?? '').trim() || seriesId,
        description: (r.seriesDescription ?? '').trim(),
        episodes: [],
      };
      byId.set(seriesId, series);
      order.push(seriesId);
    }
    const ep: VideoEpisode = {
      id: epId,
      title: (r.title ?? '').trim(),
      youtubeId,
      date: (r.date ?? '').trim(),
    };
    const speaker = (r.speaker ?? '').trim();
    if (speaker) ep.speaker = speaker;
    series.episodes.push(ep);
  }
  return order.map((id) => byId.get(id)!);
}

function parseArticles(rows: Record<string, string>[]): Article[] {
  const out: Article[] = [];
  for (const r of rows) {
    const id = (r.id ?? '').trim();
    const titleEn = (r.title_en ?? '').trim();
    if (!id || !titleEn) continue; // need at least an id + English title

    out.push({
      id,
      icon: (r.icon ?? '').trim() || 'document-text-outline',
      category: loc(r.category_en, r.category_my),
      title: loc(r.title_en, r.title_my),
      summary: loc(r.summary_en, r.summary_my),
      body: parseBody(r.body_en ?? '', r.body_my ?? ''),
    });
  }
  return out;
}

// ── Fetch + in-memory cache + persistence ───────────────────────────────────
let cache: RemoteContent | null = null;
// True once a network fetch has succeeded this session; a disk-hydrated cache is
// considered stale, so `fetchRemoteContent` still revalidates over the wire.
let fetchedFromNetwork = false;

/** Synchronously read already-cached remote content (null until hydrate/fetch). */
export function getCachedRemoteContent(): RemoteContent | null {
  return cache;
}

async function persist(content: RemoteContent): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    /* Best-effort: a failed write just means no offline snapshot this time. */
  }
}

/** Seed the in-memory cache from the persisted snapshot (if any). */
export async function hydrateFromStorage(): Promise<RemoteContent | null> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RemoteContent;
    if (!parsed || !Array.isArray(parsed.articles) || !Array.isArray(parsed.videoSeries)) {
      return null;
    }
    cache = parsed; // leave fetchedFromNetwork false so we still revalidate
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Fetch + parse both sheet tabs. Returns the in-memory cache once a network
 * fetch has succeeded this session. If only one tab fails, the other still
 * updates (the failed tab keeps its previously cached value). Throws when the
 * sheet isn't configured or both tabs fail, so callers fall back to the
 * hydrated snapshot or the bundled data.
 */
export async function fetchRemoteContent(): Promise<RemoteContent> {
  if (fetchedFromNetwork && cache) return cache;
  if (!isSheetConfigured()) throw new Error('Google Sheet not configured');

  const [webRes, artRes] = await Promise.allSettled([
    fetchSheetTab(WEBINARS_TAB),
    fetchSheetTab(ARTICLES_TAB),
  ]);
  if (webRes.status === 'rejected' && artRes.status === 'rejected') {
    throw webRes.reason ?? new Error('Remote content fetch failed');
  }

  const content: RemoteContent = {
    videoSeries:
      webRes.status === 'fulfilled' ? parseWebinars(webRes.value) : (cache?.videoSeries ?? []),
    articles: artRes.status === 'fulfilled' ? parseArticles(artRes.value) : (cache?.articles ?? []),
  };
  cache = content;
  fetchedFromNetwork = true;
  void persist(content);
  return content;
}
