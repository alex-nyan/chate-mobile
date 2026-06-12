import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { colors, spacing } from '../theme/colors';
import { LanguageToggle } from './LanguageToggle';

// The real "Chate your dreams" logo, pulled from chatethehook.com.
const logo = require('../../assets/brand/logo.png');

export function Hero({ topInset }: { topInset: number }) {
  const { t } = useLang();

  return (
    <LinearGradient
      colors={[colors.primaryTint, colors.bg]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.hero, { paddingTop: topInset + spacing.sm }]}
    >
      <View style={styles.topRow}>
        <View style={styles.spacer} />
        <LanguageToggle tint="light" />
      </View>

      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="Chate your dreams"
      />

      <View style={styles.taglineRow}>
        <View style={styles.accentDot} />
        <Text style={styles.tagline}>{t(ui.tagline)}</Text>
        <View style={styles.accentDot} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  spacer: { width: 40 },
  logo: {
    width: '72%',
    aspectRatio: 1000 / 562,
    marginTop: spacing.xs,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  accentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  tagline: {
    color: colors.primaryDark,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
