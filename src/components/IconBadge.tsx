import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { radius, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';

type IconName = keyof typeof Ionicons.glyphMap;

/**
 * A rounded, teal-tinted badge holding a brand-coloured icon — the repeated
 * "card icon" motif used on the Home, Programs, Guides and Article screens.
 * `iconSize` defaults to ~half the badge so it stays balanced at any size.
 */
export function IconBadge({
  name,
  size = 44,
  iconSize,
  style,
}: {
  name: IconName;
  size?: number;
  iconSize?: number;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  return (
    <View style={[styles.badge, { width: size, height: size }, style]}>
      <Ionicons name={name} size={iconSize ?? Math.round(size * 0.48)} color={colors.primary} />
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    badge: {
      borderRadius: radius.md,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
