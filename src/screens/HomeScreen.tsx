import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { HomeHero } from '../components/HomeHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { Text } from '../components/Text';
import { VideoCard } from '../components/VideoCard';
import { about, articles, videoSeries } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { haptics } from '../lib/haptics';
import { radius, shadow, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import type { RootTabParamList } from '../navigation/types';

// The data is authored newest-first, so the first series' first episode is "latest".
const latestSeries = videoSeries[0];
const latestEpisode = latestSeries.episodes[0];

export function HomeScreen() {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const nav = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  const openArticle = (articleId: string) => {
    haptics.light();
    nav.navigate('Guides', { screen: 'ArticleDetail', params: { articleId } });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.appName)} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <HomeHero />

        <View style={styles.body}>
          {/* Featured guides — horizontal launchpad into the Guides tab */}
          <SectionHeader title={t(ui.featuredGuides)} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
            contentContainerStyle={styles.carouselContent}
          >
            {articles.map((a) => (
              <Pressable
                key={a.id}
                onPress={() => openArticle(a.id)}
                accessibilityRole="button"
                accessibilityLabel={t(a.title)}
                style={({ pressed }) => [styles.guideCard, pressed && styles.pressed]}
              >
                <View style={styles.iconBadge}>
                  <Ionicons name={a.icon as any} size={22} color={colors.primary} />
                </View>
                <Text style={styles.guideCategory}>{t(a.category)}</Text>
                <Text style={styles.guideTitle} numberOfLines={3}>
                  {t(a.title)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Latest webinar */}
          <SectionHeader title={t(ui.latestWebinar)} />
          <VideoCard ep={latestEpisode} series={latestSeries} />

          {/* Mission / Vision / Commitment — icon-accented statement cards */}
          <SectionHeader title={t(ui.ourMission)} />
          <Card>
            <View style={styles.statementRow}>
              <View style={styles.statementBadge}>
                <Ionicons name="rocket-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.statement}>{t(about.mission)}</Text>
            </View>
          </Card>

          <SectionHeader title={t(ui.ourVision)} />
          <Card>
            <View style={styles.statementRow}>
              <View style={styles.statementBadge}>
                <Ionicons name="eye-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.statement}>{t(about.vision)}</Text>
            </View>
          </Card>

          <SectionHeader title={t(ui.ourCommitment)} />
          <Card>
            <View style={styles.statementRow}>
              <View style={styles.statementBadge}>
                <Ionicons name="heart-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.statement}>{t(about.commitment)}</Text>
            </View>
          </Card>

          {/* Impact stats — count up on load */}
          <SectionHeader title={t(ui.ourImpact)} />
          <View style={styles.statsGrid}>
            {about.stats.map((s, i) => (
              <StatCard key={s.value} value={s.value} label={t(s.label)} animate index={i} />
            ))}
          </View>

          <View style={styles.freeNote}>
            <Ionicons name="heart" size={16} color={colors.accentDark} />
            <Text style={styles.freeText}>{t(ui.freeNote)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    scroll: { paddingBottom: 100 },
    body: { paddingHorizontal: spacing.lg },

    // Featured guides carousel (bleeds to the screen edges)
    carousel: { marginHorizontal: -spacing.lg },
    carouselContent: { paddingHorizontal: spacing.lg, gap: spacing.md },
    guideCard: {
      width: 220,
      backgroundColor: colors.bg,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      ...shadow.card,
    },
    pressed: { opacity: 0.7 },
    iconBadge: {
      width: 46,
      height: 46,
      borderRadius: radius.md,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    guideCategory: {
      fontSize: 11.5,
      fontWeight: '800',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 2,
    },
    guideTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text,
      lineHeight: 21,
    },

    statement: {
      flex: 1,
      fontSize: 15,
      lineHeight: 24,
      color: colors.text,
    },
    statementRow: {
      flexDirection: 'row',
      gap: spacing.md,
      alignItems: 'flex-start',
    },
    statementBadge: {
      width: 40,
      height: 40,
      borderRadius: radius.md,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
    },
    freeNote: {
      flexDirection: 'row',
      gap: spacing.sm,
      alignItems: 'flex-start',
      backgroundColor: colors.noteBg,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.noteBorder,
      padding: spacing.md,
      marginTop: spacing.xl,
    },
    freeText: {
      flex: 1,
      fontSize: 13.5,
      lineHeight: 20,
      color: colors.noteText,
      fontWeight: '500',
    },
  });
