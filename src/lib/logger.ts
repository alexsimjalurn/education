/**
 * Centralized logging utility
 *
 * Uses console for development, Sentry for production.
 * All logs follow consistent structure with timestamp and context.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

/**
 * Logger class
 * Handles logging with console (dev) and Sentry (production)
 */
class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, context?: LogContext): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...context,
    };

    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug('[DEBUG]', logEntry);
        }
        break;
      case 'info':
        console.info('[INFO]', logEntry);
        break;
      case 'warn':
        console.warn('[WARN]', logEntry);
        // In production, send warnings to Sentry
        if (!this.isDevelopment) {
          this.sendToSentry({ level: 'warning', message, ...context });
        }
        break;
      case 'error':
        console.error('[ERROR]', logEntry);
        // In production, send errors to Sentry
        if (!this.isDevelopment) {
          this.sendToSentry({ level: 'error', message, ...context });
        }
        break;
    }
  }

  /**
   * Send log to Sentry (production only)
   */
  private sendToSentry(context?: LogContext): void {
    if (!context) {
      return;
    }
    // TODO: Initialize Sentry when package is installed
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   if (level === 'error') {
    //     window.Sentry.captureMessage(message, {
    //       level: 'error',
    //       extra: context,
    //     });
    //   } else {
    //     window.Sentry.captureMessage(message, {
    //       level: 'warning',
    //       extra: context,
    //     });
    //   }
    // }
  }

  /**
   * Debug log (development only)
   */
  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  /**
   * Info log
   */
  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  /**
   * Warning log
   */
  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  /**
   * Error log
   */
  error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }
}

export const logger = new Logger();

