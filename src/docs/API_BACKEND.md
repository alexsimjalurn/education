# API & Backend Architecture

This document explains the API and backend architecture.

## Principles

### ✅ Next.js API Routes in `/pages/api/`

All API endpoints are in `src/pages/api/` following Next.js API routes convention.

```
src/pages/api/
├── auth/
│   ├── login.ts
│   ├── register.ts
│   ├── logout.ts
│   └── me.ts
├── courses/
│   ├── index.ts        # GET, POST /api/courses
│   └── [id].ts         # GET, PUT, DELETE /api/courses/[id]
└── lessons/
    ├── index.ts        # GET, POST /api/lessons
    └── [id].ts         # GET, PUT, DELETE /api/lessons/[id]
```

### ✅ Feature-Based API Folder Structure

API routes are organized by feature:
- `auth/` - Authentication endpoints
- `courses/` - Course endpoints
- `lessons/` - Lesson endpoints

### ✅ Server-Only Logic in `/server/`

Server-only code (database, cron jobs) is in `src/server/`:
- `db/client.ts` - Database client
- `jobs/` - Background jobs and cron tasks

### ✅ DTO / Response Types Strictly Typed

All request and response types are strictly typed:

```typescript
// Request DTO
interface LoginRequest {
  email: string;
  password: string;
}

// Response DTO
interface AuthResponse {
  user: User;
  token: string;
}
```

### ✅ Input Validation Required

All API endpoints validate input before processing:

```typescript
// Validate input
const { email, password } = validateLoginRequest(req.body);

// Process request
// ...
```

## API Route Structure

### Standard API Route

```typescript
import { createApiHandler, logRequest, requireBody } from '@/lib/api/middleware';
import { createSuccessResponse, type ApiResponse } from '@/lib/api/types';
import { validateLoginRequest } from '@/lib/api/validation';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<AuthResponse>>
): Promise<void> => {
  logRequest(req);
  requireBody(req);
  
  // Validate input
  const data = validateLoginRequest(req.body);
  
  // Process request
  const result = await processRequest(data);
  
  // Return response
  res.status(200).json(createSuccessResponse(result));
};

export default createApiHandler({
  POST: handler,
});
```

## Request/Response Types

### Standard Response Format

```typescript
// Success response
{
  success: true,
  data: T
}

// Error response
{
  success: false,
  error: {
    message: string;
    code: string;
    details?: unknown;
  }
}
```

### Paginated Response

```typescript
{
  success: true,
  data: {
    data: T[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}
```

## Input Validation

### Validation Functions

Validation functions are in `src/lib/api/validation.ts`:

```typescript
// Validate login request
const { email, password } = validateLoginRequest(req.body);

// Validate register request
const { name, email, password, role } = validateRegisterRequest(req.body);

// Validate course creation
const courseData = validateCreateCourseRequest(req.body);
```

### Validation Rules

- **Required fields**: Checked with `validateRequired()`
- **Email format**: Validated with `validateEmail()`
- **Password strength**: Validated with `validatePassword()`
- **Type checking**: All fields are type-checked
- **Custom rules**: Domain-specific validation

## Error Handling

### Error Response Format

```typescript
{
  success: false,
  error: {
    message: "Error message",
    code: "ERROR_CODE",
    details: {} // Only in development
  }
}
```

### Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Authentication required
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `METHOD_NOT_ALLOWED` - HTTP method not allowed
- `API_ERROR` - General API error

## API Middleware

### createApiHandler

Creates API route handler with method validation:

```typescript
export default createApiHandler({
  GET: getHandler,
  POST: postHandler,
  PUT: putHandler,
  DELETE: deleteHandler,
});
```

### requireAuth

Requires authentication:

```typescript
const userId = requireAuth(req);
```

### requireBody

Requires request body:

```typescript
requireBody(req);
```

### logRequest

Logs API request:

```typescript
logRequest(req, { context: 'additional-info' });
```

## Server-Only Logic

### Database Client

```typescript
// src/server/db/client.ts
import { prisma } from '@/server/db/client';

// In API route
const courses = await prisma.course.findMany();
```

### Background Jobs

```typescript
// src/server/jobs/sendDailyReport.ts
export async function sendDailyReport() {
  // Job logic
}
```

## Examples

### GET Endpoint

```typescript
const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Course[]>>
): Promise<void> => {
  logRequest(req);
  
  const courses = await courseService.getAll();
  
  res.status(200).json(createSuccessResponse(courses));
};

export default createApiHandler({
  GET: getHandler,
});
```

### POST Endpoint with Validation

```typescript
const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Course>>
): Promise<void> => {
  logRequest(req);
  requireAuth(req);
  requireBody(req);
  
  // Validate input
  const courseData = validateCreateCourseRequest(req.body);
  
  // Create course
  const course = await courseService.create(courseData);
  
  res.status(201).json(createSuccessResponse(course));
};

export default createApiHandler({
  POST: postHandler,
});
```

### Dynamic Route

```typescript
const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Course>>
): Promise<void> => {
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    res.status(400).json(
      createErrorResponse('Course ID is required', 'INVALID_ID')
    );
    return;
  }
  
  const course = await courseService.getById(id);
  
  res.status(200).json(createSuccessResponse(course));
};
```

## Best Practices

### ✅ DO

- Use `createApiHandler` for method validation
- Validate all input with validation functions
- Use strict typing for requests and responses
- Log all API requests
- Return consistent response format
- Use server-only code in `/server/`
- Handle errors consistently

### ❌ DON'T

- Skip input validation
- Use `any` types
- Mix server and client code
- Import server code in client components
- Return inconsistent response formats
- Skip error handling

## File Structure

```
src/
├── pages/
│   └── api/              # API routes
│       ├── auth/
│       ├── courses/
│       └── lessons/
├── server/                 # Server-only code
│   ├── db/
│   │   └── client.ts
│   └── jobs/
└── lib/
    └── api/
        ├── middleware.ts   # API middleware
        ├── types.ts        # Response types
        └── validation.ts   # Validation functions
```

## Summary

| Aspect | Implementation |
|--------|---------------|
| **API Routes** | `src/pages/api/` |
| **Structure** | Feature-based folders |
| **Server Logic** | `src/server/` |
| **Types** | Strictly typed DTOs |
| **Validation** | Required for all inputs |
| **Error Handling** | Consistent error responses |
| **Middleware** | `createApiHandler`, `requireAuth`, etc. |

