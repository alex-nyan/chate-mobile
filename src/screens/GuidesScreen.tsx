import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import {
  type BlogCategory,
  type BlogPost,
  type VideoEpisode,
  type VideoSeries,
  articles,
  blogPosts,
  videoSeries,
} from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { colors, radius, shadow, spacing } from '../theme/colors';
import type { GuidesListProps } from '../navigation/types';

type Tab = 'guides' | 'webinars' | 'blog';

const TABS: { id: Tab; label: string; icon: 'book-outline' | 'play-circle-outline' | 'newspaper-outline' }[] = [
  { id: 'guides', label: 'Guides', icon: 'book-outline' },
  { id: 'webinars', label: 'Webinars', icon: 'play-circle-outline' },
  { id: 'blog', label: 'Blog', icon: 'newspaper-outline' },
];

const BLOG_CATS: Array<{ id: BlogCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'US', label: 'US' },
  { id: 'UK', label: 'UK' },
  { id: 'Scholarships', label: 'Scholarships' },
  { id: 'Testing', label: 'Testing' },
  { id: 'About', label: 'About ချိတ်' },
];

const CAT_COLOR: Record<BlogCategory, string> = {
  US: '#2563EB',
  UK: '#7C3AED',
  Scholarships: colors.accent,
  Testing: colors.success,
  About: colors.primary,
};

function openURL(url: string) {
  Linking.openURL(url).catch(() => {});
}

function VideoCard({ ep, series }: { ep: VideoEpisode; series: VideoSeries }) {
  const url = `https://www.youtube.com/watch?v=${ep.youtubeId}`;
  const thumb = `https://img.youtube.com/vi/${ep.youtubeId}/mqdefault.jpg`;

  return (
    <Pressable
      onPress={() => openURL(url)}
      style={({ pressed }) => [styles.videoCard, pressed && styles.pressed]}
      accessibilityRole="link"
      accessibilityLabel={ep.title}
    >
      <View style={styles.thumbWrap}>
        <Image source={{ uri: thumb }} style={styles.thumb} resizeMode="cover" />
        <View style={styles.playOverlay}>
          <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.92)" />
        </View>
      </View>
      <View style={styles.videoMeta}>
        <View style={styles.seriesChip}>
          <Text style={styles.seriesChipText} numberOfLines={1}>{series.name}</Text>
        </View>
        <Text style={styles.videoTitle} numberOfLines={2}>{ep.title}</Text>
        <View style={styles.videoFooter}>
          <Text style={styles.videoSpeaker} numberOfLines={1}>{ep.speaker ?? ''}</Text>
          <Text style={styles.videoDate}>{ep.date}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Pressable
      onPress={() => openURL(post.url)}
      style={({ pressed }) => [styles.blogCard, pressed && styles.pressed]}
      accessibilityRole="link"
      accessibilityLabel={post.title}
    >
      <View style={[styles.blogCatChip, { backgroundColor: CAT_COLOR[post.category] + '18' }]}>
        <Text style={[styles.blogCatText, { color: CAT_COLOR[post.category] }]}>{post.category}</Text>
      </View>
      <Text style={styles.blogTitle}>{post.title}</Text>
      <View style={styles.blogFooter}>
        <Text style={styles.blogDate}>{post.date}</Text>
        <Ionicons name="open-outline" size={13} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

export function GuidesScreen({ navigation }: GuidesListProps) {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>('guides');
  const [blogCat, setBlogCat] = useState<BlogCategory | 'all'>('all');

  const filteredPosts = blogCat === 'all'
    ? blogPosts
    : blogPosts.filter((p) => p.category === blogCat);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.tabArticles)} />

      {/* Segment control */}
      <View style={styles.segRow}>
        {TABS.map(({ id, label, icon }) => {
          const active = tab === id;
          return (
            <Pressable
              key={id}
              onPress={() => setTab(id)}
              style={[styles.segBtn, active && styles.segBtnActive]}
            >
              <Ionicons
                name={icon}
                size={15}
                color={active ? colors.primaryDark : colors.textMuted}
              />
              <Text style={[styles.segLabel, active && styles.segLabelActive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        key={tab}
      >
        {/* ── Guides tab ── */}
        {tab === 'guides' && (
          <>
            <Text style={styles.sectionNote}>{t(ui.exploreGuides)}</Text>
            {articles.map((a) => (
              <Pressable
                key={a.id}
                onPress={() => navigation.navigate('ArticleDetail', { articleId: a.id })}
                accessibilityRole="button"
                style={({ pressed }) => [styles.articleCard, pressed && styles.pressed]}
              >
                <View style={styles.iconBadge}>
                  <Ionicons name={a.icon as any} size={22} color={colors.primary} />
                </View>
                <View style={styles.articleText}>
                  <Text style={styles.articleCategory}>{t(a.category)}</Text>
                  <Text style={styles.articleTitle}>{t(a.title)}</Text>
                  <Text style={styles.articleSummary} numberOfLines={2}>
                    {t(a.summary)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </Pressable>
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
                    onPress={() => setBlogCat(id)}
                    style={[styles.catChip, active && styles.catChipActive]}
                  >
                    <Text style={[styles.catChipLabel, active && styles.catChipLabelActive]}>
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Text style={styles.sectionNote}>
              {filteredPosts.length} articles — tap to read on the blog
            </Text>

            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },

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
  videoCard: {
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  thumbWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: colors.primaryTint,
    position: 'relative',
  },
  thumb: { width: '100%', height: '100%' },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11,49,64,0.25)',
  },
  videoMeta: { padding: spacing.md },
  seriesChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryTint,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginBottom: spacing.xs,
  },
  seriesChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoSpeaker: {
    flex: 1,
    fontSize: 12,
    color: colors.textMuted,
    marginRight: spacing.sm,
  },
  videoDate: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },

  // Blog tab
  catFilterScroll: { marginBottom: spacing.sm, marginHorizontal: -spacing.lg },
  catFilterRow: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  catChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catChipActive: {
    backgroundColor: colors.primaryTint,
    borderColor: colors.primary,
  },
  catChipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
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
});
