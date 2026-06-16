import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseFeed, stripEmoji, type BloggerFeedJson, type BloggerPost } from './bloggerParse';

/**
 * Live blog client for chatethehook.blogspot.com.
 *
 * Pure feed parsing lives in `bloggerParse.ts`; this module adds the network
 * fetch and a two-level cache:
 *   1. an in-memory cache so revisiting the tab / opening a post is instant, and
 *   2. an AsyncStorage snapshot so a previously-loaded feed is available offline
 *      and shows immediately on the next cold start (stale-while-revalidate).
 */

export { stripEmoji };
export type { BloggerPost };

const BLOG_BASE = 'https://chatethehook.blogspot.com';
// 83 posts today — ask for more than that so a single request covers them all.
const FEED_URL = `${BLOG_BASE}/feeds/posts/default?alt=json&max-results=200`;
const FETCH_TIMEOUT_MS = 12000;
// Bump the version suffix if the persisted shape ever changes.
const STORAGE_KEY = 'chate.blogger.posts.v1';

// ── In-memory cache ────────────────────────────────────────────────────────
let cache: BloggerPost[] | null = null;
const byId = new Map<string, BloggerPost>();
// True once a network fetch has succeeded this session. A disk-hydrated cache
// is considered *stale*, so `fetchBloggerPosts` still revalidates over the wire.
let fetchedFromNetwork = false;

function setCache(posts: BloggerPost[]): void {
  cache = posts;
  byId.clear();
  for (const p of posts) byId.set(p.id, p);
}

/** Synchronously read already-cached posts (null until the first hydrate/fetch). */
export function getCachedPosts(): BloggerPost[] | null {
  return cache;
}

/** Synchronously read a single already-cached post by id. */
export function getCachedPostById(id: string): BloggerPost | undefined {
  return byId.get(id);
}

// ── Persistence ────────────────────────────────────────────────────────────
async function persist(posts: BloggerPost[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    /* Best-effort: a failed write just means no offline snapshot this time. */
  }
}

/**
 * Seed the in-memory cache from the persisted snapshot (if any). Returns the
 * posts so a screen can render them instantly on cold start while the network
 * revalidation runs. No-op (returns the live cache) once anything is cached.
 */
export async function hydrateFromStorage(): Promise<BloggerPost[] | null> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const posts = JSON.parse(raw) as BloggerPost[];
    if (!Array.isArray(posts) || posts.length === 0) return null;
    // Hydrate the cache but leave `fetchedFromNetwork` false so we still revalidate.
    setCache(posts);
    return posts;
  } catch {
    return null;
  }
}

/**
 * Fetch + parse the blog feed (newest first). Returns the in-memory cache once
 * a network fetch has succeeded this session; a disk-hydrated cache does not
 * short-circuit it, so the feed is always revalidated at least once per launch.
 * Throws on network/parse failure — callers fall back to the hydrated snapshot
 * or the bundled list.
 */
export async function fetchBloggerPosts(): Promise<BloggerPost[]> {
  if (fetchedFromNetwork && cache) return cache;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(FEED_URL, { signal: controller.signal });
    if (!res.ok) throw new Error(`Blogger feed responded ${res.status}`);
    const json = (await res.json()) as BloggerFeedJson;

    const posts = parseFeed(json);

    setCache(posts);
    fetchedFromNetwork = true;
    void persist(posts);
    return posts;
  } finally {
    clearTimeout(timer);
  }
}
