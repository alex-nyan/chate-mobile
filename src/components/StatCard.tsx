import React from 'react';
import { StyleSheet, View } from 'react-native';
import { radius, spacing, type Palette } from '../theme/colors';
import { useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

export function StatCard({ value, label }: { value: string; label: string }) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    card: {
      flexBasis: '47%',
      flexGrow: 1,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    value: {
      fontSize: 26,
      fontWeight: '900',
      color: colors.primary,
      marginBottom: 2,
    },
    label: {
      fontSize: 12.5,
      color: colors.textMuted,
      textAlign: 'center',
      lineHeight: 17,
    },
  });
