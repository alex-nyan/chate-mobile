import { Platform, Share } from 'react-native';
import { haptics } from './haptics';

type ShareInput = {
  /** Sheet title (Android) — usually the content title. */
  title?: string;
  /** Body text. */
  message: string;
  /** A URL to attach. iOS shares it as a separate field; elsewhere it's appended. */
  url?: string;
};

/**
 * Fire-and-forget Share sheet that never throws.
 * - iOS keeps `url` as a distinct field (nicer previews).
 * - Android/web fold the URL into the message (Android ignores `url`; web's
 *   navigator.share may reject, which we swallow).
 */
export async function share({ title, message, url }: ShareInput): Promise<void> {
  haptics.light();
  const body = url ? `${message}\n\n${url}` : message;
  try {
    if (Platform.OS === 'ios') {
      await Share.share({ title, message, url });
    } else {
      await Share.share({ title, message: body });
    }
  } catch {
    /* User dismissed, or Share isn't available (e.g. some web browsers). */
  }
}
