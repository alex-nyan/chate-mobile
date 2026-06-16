import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { share, shareTo, type ShareTarget } from '../lib/share';
import { radius, spacing, withAlpha, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

type IconName = keyof typeof Ionicons.glyphMap;

/** Social destinations, in priority order (Facebook first). Brand colors tint
 * each circular badge; labels are proper nouns so they aren't localized. */
const TARGETS: { target: ShareTarget; icon: IconName; label: string; color: string }[] = [
  { target: 'facebook', icon: 'logo-facebook', label: 'Facebook', color: '#1877F2' },
  { target: 'whatsapp', icon: 'logo-whatsapp', label: 'WhatsApp', color: '#25D366' },
  { target: 'telegram', icon: 'paper-plane', label: 'Telegram', color: '#229ED9' },
  { target: 'twitter', icon: 'logo-twitter', label: 'X', color: '#1DA1F2' },
];

type ShareSheetProps = {
  visible: boolean;
  onClose: () => void;
  /** Canonical link to the content being shared. */
  url: string;
  /** Body text used by targets that accept it (and the OS sheet fallback). */
  text: string;
};

/**
 * A themed bottom sheet of share destinations — Facebook (primary) and a few
 * other socials via web share intents, plus "More…" which opens the native OS
 * share sheet (Messenger, Instagram, Mail, etc.). Each choice dismisses the
 * sheet after firing.
 */
export function ShareSheet({ visible, onClose, url, text }: ShareSheetProps) {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();

  const pick = (run: () => void) => {
    run();
    onClose();
  };

  const Option = ({
    icon,
    label,
    color,
    onPress,
  }: {
    icon: IconName;
    label: string;
    color: string;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.option, pressed && styles.pressed]}
    >
      <View style={[styles.badge, { backgroundColor: withAlpha(color, 0.15) }]}>
        <Ionicons name={icon} size={26} color={color} />
      </View>
      <Text style={styles.optionLabel} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel={t(ui.share)}>
        {/* Stop taps inside the sheet from closing it. */}
        <Pressable
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.handle} />
          <Text style={styles.title}>{t(ui.shareVia)}</Text>
          <View style={styles.grid}>
            {TARGETS.map((tg) => (
              <Option
                key={tg.target}
                icon={tg.icon}
                label={tg.label}
                color={tg.color}
                onPress={() => pick(() => shareTo(tg.target, { url, text }))}
              />
            ))}
            <Option
              icon="ellipsis-horizontal"
              label={t(ui.shareMore)}
              color={colors.primary}
              onPress={() => pick(() => share({ message: text, url }))}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: colors.bg,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      paddingTop: spacing.sm,
      paddingHorizontal: spacing.lg,
    },
    handle: {
      alignSelf: 'center',
      width: 40,
      height: 4,
      borderRadius: radius.pill,
      backgroundColor: colors.border,
      marginBottom: spacing.md,
    },
    title: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text,
      marginBottom: spacing.lg,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: spacing.lg,
    },
    option: {
      width: '20%',
      alignItems: 'center',
      gap: 6,
    },
    pressed: { opacity: 0.6 },
    badge: {
      width: 56,
      height: 56,
      borderRadius: radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textMuted,
    },
  });
