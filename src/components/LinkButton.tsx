import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sublabel?: string;
  url: string;
  variant?: 'solid' | 'outline';
};

/** A tappable row that opens an external URL (mailto:, https:, etc.). */
export function LinkButton({ icon, label, sublabel, url, variant = 'outline' }: Props) {
  const solid = variant === 'solid';

  const open = () => {
    Linking.openURL(url).catch(() => {
      /* Silently ignore — e.g. no email client configured. */
    });
  };

  return (
    <Pressable
      onPress={open}
      accessibilityRole="link"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.row,
        solid ? styles.solid : styles.outline,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconWrap, solid ? styles.iconSolid : styles.iconOutline]}>
        <Ionicons name={icon} size={20} color={solid ? colors.textInverse : colors.primary} />
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.label, solid && styles.labelSolid]}>{label}</Text>
        {sublabel ? (
          <Text style={[styles.sub, solid && styles.subSolid]} numberOfLines={1}>
            {sublabel}
          </Text>
        ) : null}
      </View>
      <Ionicons
        name="open-outline"
        size={18}
        color={solid ? 'rgba(255,255,255,0.85)' : colors.textMuted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
  },
  outline: { backgroundColor: colors.bg, borderColor: colors.border },
  solid: { backgroundColor: colors.primary, borderColor: colors.primary },
  pressed: { opacity: 0.75 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOutline: { backgroundColor: colors.surfaceAlt },
  iconSolid: { backgroundColor: 'rgba(255,255,255,0.2)' },
  textWrap: { flex: 1 },
  label: { fontSize: 15, fontWeight: '700', color: colors.text },
  labelSolid: { color: colors.textInverse },
  sub: { fontSize: 12.5, color: colors.textMuted, marginTop: 1 },
  subSolid: { color: 'rgba(255,255,255,0.85)' },
});
