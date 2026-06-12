import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { articles } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { colors, radius, spacing } from '../theme/colors';
import type { ArticleDetailProps } from '../navigation/types';

export function ArticleDetailScreen({ route, navigation }: ArticleDetailProps) {
  const { t } = useLang();
  const article = articles.find((a) => a.id === route.params.articleId);

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

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(article.category)} onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconBadge}>
          <Ionicons name={article.icon as any} size={26} color={colors.primary} />
        </View>
        <Text style={styles.category}>{t(article.category)}</Text>
        <Text style={styles.title}>{t(article.title)}</Text>
        <Text style={styles.summary}>{t(article.summary)}</Text>

        <View style={styles.divider} />

        {article.body.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.heading}>{t(section.heading)}</Text>
            <Text style={styles.paragraph}>{t(section.text)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
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
