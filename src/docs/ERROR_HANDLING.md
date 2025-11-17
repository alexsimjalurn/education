# Error Handling & Logging

This document explains the error handling and logging strategy.

## Principles

### ✅ Consistent Error Structure

All errors follow a consistent structure:

```typescript
{
  code: string;      // Error code (e.g., 'VALIDATION_ERROR')
  message: string;   // Human-readable error message
  status: number;    // HTTP status code
  details?: unknown; // Optional additional details
}
```

### ✅ Global Logger

Logger is used globally:
- **Development**: Console logging
- **Production**: Sentry (when integrated) + console

### ✅ All Errors Caught in Service Layer

All errors are caught and handled in the service layer:
- Service methods wrap API calls in try-catch
- Errors are logged with context
- Custom error classes are used

## Error Classes

### AppError

Base error class with consistent structure:

```typescript
class AppError extends Error {
  code: string;
  status: number;
  details?: unknown;
}
```

### Custom Error Classes

- **ValidationError** (400): Input validation errors
- **AuthenticationError** (401): Authentication required
- **AuthorizationError** (403): Insufficient permissions
- **NotFoundError** (404): Resource not found
- **ApiError** (500): API/HTTP errors

## Error Structure

### Consistent Format

```typescript
{
  code: 'VALIDATION_ERROR',
  message: 'Email is required',
  status: 400,
  details: { field: 'email' }
}
```

### Error Methods

```typescript
// Get error in consistent structure
const errorData = error.toJSON();
// Returns: { code, message, status, details? }
```

## Logger

### Usage

```typescript
import { logger } from '@/lib/logger';

// Debug (development only)
logger.debug('Debug message', { context: 'value' });

// Info
logger.info('Info message', { userId: '123' });

// Warning
logger.warn('Warning message', { data: 'value' });

// Error
logger.error('Error message', { error, context: 'value' });
```

### Log Levels

- **debug**: Development only, detailed information
- **info**: General information, successful operations
- **warn**: Warnings, non-critical issues
- **error**: Errors, exceptions, failures

### Production Behavior

In production:
- Debug logs are not output
- Warnings and errors are sent to Sentry (when integrated)
- All logs include timestamp and context

## Service Layer Error Handling

### Pattern

All service methods follow this pattern:

```typescript
async function serviceMethod(params): Promise<Result> {
  // Validation
  if (!params.required) {
    const error = new ValidationError('Required field missing');
    logger.error('Service: Validation failed', { params });
    throw error;
  }

  try {
    // API call
    const response = await apiClient.get('/api/endpoint');
    logger.info('Service: Operation successful', { id: response.data.id });
    return response.data;
  } catch (error) {
    // Log error with context
    logger.error('Service: Operation failed', { params, error });
    // Re-throw (error is already AppError from apiClient)
    throw error;
  }
}
```

### Error Flow

1. **Service Layer**: Catches and logs errors
2. **API Client**: Converts HTTP errors to ApiError
3. **Logger**: Logs errors with context
4. **Error Handler**: Converts unknown errors to AppError

## API Client Error Handling

### Request Interceptor

```typescript
// Logs request errors
this.client.interceptors.request.use(
  (config) => config,
  (error) => {
    logError(error, { context: 'request-interceptor' });
    return Promise.reject(error);
  }
);
```

### Response Interceptor

```typescript
// Converts HTTP errors to ApiError
this.client.interceptors.response.use(
  (response) => response,
  (error) => {
    const appError = handleError(error);
    logError(appError, {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
    });
    
    // Convert to ApiError
    const apiError = new ApiError(
      error.response?.data?.message || appError.message,
      error.response?.status || 500
    );
    
    return Promise.reject(apiError);
  }
);
```

## Error Handling Utilities

### handleError

Converts unknown errors to AppError:

```typescript
import { handleError } from '@/lib/errors';

try {
  // Some operation
} catch (error) {
  const appError = handleError(error);
  // appError is always AppError with consistent structure
}
```

### logError

Logs errors with consistent structure:

```typescript
import { logError } from '@/lib/errors';

try {
  // Some operation
} catch (error) {
  logError(error, { context: 'additional-info' });
}
```

## Examples

### Service Method

```typescript
async getById(id: string): Promise<Course> {
  // Validation
  if (!id) {
    const error = new ValidationError('Course ID is required');
    logger.error('Course service: Invalid ID', { id });
    throw error;
  }

  try {
    const response = await apiClient.get<Course>(`/api/courses/${id}`);
    return response.data;
  } catch (error) {
    logger.error('Course service: Failed to get course', { id, error });
    throw error; // Error is already AppError from apiClient
  }
}
```

### Error in Component

```typescript
const { courses, error } = useCourses();

if (error) {
  // Error is already handled and logged in service layer
  return <ErrorDisplay message={error} />;
}
```

## Sentry Integration

### Setup (TODO)

When Sentry is installed:

1. Initialize Sentry in `src/lib/logger.ts`
2. Update `sendToSentry` method
3. Configure Sentry DSN in environment variables

### Integration

```typescript
// In logger.ts
import * as Sentry from '@sentry/nextjs';

private sendToSentry(level: 'warning' | 'error', message: string, context?: LogContext) {
  if (level === 'error') {
    Sentry.captureMessage(message, {
      level: 'error',
      extra: context,
    });
  } else {
    Sentry.captureMessage(message, {
      level: 'warning',
      extra: context,
    });
  }
}
```

## Best Practices

### ✅ DO

- Use custom error classes (ValidationError, ApiError, etc.)
- Log all errors with context
- Catch errors in service layer
- Use consistent error structure
- Include relevant context in logs

### ❌ DON'T

- Throw generic Error objects
- Skip error logging
- Catch errors without logging
- Use different error structures
- Log sensitive information (passwords, tokens)

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `AUTHENTICATION_ERROR` | 401 | Not authenticated |
| `AUTHORIZATION_ERROR` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `API_ERROR` | 500 | API/HTTP error |
| `UNKNOWN_ERROR` | 500 | Unknown error |

## Summary

| Aspect | Implementation |
|--------|---------------|
| **Error Structure** | `{ code, message, status, details? }` |
| **Logger** | Global logger (console dev, Sentry prod) |
| **Error Handling** | All errors caught in service layer |
| **Error Classes** | Custom error classes for different types |
| **Logging** | All errors logged with context |

