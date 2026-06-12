import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { articles } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { colors, radius, shadow, spacing } from '../theme/colors';
import type { GuidesListProps } from '../navigation/types';

export function GuidesScreen({ navigation }: GuidesListProps) {
  const { t } = useLang();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.tabArticles)} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>{t(ui.exploreGuides)}</Text>

        {articles.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => navigation.navigate('ArticleDetail', { articleId: a.id })}
            accessibilityRole="button"
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
          >
            <View style={styles.iconBadge}>
              <Ionicons name={a.icon as any} size={22} color={colors.primary} />
            </View>
            <View style={styles.itemText}>
              <Text style={styles.category}>{t(a.category)}</Text>
              <Text style={styles.title}>{t(a.title)}</Text>
              <Text style={styles.summary} numberOfLines={2}>
                {t(a.summary)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  intro: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.md,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  item: {
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
  itemText: { flex: 1 },
  category: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 1,
  },
  title: {
    fontSize: 15.5,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  summary: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
  },
});
