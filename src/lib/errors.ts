/**
 * Custom error classes for better error handling
 *
 * All errors follow consistent structure:
 * { code: string, message: string, status: number }
 */

/**
 * Base error class with consistent structure
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  /**
   * Get error in consistent structure
   */
  toJSON(): { code: string; message: string; status: number; details?: unknown } {
    return {
      code: this.code,
      message: this.message,
      status: this.status,
      ...(this.details ? { details: this.details } : {}),
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ApiError extends AppError {
  constructor(
    message: string,
    status: number = 500,
    details?: unknown
  ) {
    super(message, 'API_ERROR', status, details);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Error handler utility
 * Converts unknown errors to AppError with consistent structure
 */
export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR', 500, error);
  }

  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR', 500);
};

/**
 * Error logger utility
 * Logs errors with consistent structure and sends to Sentry in production
 */
export const logError = (
  error: unknown,
  context?: Record<string, unknown>
): void => {
  const appError = handleError(error);
  const errorData = {
    code: appError.code,
    message: appError.message,
    status: appError.status,
    ...(appError.details ? { details: appError.details } : {}),
    ...context,
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('[ERROR]', {
      ...errorData,
      stack: appError.stack,
    });
  } else {
    // In production, send to error tracking service (Sentry)
    // Sentry will be initialized in logger.ts
    console.error('[ERROR]', errorData);

    // TODO: Send to Sentry when integrated
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(appError, {
    //     extra: errorData,
    //   });
    // }
  }
};

