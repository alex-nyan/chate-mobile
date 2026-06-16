import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Haptics only make sense on physical mobile devices. On web (incl. the desktop
// browser used for testing) we no-op so there are no Vibration-API warnings.
const platformSupports = Platform.OS === 'ios' || Platform.OS === 'android';

// User preference (Settings → Accessibility). Defaults on; HapticsProvider syncs
// the persisted choice here so every call site below respects it without having
// to thread state through the tree.
let prefEnabled = true;

/** Toggle haptics app-wide. Called by HapticsProvider when the setting changes. */
export function setHapticsEnabled(enabled: boolean): void {
  prefEnabled = enabled;
}

const on = () => platformSupports && prefEnabled;

/** Fire-and-forget haptic feedback that never throws. */
export const haptics = {
  /** Light selection tick — e.g. switching a tab or segment. */
  selection() {
    if (on()) Haptics.selectionAsync().catch(() => {});
  },
  /** Light impact — e.g. tapping a card or link. */
  light() {
    if (on()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  },
  /** Medium impact — e.g. press-and-hold on the tab bar. */
  medium() {
    if (on()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  },
};
