import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { haptics } from '../lib/haptics';
import { radius } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

/**
 * Icon button that flips between light and dark.
 * Shows the scheme you'll switch TO — a moon while light, a sun while dark.
 */
export function ThemeToggle() {
  const { isDark, toggle, colors } = useTheme();

  return (
    <Pressable
      onPress={() => {
        haptics.selection();
        toggle();
      }}
      accessibilityRole="button"
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      hitSlop={8}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        name={isDark ? 'sunny-outline' : 'moon-outline'}
        size={17}
        color={colors.primaryDark}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 34,
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
});
