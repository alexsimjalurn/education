# Error Handling

This directory contains error handling utilities and custom error classes.

## Error Classes

All errors follow consistent structure: `{ code: string, message: string, status: number }`

### AppError

Base error class with consistent structure.

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

## Usage

### Creating Errors

```typescript
import { ValidationError, ApiError } from '@/lib/errors';

// Validation error
throw new ValidationError('Email is required');

// API error
throw new ApiError('Failed to fetch data', 500);
```

### Handling Errors

```typescript
import { handleError, logError } from '@/lib/errors';

try {
  // Some operation
} catch (error) {
  const appError = handleError(error);
  logError(appError, { context: 'additional-info' });
}
```

### Error Structure

All errors have consistent structure:

```typescript
{
  code: 'VALIDATION_ERROR',
  message: 'Email is required',
  status: 400,
  details: { field: 'email' }
}
```

## Best Practices

- Use custom error classes instead of generic Error
- Always log errors with context
- Use appropriate error types (ValidationError, ApiError, etc.)
- Include relevant details in error objects

