import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setHapticsEnabled } from '../lib/haptics';

/**
 * Global haptic-feedback preference (Settings → Accessibility). The value is
 * mirrored into the `haptics` lib via `setHapticsEnabled` so every existing
 * `haptics.*()` call site honours it without threading context through the tree.
 */

const STORAGE_KEY = 'chate.hapticsEnabled';

type HapticsContextValue = {
  hapticsEnabled: boolean;
  setHaptics: (enabled: boolean) => void;
};

const HapticsContext = createContext<HapticsContextValue | undefined>(undefined);

export function HapticsProvider({ children }: { children: React.ReactNode }) {
  // Default on; load the persisted choice and sync it into the lib on mount.
  const [hapticsEnabled, setEnabledState] = useState(true);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (active && stored != null) {
          const enabled = stored === 'true';
          setEnabledState(enabled);
          setHapticsEnabled(enabled);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const setHaptics = useMemo(
    () => (enabled: boolean) => {
      setEnabledState(enabled);
      setHapticsEnabled(enabled);
      AsyncStorage.setItem(STORAGE_KEY, String(enabled)).catch(() => {
        /* Best-effort — a failed write just means the choice isn't remembered. */
      });
    },
    [],
  );

  const value = useMemo(() => ({ hapticsEnabled, setHaptics }), [hapticsEnabled, setHaptics]);

  return <HapticsContext.Provider value={value}>{children}</HapticsContext.Provider>;
}

export function useHaptics(): HapticsContextValue {
  const ctx = useContext(HapticsContext);
  if (!ctx) throw new Error('useHaptics must be used within a HapticsProvider');
  return ctx;
}
