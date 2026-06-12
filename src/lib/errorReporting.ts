import { Platform } from 'react-native';

type ErrorContext = Record<string, unknown>;

let installed = false;

/**
 * Central place every captured error flows through. Today it just logs with a
 * recognizable tag — but it's the single spot to plug in a crash reporter for a
 * real launch, e.g.:
 *
 *   import * as Sentry from '@sentry/react-native';
 *   Sentry.captureException(err, { extra: context });
 *
 * (Sentry needs an account + DSN + the `@sentry/react-native` config plugin, so
 * it's intentionally left as a one-line swap rather than wired up blindly.)
 */
export function reportError(error: unknown, context?: ErrorContext) {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error('[chate] captured error:', err, context ?? '');
}

/**
 * Install global handlers so an uncaught error never silently disappears:
 * uncaught JS exceptions and unhandled promise rejections both funnel into
 * reportError(). Safe to call multiple times.
 */
export function initErrorReporting() {
  if (installed) return;
  installed = true;

  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (e) =>
        reportError(e.error ?? e.message, { source: 'window.onerror' }),
      );
      window.addEventListener('unhandledrejection', (e) =>
        reportError(e.reason, { source: 'unhandledrejection' }),
      );
    }
    return;
  }

  // Native: chain onto the existing handler so the dev red-box still works.
  const g = globalThis as unknown as {
    ErrorUtils?: {
      getGlobalHandler?: () => (error: unknown, isFatal?: boolean) => void;
      setGlobalHandler?: (handler: (error: unknown, isFatal?: boolean) => void) => void;
    };
  };
  const prev = g.ErrorUtils?.getGlobalHandler?.();
  g.ErrorUtils?.setGlobalHandler?.((error, isFatal) => {
    reportError(error, { isFatal, source: 'ErrorUtils' });
    prev?.(error, isFatal);
  });
}
