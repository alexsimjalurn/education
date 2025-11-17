# Monitoring Setup Guide

This guide explains how to set up Sentry and Google Analytics.

## Sentry Setup

### 1. Install Sentry

```bash
npm install @sentry/nextjs
```

### 2. Initialize Sentry

Create `sentry.client.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

Create `sentry.server.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

Create `sentry.edge.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 3. Update Logger

Update `src/lib/logger.ts` to use Sentry:

```typescript
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

### 4. Environment Variables

```env
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token
```

## Google Analytics Setup

### 1. Add GA Script to Layout

Update `src/app/layout.tsx`:

```tsx
import Script from 'next/script';
import { initAnalytics } from '@/lib/monitoring/analytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

### 2. Track Page Views

Create `src/components/analytics/PageViewTracker.tsx`:

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { trackPageView } from '@/lib/monitoring/analytics';

export const PageViewTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
};
```

Add to layout:

```tsx
import { PageViewTracker } from '@/components/analytics/PageViewTracker';

<PageViewTracker />
```

### 3. Environment Variables

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Usage

### Sentry

Errors are automatically captured by the logger. Manual capture:

```tsx
import { captureException } from '@/lib/monitoring/sentry';

try {
  // Some operation
} catch (error) {
  captureException(error, { context: 'value' });
}
```

### Google Analytics

Track events:

```tsx
import { trackEvent } from '@/lib/monitoring/analytics';

trackEvent('click', 'button', 'enroll', 1);
```

