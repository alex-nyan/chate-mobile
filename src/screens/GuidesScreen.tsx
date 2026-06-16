import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { Text } from '../components/Text';
import { VideoCard } from '../components/VideoCard';
import {
  type Article,
  type BlogCategory,
  type VideoEpisode,
  type VideoSeries,
  articles,
  blogPosts,
  videoSeries,
} from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui, type Localized } from '../i18n/strings';
import { fetchBloggerPosts, getCachedPosts, type BloggerPost } from '../lib/blogger';
import { haptics } from '../lib/haptics';
import { share } from '../lib/share';
import { useIsOffline } from '../lib/useIsOffline';
import { useBookmarks } from '../state/BookmarksContext';
import { radius, shadow, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import type { GuidesListProps } from '../navigation/types';

type Tab = 'guides' | 'webinars' | 'blog';

const TABS: { id: Tab; label: Localized; icon: 'book-outline' | 'play-circle-outline' | 'newspaper-outline' }[] = [
  { id: 'guides', label: ui.segGuides, icon: 'book-outline' },
  { id: 'webinars', label: ui.segWebinars, icon: 'play-circle-outline' },
  { id: 'blog', label: ui.segBlog, icon: 'newspaper-outline' },
];

// US / UK stay as-is (proper-noun abbreviations); the rest are localized.
const BLOG_CATS: Array<{ id: BlogCategory | 'all'; label: Localized | string }> = [
  { id: 'all', label: ui.blogAll },
  { id: 'US', label: 'US' },
  { id: 'UK', label: 'UK' },
  { id: 'Scholarships', label: ui.blogScholarships },
  { id: 'Testing', label: ui.blogTesting },
  { id: 'About', label: ui.blogAbout },
];

/** Category accent — US/UK get a brighter hue on dark; the rest follow the theme. */
function catColor(category: BlogCategory, isDark: boolean, colors: Palette): string {
  switch (category) {
    case 'US':
      return isDark ? '#6FA0FF' : '#2563EB';
    case 'UK':
      return isDark ? '#B69BFF' : '#7C3AED';
    case 'Scholarships':
      return colors.accent;
    case 'Testing':
      return colors.success;
    case 'About':
      return colors.primary;
  }
}

function openURL(url: string) {
  haptics.light();
  Linking.openURL(url).catch(() => {});
}

// ── Search matching (searches both languages so a Burmese query hits English
// data and vice-versa) ──
function articleMatches(a: Article, q: string): boolean {
  return [a.title.en, a.title.my, a.summary.en, a.summary.my, a.category.en, a.category.my].some(
    (s) => s.toLowerCase().includes(q),
  );
}
function videoMatches(ep: VideoEpisode, series: VideoSeries, q: string): boolean {
  return (
    ep.title.toLowerCase().includes(q) ||
    (ep.speaker ?? '').toLowerCase().includes(q) ||
    series.name.toLowerCase().includes(q)
  );
}
function blogMatches(p: { title: string; category: string }, q: string): boolean {
  return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
}

function ArticleRow({ article, onPress }: { article: Article; onPress: () => void }) {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(article.id);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.articleCard, pressed && styles.pressed]}
    >
      <View style={styles.iconBadge}>
        <Ionicons name={article.icon as any} size={22} color={colors.primary} />
      </View>
      <View style={styles.articleText}>
        <Text style={styles.articleCategory}>{t(article.category)}</Text>
        <Text style={styles.articleTitle}>{t(article.title)}</Text>
        <Text style={styles.articleSummary} numberOfLines={2}>
          {t(article.summary)}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          haptics.selection();
          toggleBookmark(article.id);
        }}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityState={{ selected: saved }}
        accessibilityLabel={saved ? t(ui.saved) : t(ui.save)}
        style={styles.bookmarkBtn}
      >
        <Ionicons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={saved ? colors.primary : colors.textMuted}
        />
      </Pressable>
    </Pressable>
  );
}

