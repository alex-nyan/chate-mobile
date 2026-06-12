import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import { haptics } from '../lib/haptics';
import { radius, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { LanguageToggle } from './LanguageToggle';
import { Text } from './Text';
import { ThemeToggle } from './ThemeToggle';

const mark = require('../../assets/brand/icon-logo-500.png');
// Dark-mode variant: the black ချိတ် strokes recolored to white (teal circle kept).
const markDark = require('../../assets/brand/icon-logo-500-dark.png');

// MEXT (Japanese government) scholarship application — a Google Form CTA pinned
// in the top bar so it's reachable from every screen.
const MEXT_FORM = 'https://forms.gle/72JWLVBTUHxNnoDj9';

function openMext() {
  haptics.light();
  Linking.openURL(MEXT_FORM).catch(() => {});
}

export function AppBar({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  const { colors, isDark } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.bar}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Ionicons name="chevron-back" size={26} color={colors.primaryDark} />
          </Pressable>
        ) : (
          <Image
            source={isDark ? markDark : mark}
            style={styles.mark}
            resizeMode="contain"
            accessibilityLabel="Chate — The Hook"
          />
        )}
        <ThemeToggle />
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={[styles.side, styles.right]}>
        <Pressable
          onPress={openMext}
          hitSlop={8}
          accessibilityRole="link"
          accessibilityLabel="Apply via the MEXT scholarship form"
          style={({ pressed }) => [styles.mext, pressed && styles.pressed]}
        >
          <Text style={styles.mextText}>MEXT</Text>
          <Ionicons name="open-outline" size={12} color={colors.primaryDark} />
        </Pressable>
        <LanguageToggle tint="light" />
      </View>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      backgroundColor: colors.bg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    side: {
      minWidth: 96,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    right: { justifyContent: 'flex-end' },
    pressed: { opacity: 0.6 },
    mext: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: radius.pill,
      backgroundColor: colors.primaryTint,
    },
    mextText: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.primaryDark,
      letterSpacing: 0.5,
    },
    mark: { width: 40, height: 40 },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: 17,
      fontWeight: '800',
      color: colors.text,
    },
  });
