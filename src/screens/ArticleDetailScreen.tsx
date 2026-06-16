import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { IconBadge } from '../components/IconBadge';
import { ShareSheet } from '../components/ShareSheet';
import { Text } from '../components/Text';
import { articles, contact } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { haptics } from '../lib/haptics';
import { radius, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { useBookmarks } from '../state/BookmarksContext';
import type { ArticleDetailProps } from '../navigation/types';

export function ArticleDetailScreen({ route, navigation }: ArticleDetailProps) {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const { isBookmarked, toggleBookmark, setLastRead } = useBookmarks();
  const [shareOpen, setShareOpen] = useState(false);
  const article = articles.find((a) => a.id === route.params.articleId);

  // Remember this as the article to "continue reading" from the Guides tab.
  useEffect(() => {
    if (article) setLastRead(article.id);
  }, [article, setLastRead]);

  if (!article) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <AppBar title="" onBack={() => navigation.goBack()} />
        <View style={styles.missing}>
          <Text style={styles.missingText}>Article not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const saved = isBookmarked(article.id);

  const onSave = () => {
    haptics.selection();
    toggleBookmark(article.id);
  };

  // Canonical, deep-linkable URL for this article (matches the linking config's
  // `article/:articleId` route) so a shared link opens straight to it.
  const shareUrl = `${contact.website}/article/${article.id}`;
  const shareText = `${t(article.title)} — ${t(article.summary)}`;

  const onShare = () => {
    haptics.light();
    setShareOpen(true);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(article.category)} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <IconBadge name={article.icon as any} size={52} iconSize={26} style={styles.iconBadge} />
        <Text style={styles.category}>{t(article.category)}</Text>
        <Text style={styles.title}>{t(article.title)}</Text>
        <Text style={styles.summary}>{t(article.summary)}</Text>

        <View style={styles.actions}>
          <Pressable
            onPress={onSave}
            accessibilityRole="button"
            accessibilityState={{ selected: saved }}
            accessibilityLabel={saved ? t(ui.saved) : t(ui.save)}
            style={({ pressed }) => [
              styles.actionBtn,
              saved && styles.actionBtnActive,
              pressed && styles.actionPressed,
            ]}
          >
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={17}
              color={saved ? colors.primary : colors.textMuted}
            />
            <Text style={[styles.actionLabel, saved && styles.actionLabelActive]}>
              {saved ? t(ui.saved) : t(ui.save)}
            </Text>
          </Pressable>

          <Pressable
            onPress={onShare}
            accessibilityRole="button"
            accessibilityLabel={t(ui.share)}
            style={({ pressed }) => [styles.actionBtn, pressed && styles.actionPressed]}
          >
            <Ionicons name="share-outline" size={17} color={colors.textMuted} />
            <Text style={styles.actionLabel}>{t(ui.share)}</Text>
          </Pressable>
        </View>

        <View style={styles.divider} />

        {article.body.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.heading}>{t(section.heading)}</Text>
            <Text style={styles.paragraph}>{t(section.text)}</Text>
          </View>
        ))}
      </ScrollView>

      <ShareSheet
        visible={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl}
        text={shareText}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    content: { padding: spacing.lg, paddingBottom: 100 },
    iconBadge: { marginBottom: spacing.md },
    category: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: spacing.xs,
    },
    title: {
      fontSize: 25,
      fontWeight: '900',
      color: colors.text,
      lineHeight: 33,
      marginBottom: spacing.sm,
    },
    summary: {
      fontSize: 15.5,
      lineHeight: 24,
      color: colors.textMuted,
      fontStyle: 'italic',
    },
    actions: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    actionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radius.pill,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    actionBtnActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryTint,
    },
    actionPressed: { opacity: 0.7 },
    actionLabel: {
      fontSize: 13.5,
      fontWeight: '700',
      color: colors.textMuted,
    },
    actionLabelActive: {
      color: colors.primaryDark,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: spacing.xl,
    },
    section: { marginBottom: spacing.xl },
    heading: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.primaryDark,
      marginBottom: spacing.sm,
    },
    paragraph: {
      fontSize: 15.5,
      lineHeight: 25,
      color: colors.text,
    },
    missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    missingText: { color: colors.textMuted, fontSize: 15 },
  });
