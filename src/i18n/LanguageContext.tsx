import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Lang, Localized } from './strings';
import { tr } from './strings';

type LanguageContextValue = {
  lang: Lang;
  toggle: () => void;
  setLang: (lang: Lang) => void;
  /** Resolve a Localized value (or plain string) for the active language. */
  t: (value: Localized | string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'my' : 'en'));
  }, []);

  const t = useCallback((value: Localized | string) => tr(value, lang), [lang]);

  const value = useMemo(
    () => ({ lang, toggle, setLang, t }),
    [lang, toggle, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider');
  return ctx;
}
