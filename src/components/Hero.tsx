import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { colors, radius, spacing } from '../theme/colors';
import { LanguageToggle } from './LanguageToggle';

export function Hero({ topInset }: { topInset: number }) {
  const { t } = useLang();

  return (
    <LinearGradient
      colors={[colors.primaryDark, colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.hero, { paddingTop: topInset + spacing.md }]}
    >
      <View style={styles.topRow}>
        <View style={styles.brandMark}>
          <Ionicons name="sparkles" size={18} color={colors.accent} />
        </View>
        <LanguageToggle tint="dark" />
      </View>

      <Text style={styles.appName}>{t(ui.appName)}</Text>
      <View style={styles.taglineRow}>
        <View style={styles.accentDot} />
        <Text style={styles.tagline}>{t(ui.tagline)}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  brandMark: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: colors.textInverse,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  accentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  tagline: {
    flex: 1,
    color: 'rgba(255,255,255,0.92)',
    fontSize: 14.5,
    lineHeight: 21,
    fontWeight: '500',
  },
});
