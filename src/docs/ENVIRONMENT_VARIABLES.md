# Environment Variables

This document describes all environment variables used in the application.

## Required Variables

### Application

- `NODE_ENV`: Environment (development, production)
- `NEXT_PUBLIC_APP_URL`: Application URL (e.g., `http://localhost:3000`)
- `NEXT_PUBLIC_API_URL`: API base URL (e.g., `http://localhost:3000/api`)

### Database

- `DATABASE_URL`: Database connection string (when using Prisma)

### Authentication

- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRES_IN`: JWT expiration time (e.g., `7d`)

## Optional Variables

### Monitoring

- `NEXT_PUBLIC_SENTRY_DSN`: Sentry DSN for error tracking
- `SENTRY_ORG`: Sentry organization
- `SENTRY_PROJECT`: Sentry project name
- `SENTRY_AUTH_TOKEN`: Sentry authentication token
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID

### Email (if applicable)

- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASSWORD`: SMTP password

### File Upload (if applicable)

- `UPLOAD_MAX_SIZE`: Maximum file size in bytes
- `ALLOWED_FILE_TYPES`: Comma-separated list of allowed MIME types

### Rate Limiting

- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window
- `RATE_LIMIT_WINDOW_MS`: Time window in milliseconds

### Feature Flags

- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Enable analytics (true/false)
- `NEXT_PUBLIC_ENABLE_ERROR_TRACKING`: Enable error tracking (true/false)

## Setup

1. Copy `.env.example` to `.env`
2. Fill in all required variables
3. Never commit `.env` file to git
4. Use `.env.example` as template for team

## Production

In production:
- Use secure secret management (AWS Secrets Manager, etc.)
- Rotate secrets regularly
- Never expose secrets in code or logs
- Use different values for each environment

