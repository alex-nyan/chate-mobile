import {
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black,
  useFonts,
} from '@expo-google-fonts/lexend';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppShell } from './src/components/AppShell';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { OfflineBanner } from './src/components/OfflineBanner';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { initErrorReporting } from './src/lib/errorReporting';
import { RootNavigator } from './src/navigation';
import { linking } from './src/navigation/linking';
import { BookmarksProvider } from './src/state/BookmarksContext';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

// Funnel uncaught errors + unhandled rejections into one reporter (see the file
// for the Sentry swap-in point). Runs once, before the tree mounts.
initErrorReporting();

// Keep the splash screen up until the Lexend faces are ready, so the UI never
// flashes in the system font before swapping to the brand typeface.
SplashScreen.preventAutoHideAsync();

/**
 * Navigation chrome that follows the active theme. Lives below ThemeProvider so
 * the container background (seen during transitions / over-scroll) and the status
 * bar icons flip with dark mode.
 */
function ThemedNavigation() {
  const { scheme, colors } = useTheme();
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;

  const navTheme: Theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.surface,
      card: colors.bg,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <AppShell>
      <View style={{ flex: 1 }}>
        <NavigationContainer theme={navTheme} linking={linking} fallback={null}>
          <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
          <RootNavigator />
        </NavigationContainer>
        <OfflineBanner />
      </View>
    </AppShell>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <BookmarksProvider>
            <ErrorBoundary>
              <ThemedNavigation />
            </ErrorBoundary>
          </BookmarksProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