function ContinueCard({ article, onPress }: { article: Article; onPress: () => void }) {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${t(ui.continueReading)}: ${t(article.title)}`}
      style={({ pressed }) => [styles.continueCard, pressed && styles.pressed]}
    >
      <View style={styles.continueText}>
        <View style={styles.continueLabelRow}>
          <Ionicons name="book" size={13} color={colors.primaryDark} />
          <Text style={styles.continueLabel}>{t(ui.continueReading)}</Text>
        </View>
        <Text style={styles.continueTitle} numberOfLines={2}>
          {t(article.title)}
        </Text>
      </View>
      <View style={styles.continuePlay}>
        <Ionicons name="arrow-forward" size={20} color={colors.textInverse} />
      </View>
    </Pressable>
  );
}

/** Shared by the live feed (BloggerPost) and the hardcoded offline fallback. */
type BlogCardPost = {
  id: string;
  title: string;
  date: string;
  category: BlogCategory;
  url: string;
};

function BlogCard({ post, onPress }: { post: BlogCardPost; onPress: () => void }) {
  const { t } = useLang();
  const { colors, isDark } = useTheme();
  const styles = useThemedStyles(createStyles);
  const accent = catColor(post.category, isDark, colors);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.blogCard, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={post.title}
    >
      <View style={[styles.blogCatChip, { backgroundColor: accent + '22' }]}>
        <Text style={[styles.blogCatText, { color: accent }]}>{post.category}</Text>
      </View>
      <Text style={styles.blogTitle}>{post.title}</Text>
      <View style={styles.blogFooter}>
        <Text style={styles.blogDate}>{post.date}</Text>
        <View style={styles.blogFooterActions}>
          <Pressable
            onPress={() => share({ title: post.title, message: post.title, url: post.url })}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={`${t(ui.share)}: ${post.title}`}
            style={styles.blogShareBtn}
          >
            <Ionicons name="share-outline" size={15} color={colors.textMuted} />
          </Pressable>
          <Ionicons name="chevron-forward" size={15} color={colors.textMuted} />
        </View>
      </View>
    </Pressable>
  );
}

export function GuidesScreen({ navigation }: GuidesListProps) {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const { bookmarks, lastRead } = useBookmarks();
  const offline = useIsOffline();

  const [tab, setTab] = useState<Tab>('guides');
  const [blogCat, setBlogCat] = useState<BlogCategory | 'all'>('all');
  const [query, setQuery] = useState('');

  // Live blog feed — seeded from the in-memory cache so revisits are instant.
  const [livePosts, setLivePosts] = useState<BloggerPost[] | null>(() => getCachedPosts());
  const [blogStatus, setBlogStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  // Fetch the blog feed once; the hardcoded list is the offline fallback.
  useEffect(() => {
    if (livePosts) return;
    let active = true;
    setBlogStatus('loading');
    fetchBloggerPosts()
      .then((posts) => {
        if (!active) return;
        setLivePosts(posts);
        setBlogStatus('idle');
      })
      .catch(() => active && setBlogStatus('error'));
    return () => {
      active = false;
    };
  }, [livePosts]);

  const openArticle = (id: string) => {
    haptics.light();
    navigation.navigate('ArticleDetail', { articleId: id });
  };

  // Live posts open in the in-app reader; the hardcoded fallback (label URLs
  // only) opens on the blog.
  const openBlogPost = (post: BlogCardPost) => {
    haptics.light();
    if (livePosts) navigation.navigate('BlogPost', { postId: post.id });
    else openURL(post.url);
  };

  const blogSource: BlogCardPost[] = livePosts ?? blogPosts;
  const filteredPosts =
    blogCat === 'all' ? blogSource : blogSource.filter((p) => p.category === blogCat);

  const continueArticle = lastRead ? articles.find((a) => a.id === lastRead) : undefined;
  const savedArticles = bookmarks
    .map((id) => articles.find((a) => a.id === id))
    .filter((a): a is Article => Boolean(a));

  // Search results across all three content types.
  const results = useMemo(() => {
    if (!searching) return { articles: [], videos: [], posts: [], total: 0 };
    const matchedArticles = articles.filter((a) => articleMatches(a, q));
    const matchedVideos = videoSeries.flatMap((s) =>
      s.episodes.filter((ep) => videoMatches(ep, s, q)).map((ep) => ({ ep, series: s })),
    );
    const matchedPosts = blogSource.filter((p) => blogMatches(p, q));
    return {
      articles: matchedArticles,
      videos: matchedVideos,
      posts: matchedPosts,
      total: matchedArticles.length + matchedVideos.length + matchedPosts.length,
    };
  }, [q, searching, blogSource]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.tabArticles)} />

      {/* Search */}
      <View style={[styles.searchWrap, searching && styles.searchWrapBorder]}>
        <View style={styles.searchField}>
          <Ionicons name="search" size={17} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t(ui.searchPlaceholder)}
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            returnKeyType="search"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            accessibilityLabel={t(ui.searchPlaceholder)}
          />
          {searching && (
            <Pressable
              onPress={() => setQuery('')}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={t(ui.searchClear)}
            >
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Segment control (hidden while searching) */}
      {!searching && (
        <View style={styles.segRow}>
          {TABS.map(({ id, label, icon }) => {
            const active = tab === id;
            return (
              <Pressable
                key={id}
                onPress={() => {
                  haptics.selection();
                  setTab(id);
                }}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                style={[styles.segBtn, active && styles.segBtnActive]}
              >
                <Ionicons
                  name={icon}
                  size={15}
                  color={active ? colors.primaryDark : colors.textMuted}
                />
                <Text style={[styles.segLabel, active && styles.segLabelActive]}>
                  {t(label)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        key={searching ? 'search' : tab}
      >
        {/* ── Search results ── */}
        {searching ? (
          results.total === 0 ? (
            <View style={styles.emptyWrap}>
              <Ionicons name="search" size={32} color={colors.textMuted} />
              <Text style={styles.emptyText}>
                {t(ui.searchNoResults).replace('{query}', query.trim())}
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.sectionNote}>
                {t(ui.searchResultsCount).replace('{count}', String(results.total))}
              </Text>

              {results.articles.length > 0 && (
                <>
                  <Text style={styles.resultGroup}>{t(ui.segGuides)}</Text>
                  {results.articles.map((a) => (
                    <ArticleRow key={a.id} article={a} onPress={() => openArticle(a.id)} />
                  ))}
                </>
              )}

              {results.videos.length > 0 && (
                <>
                  <Text style={styles.resultGroup}>{t(ui.segWebinars)}</Text>
                  {results.videos.map(({ ep, series }) => (
                    <VideoCard key={ep.id} ep={ep} series={series} />
                  ))}
                </>
              )}

              {results.posts.length > 0 && (
                <>
                  <Text style={styles.resultGroup}>{t(ui.segBlog)}</Text>
                  {results.posts.map((post) => (
                    <BlogCard key={post.id} post={post} onPress={() => openBlogPost(post)} />
                  ))}
                </>
              )}
            </>
          )
        ) : (
          <>
            {/* ── Guides tab ── */}
            {tab === 'guides' && (
              <>
                {continueArticle && (
                  <ContinueCard
                    article={continueArticle}
                    onPress={() => openArticle(continueArticle.id)}
                  />
                )}

                {savedArticles.length > 0 && (
                  <>
                    <Text style={styles.sectionNote}>{t(ui.savedHeader)}</Text>
                    {savedArticles.map((a) => (
                      <ArticleRow key={`saved-${a.id}`} article={a} onPress={() => openArticle(a.id)} />
                    ))}
                  </>
                )}

                <Text style={styles.sectionNote}>{t(ui.exploreGuides)}</Text>
                {articles.map((a) => (
                  <ArticleRow key={a.id} article={a} onPress={() => openArticle(a.id)} />
                ))}
              </>
            )}

            {/* ── Webinars tab ── */}
            {tab === 'webinars' && (
              <>
                {videoSeries.map((series) => (
                  <View key={series.id} style={styles.seriesSection}>
                    <Text style={styles.seriesName}>{series.name}</Text>
                    <Text style={styles.seriesDesc}>{series.description}</Text>
                    {series.episodes.map((ep) => (
                      <VideoCard key={ep.id} ep={ep} series={series} />
                    ))}
                  </View>
                ))}
              </>
            )}

            {/* ── Blog tab ── */}
            {tab === 'blog' && (
              <>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.catFilterRow}
                  style={styles.catFilterScroll}
                >
                  {BLOG_CATS.map(({ id, label }) => {
                    const active = blogCat === id;
                    return (
                      <Pressable
                        key={id}
                        onPress={() => {
                          haptics.selection();
                          setBlogCat(id);
                        }}
                        accessibilityRole="button"
                        accessibilityState={{ selected: active }}
                        style={[styles.catChip, active && styles.catChipActive]}
                      >
                        <Text style={[styles.catChipLabel, active && styles.catChipLabelActive]}>
                          {t(label)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>

                {blogStatus === 'loading' && !livePosts ? (
                  <View style={styles.blogStateWrap}>
                    <ActivityIndicator color={colors.primary} />
                    <Text style={styles.blogStateText}>{t(ui.blogLoading)}</Text>
                  </View>
                ) : (
                  <>
                    {(offline || (blogStatus === 'error' && !livePosts)) && (
                      <Text style={styles.blogStateNote}>
                        {t(offline ? ui.offline : ui.blogLoadError)}
                      </Text>
                    )}

                    <Text style={styles.sectionNote}>
                      {t(ui.blogCountNote).replace('{count}', String(filteredPosts.length))}
                    </Text>

                    {filteredPosts.map((post) => (
                      <BlogCard key={post.id} post={post} onPress={() => openBlogPost(post)} />
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.surface },

    // Search
    searchWrap: {
      backgroundColor: colors.bg,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.sm,
    },
    searchWrapBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchField: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: colors.surface,
      borderRadius: radius.pill,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.md,
    },
    searchInput: {
      flex: 1,
      fontFamily: 'Lexend_400Regular',
      fontSize: 14.5,
      color: colors.text,
      paddingVertical: 9,
      // react-native-web: remove the default browser focus ring shown while
      // typing (`outlineStyle` isn't in RN's TextStyle type, hence the cast).
      ...({ outlineStyle: 'none' } as object),
    },

    // Segment control
    segRow: {
      flexDirection: 'row',
      backgroundColor: colors.bg,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.sm,
      paddingTop: spacing.xs,
      gap: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    segBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      paddingVertical: 7,
      borderRadius: radius.pill,
      backgroundColor: colors.surface,
    },
    segBtnActive: {
      backgroundColor: colors.primaryTint,
    },
    segLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
    },
    segLabelActive: {
      color: colors.primaryDark,
      fontWeight: '700',
    },

    content: { padding: spacing.lg, paddingBottom: 100 },
    sectionNote: {
      fontSize: 13,
      color: colors.textMuted,
      marginBottom: spacing.md,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    resultGroup: {
      fontSize: 13,
      color: colors.primaryDark,
      marginBottom: spacing.md,
      marginTop: spacing.sm,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    emptyWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: spacing.xxl * 2,
      gap: spacing.md,
    },
    emptyText: {
      fontSize: 14.5,
      color: colors.textMuted,
      textAlign: 'center',
      paddingHorizontal: spacing.xl,
    },

    // Continue reading
    continueCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.primaryTint,
      borderRadius: radius.lg,
      padding: spacing.md,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    continueText: { flex: 1 },
    continueLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginBottom: 3,
    },
    continueLabel: {
      fontSize: 11.5,
      fontWeight: '800',
      color: colors.primaryDark,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    continueTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text,
      lineHeight: 22,
    },
    continuePlay: {
      width: 40,
      height: 40,
      borderRadius: radius.pill,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Article cards (Guides tab)
    articleCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.bg,
      borderRadius: radius.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadow.card,
    },
    pressed: { opacity: 0.7, transform: [{ scale: 0.99 }] },
    iconBadge: {
      width: 46,
      height: 46,
      borderRadius: radius.md,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    articleText: { flex: 1 },
    articleCategory: {
      fontSize: 11.5,
      fontWeight: '800',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 1,
    },
    articleTitle: {
      fontSize: 15.5,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 2,
    },
    articleSummary: {
      fontSize: 13,
      lineHeight: 18,
      color: colors.textMuted,
    },
    bookmarkBtn: {
      paddingLeft: spacing.xs,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Video series (Webinars tab)
    seriesSection: { marginBottom: spacing.xl },
    seriesName: {
      fontSize: 18,
      fontWeight: '900',
      color: colors.primaryDark,
      marginBottom: spacing.xs,
    },
    seriesDesc: {
      fontSize: 13,
      color: colors.textMuted,
      lineHeight: 18,
      marginBottom: spacing.md,
    },
    // Blog tab
    blogStateWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xxl,
      gap: spacing.sm,
    },
    blogStateText: { fontSize: 13.5, color: colors.textMuted },
    blogStateNote: {
      fontSize: 12.5,
      color: colors.textMuted,
      marginBottom: spacing.md,
      fontStyle: 'italic',
    },
    catFilterScroll: { marginBottom: spacing.sm, marginHorizontal: -spacing.lg },
    catFilterRow: { paddingHorizontal: spacing.lg, gap: spacing.sm },
    catChip: {
      paddingHorizontal: spacing.md,
      paddingVertical: 6,
      minHeight: 34,
      borderRadius: radius.pill,
      backgroundColor: colors.bg,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    catChipActive: {
      backgroundColor: colors.primaryTint,
      borderColor: colors.primary,
    },
    catChipLabel: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '600',
      color: colors.textMuted,
      textAlign: 'center',
      textAlignVertical: 'center',
      includeFontPadding: false,
    },
    catChipLabelActive: {
      color: colors.primaryDark,
      fontWeight: '700',
    },
    blogCard: {
      backgroundColor: colors.bg,
      borderRadius: radius.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadow.card,
    },
    blogCatChip: {
      alignSelf: 'flex-start',
      borderRadius: radius.pill,
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      marginBottom: spacing.xs,
    },
    blogCatText: {
      fontSize: 11,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    blogTitle: {
      fontSize: 14.5,
      fontWeight: '700',
      color: colors.text,
      lineHeight: 21,
      marginBottom: spacing.xs,
    },
    blogFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    blogDate: {
      fontSize: 12,
      color: colors.textMuted,
    },
    blogFooterActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    blogShareBtn: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
