import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/** Reader text-size preference. Applied app-wide by the shared `Text` component. */
export type TextScale = 'small' | 'default' | 'large' | 'xl';

const STORAGE_KEY = 'chate.textScale';

const FACTORS: Record<TextScale, number> = {
  small: 0.9,
  default: 1.0,
  large: 1.15,
  xl: 1.3,
};

type TextScaleContextValue = {
  scale: TextScale;
  /** Multiplier applied to font sizes (derived from `scale`). */
  factor: number;
  setScale: (scale: TextScale) => void;
};

const TextScaleContext = createContext<TextScaleContextValue | undefined>(undefined);

function persist(scale: TextScale) {
  AsyncStorage.setItem(STORAGE_KEY, scale).catch(() => {
    /* Best-effort — a failed write just means the choice isn't remembered. */
  });
}

export function TextScaleProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScaleState] = useState<TextScale>('default');
  // Wait for the stored choice before rendering so text never visibly re-flows
  // from default → saved size on cold start.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (active && stored && stored in FACTORS) setScaleState(stored as TextScale);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setHydrated(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const setScale = useCallback((next: TextScale) => {
    setScaleState(next);
    persist(next);
  }, []);

  const value = useMemo(
    () => ({ scale, factor: FACTORS[scale], setScale }),
    [scale, setScale],
  );

  if (!hydrated) return null;

  return <TextScaleContext.Provider value={value}>{children}</TextScaleContext.Provider>;
}

export function useTextScale(): TextScaleContextValue {
  const ctx = useContext(TextScaleContext);
  if (!ctx) throw new Error('useTextScale must be used within a TextScaleProvider');
  return ctx;
}
