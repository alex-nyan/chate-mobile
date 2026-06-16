import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { Row } from '../components/Row';
import { SectionHeader } from '../components/SectionHeader';
import { Text } from '../components/Text';
import { countries, programs } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { radius, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';

// Scholarship application forms — pinned to the top of the Programs tab.
const MEXT_FORM = 'https://forms.gle/72JWLVBTUHxNnoDj9';
const GLOBAL_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSf4pknYO2KCBWIgbzz2FowlWdgTNbnplDcVZgvetM3VgDMKvQ/viewform';

export function ProgramsScreen() {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.tabPrograms)} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title={t(ui.scholarships)} />
        <View style={styles.ctas}>
          <Row
            variant="card"
            icon="school-outline"
            label="MEXT"
            sublabel={t(ui.applyHint)}
            url={MEXT_FORM}
          />
          <Row
            variant="card"
            icon="globe-outline"
            label="Global"
            sublabel={t(ui.applyHint)}
            url={GLOBAL_FORM}
          />
        </View>

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

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.surface },
    content: { padding: spacing.lg, paddingBottom: 100 },
    ctas: { gap: spacing.sm },
    intro: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: spacing.xl,
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
