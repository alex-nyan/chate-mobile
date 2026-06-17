import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { Text } from '../components/Text';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { haptics } from '../lib/haptics';
import { useBookmarks } from '../state/BookmarksContext';
import { useContent } from '../state/ContentContext';
import { radius, shadow, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import type { RootTabParamList, SavedArticlesProps } from '../navigation/types';

export function SavedArticlesScreen({ navigation }: SavedArticlesProps) {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const { bookmarks } = useBookmarks();
  const { articles } = useContent();
  // The article list (and ArticleDetail) live in the Guides tab — hop there.
  const tabNav = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  const saved = bookmarks
    .map((id) => articles.find((a) => a.id === id))
    .filter((a): a is (typeof articles)[number] => Boolean(a));

  const open = (articleId: string) => {
    haptics.light();
    tabNav.navigate('Guides', { screen: 'ArticleDetail', params: { articleId } });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.savedHeader)} onBack={() => navigation.goBack()} />
      {saved.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="bookmark-outline" size={44} color={colors.textMuted} />
          <Text style={styles.emptyText}>{t(ui.noSavedArticles)}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {saved.map((a) => (
            <Pressable
              key={a.id}
              onPress={() => open(a.id)}
              accessibilityRole="button"
              accessibilityLabel={t(a.title)}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={styles.iconBadge}>
                <Ionicons name={a.icon as any} size={22} color={colors.primary} />
              </View>
              <View style={styles.text}>
                <Text style={styles.category}>{t(a.category)}</Text>
                <Text style={styles.title} numberOfLines={2}>
                  {t(a.title)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </Pressable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.surface },
    content: { padding: spacing.lg, paddingBottom: 100 },
    empty: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.md,
      padding: spacing.xl,
    },
    emptyText: { fontSize: 15, color: colors.textMuted, textAlign: 'center' },
    card: {
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
    text: { flex: 1 },
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
    },
  });
