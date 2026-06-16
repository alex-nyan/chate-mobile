import type { BlogCategory } from '../data/content';

/**
 * Pure parsing layer for the Blogger feed — no network or storage, so it's
 * trivially unit-testable. `blogger.ts` adds the fetch + cache + persistence
 * around these helpers.
 *
 * Blogger exposes a public Atom-as-JSON feed (no API key needed) that gives us
 * each post's real per-post URL and full HTML body, so we can render posts
 * *inside* the app instead of bouncing the user out to Blogger.
 *
 * The bodies are mostly Facebook-pasted markup peppered with decorative emojis
 * (🎓🇩🇪📌🪝 …). `stripEmoji` removes those so neither the list titles nor the
 * in-app reader render them.
 */

export const BLOG_BASE = 'https://chatethehook.blogspot.com';

export type BloggerPost = {
  /** Stable id derived from the Blogger entry id, e.g. `post-6662662995099891060`. */
  id: string;
  /** Emoji-stripped plain-text title. */
  title: string;
  /** The real per-post URL (used for sharing / "read on the blog"). */
  url: string;
  /** Human date, e.g. `Apr 2026`. */
  date: string;
  /** ISO publish timestamp (used for sorting). */
  published: string;
  /** Mapped to one of the app's five filter buckets. */
  category: BlogCategory;
  /** Emoji-stripped HTML body, ready to drop into the reader's WebView. */
  contentHtml: string;
};

// ── Emoji stripping ────────────────────────────────────────────────────────
// Match an emoji "core" glyph (pictographs, dingbats, misc symbols/technical),
// an optional variation selector, then any number of ZWJ-joined cores. ZWJ
// (U+200D) is only consumed when it glues two emoji together — a bare ZWJ is
// left alone because Burmese uses it for ligature shaping.
const EMOJI_CORE = '[\\u2300-\\u23FF\\u2600-\\u27BF\\u2B00-\\u2BFF\\u{1F000}-\\u{1FAFF}]\\uFE0F?';
const EMOJI_SEQUENCE = new RegExp(`${EMOJI_CORE}(?:\\u200D${EMOJI_CORE})*`, 'gu');

/** Remove decorative emojis (and their joiners) while leaving real text intact. */
export function stripEmoji(input: string): string {
  return input.replace(EMOJI_SEQUENCE, '');
}

export function cleanTitle(raw: string): string {
  // Collapse the whitespace left behind by removed emojis and trim.
  return stripEmoji(raw)
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// ── Category mapping ───────────────────────────────────────────────────────
// Feed posts carry free-form labels (US, UK, Scholarships, Testing & Curriculum,
// About …, plus country tags). Collapse them into the app's five buckets by
// priority so a post like ['Germany','Scholarships'] lands under Scholarships.
export function mapCategory(terms: string[]): BlogCategory {
  const has = (needle: string) => terms.some((t) => t.includes(needle));
  if (has('UK')) return 'UK';
  if (terms.some((t) => t.startsWith('About'))) return 'About';
  if (has('Testing')) return 'Testing';
  if (has('Scholarships')) return 'Scholarships';
  if (has('US')) return 'US';
  return 'US';
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function entryId(rawId: string): string {
  // `tag:blogger.com,1999:blog-…​.post-6662662995099891060` → `post-6662662995099891060`
  const idx = rawId.lastIndexOf('.');
  return idx >= 0 ? rawId.slice(idx + 1) : rawId;
}

// ── Feed shape (only the fields we read) ───────────────────────────────────
export type FeedEntry = {
  id?: { $t?: string };
  published?: { $t?: string };
  title?: { $t?: string };
  content?: { $t?: string };
  category?: { term?: string }[];
  link?: { rel?: string; type?: string; href?: string }[];
};

export type BloggerFeedJson = { feed?: { entry?: FeedEntry[] } };

export function parseEntry(entry: FeedEntry): BloggerPost | null {
  const rawId = entry.id?.$t;
  const published = entry.published?.$t;
  const contentHtml = entry.content?.$t;
  if (!rawId || !published || !contentHtml) return null;

  const alternate = entry.link?.find((l) => l.rel === 'alternate' && l.type === 'text/html');
  const terms = (entry.category ?? []).map((c) => c.term ?? '').filter(Boolean);

  return {
    id: entryId(rawId),
    title: cleanTitle(entry.title?.$t ?? ''),
    url: alternate?.href ?? BLOG_BASE,
    date: formatDate(published),
    published,
    category: mapCategory(terms),
    contentHtml: stripEmoji(contentHtml),
  };
}

/** Parse a raw feed JSON into posts, newest first. */
export function parseFeed(json: BloggerFeedJson): BloggerPost[] {
  const entries = json.feed?.entry ?? [];
  return entries
    .map(parseEntry)
    .filter((p): p is BloggerPost => p !== null)
    .sort((a, b) => b.published.localeCompare(a.published));
}
