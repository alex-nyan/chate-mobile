import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

/**
 * The app is phone-shaped. On the web build it ships to, that would otherwise
 * stretch edge-to-edge on a desktop browser, so we center it at a phone-ish
 * max width over a muted backdrop. On native this is a transparent pass-through.
 */
const APP_MAX_WIDTH = 480;

export function AppShell({ children }: { children: React.ReactNode }) {
  const { colors, isDark } = useTheme();

  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={[styles.backdrop, { backgroundColor: isDark ? '#05090B' : '#DDE5E8' }]}>
      <View style={[styles.frame, { backgroundColor: colors.surface }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: APP_MAX_WIDTH,
    // Establish a positioning context so the floating tab bar / offline toast
    // anchor to the frame rather than the full viewport.
    position: 'relative',
    // Subtle elevation so it reads as a centered surface on a wide screen.
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
  },
});
