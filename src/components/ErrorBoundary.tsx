import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { reportError } from '../lib/errorReporting';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { type Palette, radius, spacing } from '../theme/colors';
import { Text } from './Text';

/** Friendly, localized, theme-aware fallback shown when a screen throws. */
function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Ionicons name="alert-circle-outline" size={52} color={colors.primary} />
        <Text style={styles.title}>{t(ui.errorTitle)}</Text>
        <Text style={styles.body}>{t(ui.errorBody)}</Text>
        <Pressable
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel={t(ui.errorRetry)}
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        >
          <Ionicons name="refresh" size={18} color={colors.textInverse} />
          <Text style={styles.btnText}>{t(ui.errorRetry)}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

/**
 * Catches render/lifecycle errors anywhere below it so a single broken screen
 * shows a retry card instead of white-screening the whole app. Errors are sent
 * to the central reporter. Lives inside the providers so the fallback can be
 * localized and themed.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    reportError(error, { componentStack: info.componentStack });
  }

  private reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.reset} />;
    }
    return this.props.children;
  }
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xl,
    },
    card: {
      alignItems: 'center',
      gap: spacing.sm,
      maxWidth: 360,
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
    body: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.textMuted,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      borderRadius: radius.pill,
    },
    btnPressed: { opacity: 0.8 },
    btnText: {
      color: colors.textInverse,
      fontSize: 15,
      fontWeight: '800',
    },
  });
