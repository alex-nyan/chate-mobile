import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useLang } from '../i18n/LanguageContext';
import { radius, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

/**
 * Pill button that flips the active language.
 * Shows the language you'll switch TO (e.g. "မြန်မာ" while in English).
 *
 * `tint="dark"` is for placement over a coloured/photographic surface (e.g. the
 * Hero gradient); `tint="light"` adapts to the app theme via palette tokens.
 */
export function LanguageToggle({ tint = 'light' }: { tint?: 'light' | 'dark' }) {
  const { lang, toggle } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const onTinted = tint === 'dark';
  const label = lang === 'en' ? 'မြန်မာ' : 'ENG';

  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="button"
      accessibilityLabel="Switch language"
      hitSlop={8}
      style={({ pressed }) => [
        styles.btn,
        onTinted ? styles.dark : styles.light,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        name="globe-outline"
        size={15}
        color={onTinted ? colors.textInverse : colors.primaryDark}
      />
      <Text style={[styles.text, onTinted ? styles.textDark : styles.textLight]}>{label}</Text>
    </Pressable>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: spacing.md,
      paddingVertical: 6,
      borderRadius: radius.pill,
      borderWidth: 1,
    },
    light: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    dark: {
      backgroundColor: 'rgba(255,255,255,0.18)',
      borderColor: 'rgba(255,255,255,0.35)',
    },
    pressed: { opacity: 0.7 },
    text: { fontSize: 13, fontWeight: '700' },
    textLight: { color: colors.primaryDark },
    textDark: { color: colors.textInverse },
  });
