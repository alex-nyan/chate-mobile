import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const STORAGE_KEY = 'chate.reading';

type Persisted = {
  /** Bookmarked article ids, most-recently-saved first. */
  bookmarks: string[];
  /** The article the reader last opened, for "continue reading". */
  lastRead: string | null;
};

type BookmarksContextValue = Persisted & {
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (id: string) => void;
  setLastRead: (id: string) => void;
};

const BookmarksContext = createContext<BookmarksContextValue | undefined>(undefined);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [lastRead, setLastReadState] = useState<string | null>(null);
  // Don't persist until we've loaded, or the first render would clobber storage
  // with empty defaults before hydration finishes.
  const loaded = useRef(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active || !raw) return;
        const parsed = JSON.parse(raw) as Partial<Persisted>;
        if (Array.isArray(parsed.bookmarks)) setBookmarks(parsed.bookmarks);
        if (typeof parsed.lastRead === 'string') setLastReadState(parsed.lastRead);
      })
      .catch(() => {})
      .finally(() => {
        loaded.current = true;
      });
    return () => {
      active = false;
    };
  }, []);

  // Persist on every change once hydrated.
  useEffect(() => {
    if (!loaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ bookmarks, lastRead })).catch(() => {});
  }, [bookmarks, lastRead]);

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [id, ...prev]));
  }, []);

  const setLastRead = useCallback((id: string) => setLastReadState(id), []);

  const value = useMemo(
    () => ({ bookmarks, lastRead, isBookmarked, toggleBookmark, setLastRead }),
    [bookmarks, lastRead, isBookmarked, toggleBookmark, setLastRead],
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks(): BookmarksContextValue {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error('useBookmarks must be used within a BookmarksProvider');
  return ctx;
}
