import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { radius, shadow, spacing, type Palette } from '../theme/colors';
import { useThemedStyles } from '../theme/ThemeContext';

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const styles = useThemedStyles(createStyles);
  return <View style={[styles.card, style]}>{children}</View>;
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.bg,
      borderRadius: radius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadow.card,
    },
  });
