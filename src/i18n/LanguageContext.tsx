import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang, Localized } from './strings';
import { tr } from './strings';

const STORAGE_KEY = 'chate.lang';

type LanguageContextValue = {
  lang: Lang;
  toggle: () => void;
  setLang: (lang: Lang) => void;
  /** Resolve a Localized value (or plain string) for the active language. */
  t: (value: Localized | string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function persist(lang: Lang) {
  AsyncStorage.setItem(STORAGE_KEY, lang).catch(() => {
    /* Best-effort — a failed write just means the choice isn't remembered. */
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  // Wait for the stored choice before rendering, so a returning Burmese user
  // never sees a flash of English on cold start.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (active && (stored === 'en' || stored === 'my')) setLangState(stored);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setHydrated(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persist(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'my' : 'en';
      persist(next);
      return next;
    });
  }, []);

  const t = useCallback((value: Localized | string) => tr(value, lang), [lang]);

  const value = useMemo(() => ({ lang, toggle, setLang, t }), [lang, toggle, setLang, t]);

  if (!hydrated) return null;

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider');
  return ctx;
}
