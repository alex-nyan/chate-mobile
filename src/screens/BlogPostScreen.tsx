import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Linking, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { AppBar } from '../components/AppBar';
import { Text } from '../components/Text';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import {
  fetchBloggerPosts,
  getCachedPostById,
  hydrateFromStorage,
  type BloggerPost,
} from '../lib/blogger';
import { spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import type { BlogPostProps } from '../navigation/types';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Wrap the post's (already emoji-stripped) HTML in a themed document. We
 * neutralise the inline colours/backgrounds that come baked into the
 * Facebook-pasted markup so the post follows the app's light/dark theme, make
 * images responsive, and add a header + "read on the blog" footer link.
 */
function buildHtml(
  post: BloggerPost,
  colors: Palette,
  isDark: boolean,
  readOnBlog: string,
): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<style>
  :root { color-scheme: ${isDark ? 'dark' : 'light'}; }
  html, body { margin: 0; padding: 0; background: ${colors.bg}; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Noto Sans Myanmar", "Padauk", Roboto, system-ui, sans-serif;
    color: ${colors.text};
    font-size: 17px;
    line-height: 1.7;
    padding: 4px 16px 48px;
    -webkit-text-size-adjust: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  /* Override the inline colours/backgrounds pasted in from Facebook so the
     post respects the app theme instead of hard-coding black-on-white. */
  body * { color: ${colors.text} !important; background-color: transparent !important; }
  a { color: ${colors.primary} !important; text-decoration: none; word-break: break-word; }
  img {
    max-width: 100% !important;
    width: auto !important;
    height: auto !important;
    border-radius: 12px;
    margin: 10px auto;
    display: block;
  }
  iframe, video, table { max-width: 100% !important; }
  h1.post-title { font-size: 24px; line-height: 1.3; font-weight: 800; margin: 16px 0 4px; }
  .post-meta {
    color: ${colors.textMuted} !important;
    font-size: 12px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .post-meta * { color: ${colors.textMuted} !important; }
  hr.sep { border: 0; border-top: 1px solid ${colors.border}; margin: 18px 0; }
  .post-footer { margin-top: 28px; padding-top: 18px; border-top: 1px solid ${colors.border}; }
  .post-footer a { font-weight: 700; }
</style>
</head>
<body>
  <h1 class="post-title">${escapeHtml(post.title)}</h1>
  <div class="post-meta">${escapeHtml(post.category)} &middot; ${escapeHtml(post.date)}</div>
  <hr class="sep" />
  ${post.contentHtml}
  <div class="post-footer"><a href="${escapeHtml(post.url)}">${escapeHtml(readOnBlog)}</a></div>
</body>
</html>`;
}

export function BlogPostScreen({ route, navigation }: BlogPostProps) {
  const { t } = useLang();
  const { colors, isDark } = useTheme();
  const styles = useThemedStyles(createStyles);
  const { postId } = route.params;

  const [post, setPost] = useState<BloggerPost | null>(() => getCachedPostById(postId) ?? null);
  const [status, setStatus] = useState<'ready' | 'loading' | 'error'>(post ? 'ready' : 'loading');
  // The post HTML loads instantly (it's an in-memory string); this only covers
  // the remote images streaming in afterwards.
  const [webLoading, setWebLoading] = useState(true);

  // Cache miss (e.g. a cold-start or offline deep link) — try the persisted
  // snapshot first, then revalidate over the network.
  useEffect(() => {
    if (post) return;
    let active = true;
    (async () => {
      const persisted = await hydrateFromStorage();
      const cached = persisted?.find((p) => p.id === postId) ?? getCachedPostById(postId);
      if (active && cached) {
        setPost(cached);
        setStatus('ready');
      }
      try {
        const posts = await fetchBloggerPosts();
        const found = posts.find((p) => p.id === postId);
        if (active && found) {
          setPost(found);
          setStatus('ready');
        } else if (active && !cached) {
          setStatus('error');
        }
      } catch {
        if (active && !cached) setStatus('error');
      }
    })();
    return () => {
      active = false;
    };
  }, [post, postId]);

  const html = useMemo(
    () => (post ? buildHtml(post, colors, isDark, t(ui.readOnBlog)) : ''),
    [post, colors, isDark, t],
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={post ? post.category : ''} onBack={() => navigation.goBack()} />

      {status === 'loading' && (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}

      {status === 'error' && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{t(ui.blogNotFound)}</Text>
        </View>
      )}

      {status === 'ready' && post && (
        <View style={styles.webWrap}>
          <WebView
            originWhitelist={['*']}
            source={{ html, baseUrl: post.url }}
            style={styles.web}
            // Keep the reader on our content: the initial document render
            // (navigationType 'other') is allowed, but an actual link tap is
            // sent to the system browser instead of navigating in place.
            onShouldStartLoadWithRequest={(req) => {
              if (req.navigationType === 'click' && /^https?:\/\//.test(req.url)) {
                Linking.openURL(req.url).catch(() => {});
                return false;
              }
              return true;
            }}
            onLoadEnd={() => setWebLoading(false)}
            showsVerticalScrollIndicator={false}
            allowsBackForwardNavigationGestures={false}
          />
          {webLoading && (
            <View style={styles.webLoading} pointerEvents="none">
              <ActivityIndicator color={colors.primary} />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    webWrap: { flex: 1, backgroundColor: colors.bg },
    web: { flex: 1, backgroundColor: colors.bg },
    webLoading: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xl,
    },
    errorText: { color: colors.textMuted, fontSize: 15 },
  });
