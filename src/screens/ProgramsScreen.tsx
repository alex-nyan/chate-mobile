import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { SectionHeader } from '../components/SectionHeader';
import { countries, programs } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { colors, radius, spacing } from '../theme/colors';

export function ProgramsScreen() {
  const { t } = useLang();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.tabPrograms)} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>{t(ui.whatWeOffer)}</Text>

        {programs.map((p) => (
          <Card key={p.id} style={styles.card}>
            <View style={styles.cardHead}>
              <View style={styles.iconBadge}>
                <Ionicons name={p.icon as any} size={22} color={colors.primary} />
              </View>
              <Text style={styles.title}>{t(p.title)}</Text>
            </View>
            <Text style={styles.summary}>{t(p.summary)}</Text>
            <View style={styles.points}>
              {p.points.map((pt, i) => (
                <View key={i} style={styles.pointRow}>
                  <Ionicons name="checkmark-circle" size={17} color={colors.success} />
                  <Text style={styles.pointText}>{t(pt)}</Text>
                </View>
              ))}
            </View>
          </Card>
        ))}

        <SectionHeader title={t(ui.countriesCovered)} />
        <View style={styles.chips}>
          {countries.map((c) => (
            <Chip key={c} label={c} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: 100 },
  intro: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.md,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  card: { marginBottom: spacing.md },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  summary: {
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.textMuted,
  },
  points: { marginTop: spacing.md, gap: spacing.sm },
  pointRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  pointText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
