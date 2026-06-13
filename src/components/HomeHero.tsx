import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

// The "Chate the Hook" wordmark (distinct from the small icon mark in the AppBar).
const wordmark = require('../../assets/brand/wordmark-stars.png');

/**
 * Branded hero band at the top of Home: a teal gradient with the wordmark,
 * slogan, and tagline. (Language/theme controls live in Settings, so the hero
 * carries no toggles.)
 */
export function HomeHero() {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <LinearGradient
      colors={[colors.primaryTint, colors.bg]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.hero}
    >
      <Image
        source={wordmark}
        style={styles.wordmark}
        resizeMode="contain"
        accessibilityLabel="Chate — The Hook · Chate your dreams"
      />
      <View style={styles.taglineRow}>
        <View style={styles.accentDot} />
        <Text style={styles.tagline}>{t(ui.tagline)}</Text>
        <View style={styles.accentDot} />
      </View>
    </LinearGradient>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    hero: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    // Explicit width/height (web ignores aspectRatio on Image, leaving the full
    // 711px natural height). 230×129 keeps the 1265:711 ratio with no letterbox.
    wordmark: {
      width: 230,
      height: 129,
    },
    taglineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginTop: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    accentDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.accent,
    },
    tagline: {
      flexShrink: 1,
      color: colors.textMuted,
      fontSize: 13.5,
      lineHeight: 19,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
