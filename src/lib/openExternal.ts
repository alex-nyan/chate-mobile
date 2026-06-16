import { Alert, Linking } from 'react-native';

/**
 * Open an external URL (https:, mailto:, tel: …) from a user action. If nothing
 * can handle it — no mail app, no browser, a malformed link — show a friendly
 * alert instead of failing silently. Haptics stay with the caller so this can be
 * reused from non-tap contexts too.
 */
export async function openExternal(
  url: string,
  errorMessage = "Couldn't open this link.",
): Promise<void> {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('', errorMessage);
  }
}
