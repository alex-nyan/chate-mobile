import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

const mark = require('../../assets/brand/icon-logo-500.png');
// Dark-mode variant: the black ချိတ် strokes recolored to white (teal circle kept).
const markDark = require('../../assets/brand/icon-logo-500-dark.png');

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
        ) : null}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <Image
        source={isDark ? markDark : mark}
        style={styles.mark}
        resizeMode="contain"
        accessibilityLabel="Chate — The Hook"
      />

      {/* Empty spacer keeps the centered logo balanced opposite the left side. */}
      <View style={[styles.side, styles.right]} />
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
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    right: { justifyContent: 'flex-end' },
    pressed: { opacity: 0.6 },
    mark: { width: 48, height: 48 },
    title: {
      flexShrink: 1,
      fontSize: 17,
      fontWeight: '800',
      color: colors.text,
    },
  });
