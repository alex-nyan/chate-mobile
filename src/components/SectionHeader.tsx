import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/colors';

export function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.bar} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
