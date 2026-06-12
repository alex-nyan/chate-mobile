import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing, type Palette } from '../theme/colors';
import { useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

export function SectionHeader({ title }: { title: string }) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.wrap}>
      <View style={styles.bar} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    wrap: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
      marginTop: spacing.xl,
    },
    bar: {
      width: 4,
      height: 20,
      borderRadius: 2,
      backgroundColor: colors.accent,
      marginRight: spacing.sm,
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: 0.2,
    },
  });
