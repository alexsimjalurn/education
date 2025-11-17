# Bundle Optimization Guide

This guide explains how to optimize bundle size and analyze it.

## Bundle Analysis

### Install Bundle Analyzer

```bash
npm install --save-dev @next/bundle-analyzer
```

### Configure next.config.js

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

### Run Analysis

```bash
npm run analyze
```

This will:
1. Build the application
2. Generate bundle analysis reports
3. Open reports in browser

## Optimization Strategies

### 1. Code Splitting

Next.js automatically code-splits with App Router. Use dynamic imports for large components:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // If component doesn't need SSR
});
```

### 2. Tree Shaking

- Remove unused exports
- Use named imports instead of default imports when possible
- Remove unused dependencies

### 3. Image Optimization

Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // For better UX
/>
```

### 4. Font Optimization

Use Next.js font optimization:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

### 5. Remove Unused Dependencies

Regularly audit dependencies:

```bash
npm audit
npm outdated
```

### 6. Compression

Enabled in `next.config.js`:

```javascript
compress: true,
```

## Best Practices

- ✅ Use dynamic imports for large components
- ✅ Optimize images with Next.js Image
- ✅ Remove unused dependencies
- ✅ Analyze bundle regularly
- ✅ Monitor bundle size in CI/CD

- ❌ Import entire libraries when only need one function
- ❌ Use large UI libraries for simple components
- ❌ Include development dependencies in production

