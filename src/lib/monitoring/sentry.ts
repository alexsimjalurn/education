/**
 * Sentry Configuration
 *
 * Error tracking and monitoring setup.
 * Initialize Sentry in production environment.
 */

/**
 * Initialize Sentry
 * Call this in _app.tsx or layout.tsx
 */
export const initSentry = (): void => {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // TODO: Install @sentry/nextjs and initialize
    // import * as Sentry from '@sentry/nextjs';
    //
    // Sentry.init({
    //   dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    //   environment: process.env.NODE_ENV,
    //   tracesSampleRate: 1.0,
    //   replaysSessionSampleRate: 0.1,
    //   replaysOnErrorSampleRate: 1.0,
    // });
  }
};

/**
 * Capture exception to Sentry
 */
export const captureException = (
  error: Error,
  context?: Record<string, unknown>
): void => {
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to Sentry when integrated
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     extra: context,
    //   });
    // }
  }
};

/**
 * Capture message to Sentry
 */
export const captureMessage = (
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context?: Record<string, unknown>
): void => {
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to Sentry when integrated
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureMessage(message, {
    //     level,
    //     extra: context,
    //   });
    // }
  }
};

