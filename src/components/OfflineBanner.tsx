import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { useIsOffline } from '../lib/useIsOffline';
import { useTheme } from '../theme/ThemeContext';
import { radius, spacing } from '../theme/colors';
import { Text } from './Text';

// Matches the floating tab bar's geometry so the toast sits just above it.
const TAB_BAR_HEIGHT = 62;

/**
 * A small toast that floats just above the tab bar when the device goes offline.
 * Renders nothing when online, so it has zero layout impact the rest of the time.
 */
export function OfflineBanner() {
  const offline = useIsOffline();
  const { t } = useLang();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  if (!offline) return null;

  const bottom = Math.max(insets.bottom + 6, 14) + TAB_BAR_HEIGHT + 10;

  return (
    <View pointerEvents="none" style={[styles.wrap, { bottom }]}>
      <View style={[styles.banner, { backgroundColor: colors.text }]}>
        <Ionicons name="cloud-offline-outline" size={15} color={colors.bg} />
        <Text style={[styles.text, { color: colors.bg }]} numberOfLines={1}>
          {t(ui.offline)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    maxWidth: '100%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  text: {
    fontSize: 12.5,
    fontWeight: '700',
    flexShrink: 1,
  },
});
