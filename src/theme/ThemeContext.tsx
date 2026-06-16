import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { blackColors, darkColors, lightColors, type Palette } from './colors';

/** 'system' follows the OS setting; 'light'/'dark' are explicit overrides. */
export type ThemeMode = 'light' | 'dark' | 'system';
export type Scheme = 'light' | 'dark';
/** Which palette to use when the resolved scheme is dark. */
export type DarkVariant = 'blue' | 'black';

const STORAGE_KEY = 'chate.theme';
const VARIANT_KEY = 'chate.darkVariant';

type ThemeContextValue = {
  /** The user's preference (may be 'system'). */
  mode: ThemeMode;
  /** The resolved scheme actually being rendered. */
  scheme: Scheme;
  isDark: boolean;
  colors: Palette;
  setMode: (mode: ThemeMode) => void;
  /** Which dark palette to use ('blue' = original tinted, 'black' = neutral OLED). */
  darkVariant: DarkVariant;
  setDarkVariant: (variant: DarkVariant) => void;
  /** Flip between explicit light/dark, seeded from the current resolved scheme. */
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function persist(key: string, value: string) {
  AsyncStorage.setItem(key, value).catch(() => {
    /* Best-effort — a failed write just means the choice isn't remembered. */
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setModeState] = useState<ThemeMode>('system');
  // Defaults to 'blue' (the original dark palette) so existing dark-mode users
  // see no change unless they opt into the black variant.
  const [darkVariant, setDarkVariantState] = useState<DarkVariant>('blue');
  // Wait for the stored choice before rendering so a returning dark-mode user
  // never sees a flash of light on cold start.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.multiGet([STORAGE_KEY, VARIANT_KEY])
      .then((entries) => {
        if (!active) return;
        const stored = Object.fromEntries(entries);
        const m = stored[STORAGE_KEY];
        const v = stored[VARIANT_KEY];
        if (m === 'light' || m === 'dark' || m === 'system') setModeState(m);
        if (v === 'blue' || v === 'black') setDarkVariantState(v);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setHydrated(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    persist(STORAGE_KEY, next);
  }, []);

  const setDarkVariant = useCallback((next: DarkVariant) => {
    setDarkVariantState(next);
    persist(VARIANT_KEY, next);
  }, []);

  const scheme: Scheme = mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;

  const toggle = useCallback(() => {
    const next: ThemeMode = scheme === 'dark' ? 'light' : 'dark';
    setModeState(next);
    persist(STORAGE_KEY, next);
  }, [scheme]);

  const colors =
    scheme === 'dark' ? (darkVariant === 'black' ? blackColors : darkColors) : lightColors;

  const value = useMemo(
    () => ({
      mode,
      scheme,
      isDark: scheme === 'dark',
      colors,
      setMode,
      darkVariant,
      setDarkVariant,
      toggle,
    }),
    [mode, scheme, colors, setMode, darkVariant, setDarkVariant, toggle],
  );

  if (!hydrated) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}

/**
 * Build a themed StyleSheet from the active palette, memoised by palette identity.
 * Pattern: define `const createStyles = (colors: Palette) => StyleSheet.create({...})`
 * at module scope, then `const styles = useThemedStyles(createStyles)` in the component.
 */
export function useThemedStyles<T>(factory: (colors: Palette) => T): T {
  const { colors } = useTheme();
  return useMemo(() => factory(colors), [factory, colors]);
}
