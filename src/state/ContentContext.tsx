import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  articles as bundledArticles,
  videoSeries as bundledSeries,
  type Article,
  type VideoSeries,
} from '../data/content';
import {
  fetchRemoteContent,
  getCachedRemoteContent,
  hydrateFromStorage,
  type RemoteContent,
} from '../lib/remoteContent';

/**
 * Single source of content for the screens. Starts from the bundled arrays
 * (so the UI renders instantly and works offline) and merges in append-only
 * additions from the Google Sheet as they arrive. Merge is by `id`: a remote
 * item with a new id is appended; one that reuses a bundled id replaces it.
 */

type Status = 'idle' | 'loading' | 'ready' | 'error';

type ContentContextValue = {
  articles: Article[];
  videoSeries: VideoSeries[];
  status: Status;
};

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

function mergeArticles(remote: Article[]): Article[] {
  const byId = new Map(bundledArticles.map((a) => [a.id, a] as const));
  for (const a of remote) byId.set(a.id, a);
  return [...byId.values()];
}

function mergeSeries(remote: VideoSeries[]): VideoSeries[] {
  const byId = new Map<string, VideoSeries>(
    bundledSeries.map((s): [string, VideoSeries] => [s.id, { ...s, episodes: [...s.episodes] }]),
  );
  for (const rs of remote) {
    const existing = byId.get(rs.id);
    if (!existing) {
      byId.set(rs.id, rs);
      continue;
    }
    const epById = new Map(existing.episodes.map((e) => [e.id, e] as const));
    for (const e of rs.episodes) epById.set(e.id, e);
    byId.set(rs.id, {
      ...existing,
      name: rs.name || existing.name,
      description: rs.description || existing.description,
      episodes: [...epById.values()],
    });
  }
  return [...byId.values()];
}

export function RemoteContentProvider({ children }: { children: React.ReactNode }) {
  const [remote, setRemote] = useState<RemoteContent | null>(() => getCachedRemoteContent());
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    let active = true;
    (async () => {
      // Show the persisted snapshot first, then revalidate over the network.
      if (!getCachedRemoteContent()) {
        const persisted = await hydrateFromStorage();
        if (active && persisted) setRemote(persisted);
      }
      setStatus('loading');
      try {
        const fresh = await fetchRemoteContent();
        if (active) {
          setRemote(fresh);
          setStatus('ready');
        }
      } catch {
        // No sheet configured / offline / both tabs failed — bundled data stands.
        if (active) setStatus('error');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<ContentContextValue>(
    () => ({
      articles: remote ? mergeArticles(remote.articles) : bundledArticles,
      videoSeries: remote ? mergeSeries(remote.videoSeries) : bundledSeries,
      status,
    }),
    [remote, status],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a RemoteContentProvider');
  return ctx;
}
