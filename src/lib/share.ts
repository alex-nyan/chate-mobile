import { Linking, Platform, Share } from 'react-native';
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

/** A named social destination we can deep-link a share intent to. */
export type ShareTarget = 'facebook' | 'whatsapp' | 'telegram' | 'twitter';

/**
 * Web "intent" URLs that open each platform's share dialog — in the installed
 * app where the OS routes the link there (e.g. tapping the Facebook intent on a
 * phone with the app), otherwise in the browser. These work without any SDK or
 * app id.
 *
 * Note: Facebook's sharer only takes the URL and scrapes the page's Open Graph
 * tags for the title/description — a prefilled `quote`/message is no longer
 * honored — so `text` is unused there but kept for the others.
 */
function targetUrl(target: ShareTarget, url: string, text: string): string {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  switch (target) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case 'whatsapp':
      return `https://wa.me/?text=${t}%20${u}`;
    case 'telegram':
      return `https://t.me/share/url?url=${u}&text=${t}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${t}&url=${u}`;
  }
}

/**
 * Open a share intent for a specific platform. Falls back to the OS share sheet
 * if the link can't be opened (no handler / browser).
 */
export async function shareTo(
  target: ShareTarget,
  { url, text }: { url: string; text: string },
): Promise<void> {
  haptics.light();
  const link = targetUrl(target, url, text);
  try {
    await Linking.openURL(link);
  } catch {
    await share({ message: text, url });
  }
}
