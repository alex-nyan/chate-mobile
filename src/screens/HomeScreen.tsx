import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { Text } from '../components/Text';
import { about } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';

export function HomeScreen() {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.appName)} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.body}>
          <SectionHeader title={t(ui.ourMission)} />
          <Card>
            <Text style={styles.statement}>{t(about.mission)}</Text>
          </Card>

          <SectionHeader title={t(ui.ourVision)} />
          <Card>
            <Text style={styles.statement}>{t(about.vision)}</Text>
          </Card>

          <SectionHeader title={t(ui.ourCommitment)} />
          <Card>
            <Text style={styles.statement}>{t(about.commitment)}</Text>
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
    </SafeAreaView>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    body: { paddingHorizontal: spacing.lg },
    statement: {
      fontSize: 15,
      lineHeight: 24,
      color: colors.text,
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
