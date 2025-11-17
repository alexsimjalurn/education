# API Routes

This directory contains Next.js API routes organized by feature.

## Structure

```
pages/api/
├── auth/
│   ├── login.ts        # POST /api/auth/login
│   ├── register.ts     # POST /api/auth/register
│   ├── logout.ts       # POST /api/auth/logout
│   └── me.ts           # GET /api/auth/me
├── courses/
│   ├── index.ts        # GET, POST /api/courses
│   └── [id].ts         # GET, PUT, DELETE /api/courses/[id]
└── lessons/
    ├── index.ts        # GET, POST /api/lessons
    └── [id].ts         # GET, PUT, DELETE /api/lessons/[id]
```

## Principles

- ✅ **Feature-based structure**: Routes organized by feature
- ✅ **Strict typing**: All requests and responses are strictly typed
- ✅ **Input validation**: All inputs are validated
- ✅ **Consistent responses**: Standard response format
- ✅ **Error handling**: Consistent error handling

## Standard API Route

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

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "details": { ... }
  }
}
```

## Authentication

Use `requireAuth` middleware to protect routes:

```typescript
const userId = requireAuth(req);
```

## Validation

All inputs must be validated:

```typescript
const data = validateLoginRequest(req.body);
```

## Best Practices

1. **Use `createApiHandler`**: For method validation
2. **Validate inputs**: Always validate request data
3. **Log requests**: Use `logRequest` for debugging
4. **Type responses**: Strictly type all responses
5. **Handle errors**: Use consistent error handling

