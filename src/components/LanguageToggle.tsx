import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useLang } from '../i18n/LanguageContext';
import { colors, radius, spacing } from '../theme/colors';

/**
 * Pill button that flips the active language.
 * Shows the language you'll switch TO (e.g. "မြန်မာ" while in English).
 */
export function LanguageToggle({ tint = 'light' }: { tint?: 'light' | 'dark' }) {
  const { lang, toggle } = useLang();
  const isDark = tint === 'dark';
  const label = lang === 'en' ? 'မြန်မာ' : 'ENG';

  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="button"
      accessibilityLabel="Switch language"
      hitSlop={8}
      style={({ pressed }) => [
        styles.btn,
        isDark ? styles.dark : styles.light,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        name="globe-outline"
        size={15}
        color={isDark ? colors.textInverse : colors.primaryDark}
      />
      <Text style={[styles.text, isDark ? styles.textDark : styles.textLight]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
