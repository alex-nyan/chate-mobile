import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { Hero } from '../components/Hero';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { about } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { colors, spacing } from '../theme/colors';

export function HomeScreen() {
  const { t } = useLang();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <Hero topInset={insets.top} />

        <View style={styles.body}>
          <SectionHeader title={t(ui.ourMission)} />
          <Card>
            {about.mission.map((para, i) => (
              <Text key={i} style={[styles.mission, i > 0 && styles.missionGap]}>
                {t(para)}
              </Text>
            ))}
          </Card>

          <SectionHeader title={t(ui.ourImpact)} />
          <View style={styles.statsGrid}>
            {about.stats.map((s) => (
              <StatCard key={s.value} value={s.value} label={t(s.label)} />
            ))}
          </View>

          <View style={styles.freeNote}>
            <Ionicons name="heart" size={16} color={colors.accentDark} />
            <Text style={styles.freeText}>{t(ui.freeNote)}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: spacing.lg },
  mission: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
  },
  missionGap: { marginTop: spacing.md },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  freeNote: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    backgroundColor: '#FFF8E6',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F4E2B0',
    padding: spacing.md,
    marginTop: spacing.xl,
  },
  freeText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 20,
    color: '#7A5A12',
    fontWeight: '500',
  },
});
