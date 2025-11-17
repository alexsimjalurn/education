# Deployment & Production Guide

This document outlines the deployment process and production checklist.

## Pre-Deployment Checklist

### ✅ Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in all required environment variables:
   - `NEXT_PUBLIC_API_URL` - API base URL
   - `DATABASE_URL` - Database connection string
   - `JWT_SECRET` - JWT secret key
   - `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN (for error tracking)
   - `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)

3. Verify all environment variables are set:
   ```bash
   npm run type-check  # Should not fail due to missing env vars
   ```

### ✅ CI/CD Pipeline

The CI/CD pipeline runs automatically on push/PR and includes:

1. **Lint**: ESLint checks
   ```bash
   npm run lint
   ```

2. **Type Check**: TypeScript validation
   ```bash
   npm run type-check
   ```

3. **Test**: Jest tests with coverage
   ```bash
   npm test -- --coverage
   ```

4. **Build**: Production build
   ```bash
   npm run build
   ```

All steps must pass before merging.

### ✅ Build Optimization

#### Image Optimization

Next.js automatically optimizes images. Configure in `next.config.js`:

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

**Usage**:
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

#### Bundle Size Optimization

1. **Analyze bundle size**:
   ```bash
   ANALYZE=true npm run build
   ```

2. **Code splitting**: Automatic with Next.js App Router
3. **Dynamic imports**: Use for large components
   ```tsx
   const HeavyComponent = dynamic(() => import('./HeavyComponent'));
   ```

4. **Tree shaking**: Automatic with Next.js

### ✅ Rendering Strategies

Configure SSR/SSG/ISR per page:

#### Server-Side Rendering (SSR)

```tsx
// app/page.tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store', // Force SSR
  });
  return <div>{data}</div>;
}
```

#### Static Site Generation (SSG)

```tsx
// app/page.tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return <div>{data}</div>;
}

export const generateStaticParams = async () => {
  // Generate static paths at build time
  return [{ id: '1' }, { id: '2' }];
};
```

#### Incremental Static Regeneration (ISR)

```tsx
// app/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```

### ✅ HTTPS / SSL

1. **Production**: Use HTTPS (required)
2. **SSL Certificate**: Configure in hosting platform (Vercel, AWS, etc.)
3. **Security Headers**: Configured in `next.config.js`

### ✅ Monitoring

#### Sentry (Error Tracking)

1. **Install Sentry**:
   ```bash
   npm install @sentry/nextjs
   ```

2. **Initialize** in `src/app/layout.tsx`:
   ```tsx
   import { initSentry } from '@/lib/monitoring/sentry';
   
   initSentry();
   ```

3. **Environment Variables**:
   ```env
   NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
   SENTRY_ORG=your-org
   SENTRY_PROJECT=your-project
   ```

#### Google Analytics

1. **Add GA script** in `src/app/layout.tsx`:
   ```tsx
   import { initAnalytics } from '@/lib/monitoring/analytics';
   
   initAnalytics();
   ```

2. **Environment Variables**:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Track page views**:
   ```tsx
   import { trackPageView } from '@/lib/monitoring/analytics';
   
   useEffect(() => {
     trackPageView(window.location.pathname);
   }, []);
   ```

## Deployment Steps

### 1. Pre-Deployment

- [ ] All tests passing
- [ ] Type check passing
- [ ] Lint passing
- [ ] Build successful
- [ ] Environment variables configured
- [ ] Database migrations applied

### 2. Build

```bash
npm run build
```

### 3. Test Build

```bash
npm run start
```

### 4. Deploy

Deploy to your hosting platform (Vercel, AWS, etc.)

### 5. Post-Deployment

- [ ] Verify application is accessible
- [ ] Check error tracking (Sentry)
- [ ] Verify analytics (GA)
- [ ] Test critical user flows
- [ ] Monitor performance

## CI/CD Pipeline

### Workflow Steps

1. **Lint**: Code quality checks
2. **Type Check**: TypeScript validation
3. **Test**: Unit and integration tests
4. **Build**: Production build
5. **Deploy**: Automatic deployment (if configured)

### Pipeline Configuration

See `.github/workflows/ci.yml` for full configuration.

## Performance Optimization

### Images

- Use Next.js `Image` component
- Optimize image formats (AVIF, WebP)
- Set appropriate sizes
- Use `priority` for above-the-fold images

### Bundle Size

- Analyze bundle: `ANALYZE=true npm run build`
- Use dynamic imports for large components
- Remove unused dependencies
- Enable compression

### Caching

- Static assets: CDN caching
- API responses: ISR with revalidation
- Database queries: Connection pooling

## Security

### Security Headers

Configured in `next.config.js`:
- Strict-Transport-Security
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

### Environment Variables

- Never commit `.env` files
- Use `.env.example` as template
- Rotate secrets regularly
- Use secure secret management

## Monitoring

### Error Tracking

- Sentry for error tracking
- All errors logged with context
- Alerts configured for critical errors

### Analytics

- Google Analytics for user behavior
- Track page views and events
- Monitor Core Web Vitals

### Performance

- Monitor bundle size
- Track API response times
- Monitor database performance

## Rollback Strategy

1. Keep previous deployment artifacts
2. Document rollback procedure
3. Test rollback process
4. Have database migration rollback scripts

## Environment-Specific Configuration

### Development

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Production

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com/api
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Troubleshooting

### Build Failures

1. Check TypeScript errors: `npm run type-check`
2. Check lint errors: `npm run lint`
3. Check test failures: `npm test`
4. Review build logs

### Runtime Errors

1. Check Sentry for error details
2. Review server logs
3. Check environment variables
4. Verify database connection

## Best Practices

- ✅ Always test build locally before deploying
- ✅ Use environment variables for configuration
- ✅ Monitor error rates and performance
- ✅ Keep dependencies updated
- ✅ Document deployment process
- ✅ Have rollback plan ready

