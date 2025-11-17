# Server-Only Logic

This directory contains server-only code that should not be imported in client components.

## Structure

```
server/
├── db/
│   └── client.ts        # Database client (Prisma, etc.)
└── jobs/
    └── README.md        # Background jobs and cron tasks
```

## Principles

- ✅ **Server-Only**: Never imported in client components
- ✅ **Database Logic**: All database operations
- ✅ **Background Jobs**: Cron tasks, scheduled jobs
- ✅ **Server Utilities**: Server-specific utilities

## Database Client

The database client (`db/client.ts`) should:
- Initialize database connection
- Export database client instance
- Handle connection pooling
- Be used only in API routes and server components

### Example (Prisma)

```typescript
// src/server/db/client.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

## Background Jobs

Background jobs (`jobs/`) should:
- Run on schedule (cron)
- Process background tasks
- Send emails, notifications
- Clean up data
- Generate reports

### Example

```typescript
// src/server/jobs/sendDailyReport.ts
export async function sendDailyReport() {
  // Job logic
}
```

## Usage

### In API Routes

```typescript
// src/pages/api/courses/index.ts
import { prisma } from '@/server/db/client';

export default async function handler(req, res) {
  const courses = await prisma.course.findMany();
  // ...
}
```

### In Server Components

```typescript
// src/app/courses/page.tsx
import { prisma } from '@/server/db/client';

export default async function CoursesPage() {
  const courses = await prisma.course.findMany();
  // ...
}
```

## Rules

- ❌ **Never import in client components**
- ❌ **Never use in hooks or client-side code**
- ✅ **Only use in API routes and server components**
- ✅ **Use for database operations**
- ✅ **Use for background jobs**

