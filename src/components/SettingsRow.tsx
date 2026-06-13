import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { haptics } from '../lib/haptics';
import { radius, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

type IconName = keyof typeof Ionicons.glyphMap;

/**
 * A settings list row: optional left icon badge, label, optional right-aligned
 * value/badge, and a chevron when tappable. Use for in-app actions (e.g. Saved
 * articles) and static info (e.g. version). External links use `LinkButton`.
 */
export function SettingsRow({
  icon,
  label,
  value,
  onPress,
  showChevron,
}: {
  icon?: IconName;
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
}) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const chevron = showChevron ?? !!onPress;

  const content = (
    <>
      {icon ? (
        <View style={styles.iconBadge}>
          <Ionicons name={icon} size={18} color={colors.primary} />
        </View>
      ) : null}
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      {value ? (
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      {chevron ? (
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      ) : null}
    </>
  );

  if (!onPress) {
    return <View style={styles.row}>{content}</View>;
  }

  return (
    <Pressable
      onPress={() => {
        haptics.light();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.bg,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    pressed: { opacity: 0.7 },
    iconBadge: {
      width: 34,
      height: 34,
      borderRadius: radius.sm,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      flex: 1,
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    value: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textMuted,
    },
  });
