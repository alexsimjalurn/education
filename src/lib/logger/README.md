# Logger

Centralized logging utility for the application.

## Usage

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

## Log Levels

- **debug**: Development only, detailed information
- **info**: General information, successful operations
- **warn**: Warnings, non-critical issues
- **error**: Errors, exceptions, failures

## Behavior

### Development

- All logs output to console
- Debug logs included
- Stack traces for errors

### Production

- Debug logs not output
- Warnings and errors sent to Sentry (when integrated)
- All logs include timestamp and context

## Sentry Integration

When Sentry is installed, errors and warnings are automatically sent to Sentry in production.

## Best Practices

- Use appropriate log levels
- Include relevant context in logs
- Don't log sensitive information (passwords, tokens)
- Use structured logging with context objects

