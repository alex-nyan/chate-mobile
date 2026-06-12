import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Haptics only make sense on physical mobile devices. On web (incl. the desktop
// browser used for testing) we no-op so there are no Vibration-API warnings.
const enabled = Platform.OS === 'ios' || Platform.OS === 'android';

/** Fire-and-forget haptic feedback that never throws. */
export const haptics = {
  /** Light selection tick — e.g. switching a tab or segment. */
  selection() {
    if (enabled) Haptics.selectionAsync().catch(() => {});
  },
  /** Light impact — e.g. tapping a card or link. */
  light() {
    if (enabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  },
};
