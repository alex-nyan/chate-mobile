import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { haptics } from '../lib/haptics';
import { openExternal } from '../lib/openExternal';
import { radius, shadow, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

type IconName = keyof typeof Ionicons.glyphMap;

/** Trailing affordance. `auto` derives it from `url` (open) / `onPress` (chevron). */
type Trailing = 'auto' | 'chevron' | 'open' | 'none';

type RowProps = {
  /** Left icon, shown in a tinted badge. Omit for a text-only row (e.g. version). */
  icon?: IconName;
  label: string;
  /** Secondary line under the label (e.g. an email address). */
  sublabel?: string;
  /** Right-aligned static value (e.g. a count or version number). */
  value?: string;
  /** External link target. Tapping opens it; trailing defaults to an "open" icon. */
  url?: string;
  /** In-app action. Tapping runs it; trailing defaults to a chevron. */
  onPress?: () => void;
  /** Override the trailing affordance (defaults from `url` / `onPress`). */
  trailing?: Trailing;
  /** `list` = flat list row (default); `card` = elevated, for standalone CTAs. */
  variant?: 'list' | 'card';
};

/**
 * The app's single tappable/info row: a tinted icon badge, a label (+ optional
 * sublabel), an optional right-aligned value, and a trailing affordance. It
 * covers external links (`url`), in-app actions (`onPress`) and static info
 * (neither), in a flat `list` look or an elevated `card` look — replacing the
 * old LinkButton, SettingsRow, and per-screen FormCard.
 */
export function Row({
  icon,
  label,
  sublabel,
  value,
  url,
  onPress,
  trailing = 'auto',
  variant = 'list',
}: RowProps) {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const isCard = variant === 'card';

  const isLink = !!url;
  const tappable = isLink || !!onPress;
  const affordance: Trailing =
    trailing !== 'auto' ? trailing : isLink ? 'open' : onPress ? 'chevron' : 'none';

  const handlePress = () => {
    haptics.light();
    if (url) {
      void openExternal(url, t(ui.linkFailed));
    } else {
      onPress?.();
    }
  };

  const content = (
    <>
      {icon ? (
        <View style={[styles.iconBadge, isCard && styles.iconBadgeCard]}>
          <Ionicons name={icon} size={isCard ? 22 : 18} color={colors.primary} />
        </View>
      ) : null}
      <View style={styles.textWrap}>
        <Text style={[styles.label, isCard && styles.labelCard]} numberOfLines={1}>
          {label}
        </Text>
        {sublabel ? (
          <Text style={styles.sublabel} numberOfLines={1}>
            {sublabel}
          </Text>
        ) : null}
      </View>
      {value ? (
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      {affordance === 'chevron' ? (
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      ) : affordance === 'open' ? (
        <Ionicons name="open-outline" size={18} color={colors.textMuted} />
      ) : null}
    </>
  );

  if (!tappable) {
    return <View style={[styles.row, isCard && styles.rowCard]}>{content}</View>;
  }

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole={isLink ? 'link' : 'button'}
      accessibilityLabel={sublabel ? `${label} — ${sublabel}` : label}
      style={({ pressed }) => [styles.row, isCard && styles.rowCard, pressed && styles.pressed]}
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
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    rowCard: {
      borderRadius: radius.lg,
      ...shadow.card,
    },
    pressed: { opacity: 0.7 },
    iconBadge: {
      width: 36,
      height: 36,
      borderRadius: radius.sm,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconBadgeCard: {
      width: 44,
      height: 44,
      borderRadius: radius.md,
    },
    textWrap: { flex: 1 },
    label: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    labelCard: {
      fontSize: 16,
      fontWeight: '800',
    },
    sublabel: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: 1,
    },
    value: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textMuted,
    },
  });
