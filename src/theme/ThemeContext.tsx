import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, type Palette } from './colors';

/** 'system' follows the OS setting; 'light'/'dark' are explicit overrides. */
export type ThemeMode = 'light' | 'dark' | 'system';
export type Scheme = 'light' | 'dark';

const STORAGE_KEY = 'chate.theme';

type ThemeContextValue = {
  /** The user's preference (may be 'system'). */
  mode: ThemeMode;
  /** The resolved scheme actually being rendered. */
  scheme: Scheme;
  isDark: boolean;
  colors: Palette;
  setMode: (mode: ThemeMode) => void;
  /** Flip between explicit light/dark, seeded from the current resolved scheme. */
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function persist(mode: ThemeMode) {
  AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {
    /* Best-effort — a failed write just means the choice isn't remembered. */
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setModeState] = useState<ThemeMode>('system');
  // Wait for the stored choice before rendering so a returning dark-mode user
  // never sees a flash of light on cold start.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (active && (stored === 'light' || stored === 'dark' || stored === 'system')) {
          setModeState(stored);
        }
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
    persist(next);
  }, []);

  const scheme: Scheme = mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;

  const toggle = useCallback(() => {
    const next: ThemeMode = scheme === 'dark' ? 'light' : 'dark';
    setModeState(next);
    persist(next);
  }, [scheme]);

  const colors = scheme === 'dark' ? darkColors : lightColors;

  const value = useMemo(
    () => ({ mode, scheme, isDark: scheme === 'dark', colors, setMode, toggle }),
    [mode, scheme, colors, setMode, toggle],
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
