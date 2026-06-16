import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { haptics } from '../lib/haptics';
import { radius, spacing, type Palette } from '../theme/colors';
import { useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

export type Segment<T extends string | number | boolean> = { value: T; label: string };

/**
 * A pill segmented control (used in Settings for Appearance / Language / Text
 * size / Haptics). Generic over the value union so each use stays type-safe.
 */
export function SegmentedControl<T extends string | number | boolean>({
  segments,
  value,
  onChange,
}: {
  segments: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.track} accessibilityRole="tablist">
      {segments.map((seg) => {
        const active = seg.value === value;
        return (
          <Pressable
            key={String(seg.value)}
            onPress={() => {
              if (!active) {
                haptics.selection();
                onChange(seg.value);
              }
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={seg.label}
            style={[styles.segment, active && styles.segmentActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>
              {seg.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    track: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: radius.pill,
      padding: 3,
      gap: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    segment: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.sm,
      borderRadius: radius.pill,
    },
    segmentActive: {
      backgroundColor: colors.primaryTint,
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
    },
    labelActive: {
      color: colors.primaryDark,
      fontWeight: '700',
    },
  });
