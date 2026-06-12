import React from 'react';
import { StyleSheet, View } from 'react-native';
import { radius, spacing, type Palette } from '../theme/colors';
import { useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

export function Chip({ label }: { label: string }) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    chip: {
      backgroundColor: colors.surfaceAlt,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs + 2,
      borderWidth: 1,
      borderColor: colors.border,
    },
    text: {
      color: colors.primaryDark,
      fontSize: 13,
      fontWeight: '600',
    },
  });
