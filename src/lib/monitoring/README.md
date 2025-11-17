# Monitoring

This directory contains monitoring and analytics setup.

## Sentry (Error Tracking)

### Setup

1. Install Sentry:
   ```bash
   npm install @sentry/nextjs
   ```

2. Initialize in `src/app/layout.tsx`:
   ```tsx
   import { initSentry } from '@/lib/monitoring/sentry';
   
   initSentry();
   ```

3. Configure environment variables:
   ```env
   NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
   SENTRY_ORG=your-org
   SENTRY_PROJECT=your-project
   ```

### Usage

```tsx
import { captureException, captureMessage } from '@/lib/monitoring/sentry';

try {
  // Some operation
} catch (error) {
  captureException(error, { context: 'additional-info' });
}

captureMessage('Important event', 'info', { userId: '123' });
```

## Google Analytics

### Setup

1. Add GA script in `src/app/layout.tsx`:
   ```tsx
   import { initAnalytics } from '@/lib/monitoring/analytics';
   
   initAnalytics();
   ```

2. Configure environment variable:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Usage

```tsx
import { trackPageView, trackEvent } from '@/lib/monitoring/analytics';

// Track page view
trackPageView('/courses');

// Track event
trackEvent('click', 'button', 'enroll', 1);
```

## Best Practices

- Only initialize in production
- Don't track sensitive information
- Use appropriate event names
- Include relevant context

