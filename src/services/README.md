# Services

This directory contains the centralized API client for all HTTP requests.

## API Client (`apiClient.ts`)

The `apiClient` is a singleton instance that provides:

- ✅ **Strict Typing**: Type-safe requests and responses
- ✅ **Error Handling**: Centralized error handling and logging
- ✅ **Request Interceptors**: Automatic token injection
- ✅ **Response Interceptors**: Error handling and logging
- ✅ **Timeout**: 30-second timeout for all requests

## Usage

The API client should **never** be used directly in components. Always use feature services:

```typescript
// ❌ DON'T: Direct API call in component
const response = await apiClient.get('/api/courses');

// ✅ DO: Use service layer
const courses = await courseService.getAll();
```

## Features

### Automatic Token Injection

The API client automatically adds the authentication token to all requests:

```typescript
// Token is automatically added from localStorage
const response = await courseService.getAll();
```

### Error Handling

All errors are:
1. Logged via the logger
2. Converted to `ApiError` for consistent handling
3. Handled for specific cases (e.g., 401 redirects to login)

### Type Safety

All methods are strictly typed:

```typescript
// GET request
const response = await apiClient.get<Course[]>('/api/courses');
// response.data is typed as Course[]

// POST request
const response = await apiClient.post<Course, CreateCourseData>(
  '/api/courses',
  data
);
// response.data is typed as Course
// data parameter is typed as CreateCourseData
```

## Methods

### `get<T>(url, config?)`

GET request with typed response.

```typescript
const response = await apiClient.get<Course[]>('/api/courses');
```

### `post<T, D>(url, data?, config?)`

POST request with typed request and response.

```typescript
const response = await apiClient.post<Course, CreateCourseData>(
  '/api/courses',
  data
);
```

### `put<T, D>(url, data?, config?)`

PUT request with typed request and response.

```typescript
const response = await apiClient.put<Course, UpdateCourseData>(
  '/api/courses/123',
  data
);
```

### `delete<T>(url, config?)`

DELETE request with typed response.

```typescript
await apiClient.delete('/api/courses/123');
```

## Error Handling

Errors are automatically handled by interceptors:

1. **401 Unauthorized**: Clears token and redirects to login
2. **Other Errors**: Converted to `ApiError` and logged
3. **Network Errors**: Handled and logged

## Configuration

The API client is configured with:

- **Base URL**: `process.env.NEXT_PUBLIC_API_URL` or `/api`
- **Timeout**: 30 seconds
- **Headers**: `Content-Type: application/json`
- **Auth**: Automatic token injection from localStorage

## Best Practices

1. **Never use apiClient directly in components**
   - Always use feature services
   - Services provide domain-specific methods

2. **Use strict typing**
   - Always specify response type: `apiClient.get<Type>(url)`
   - Always specify request type for POST/PUT: `apiClient.post<ResponseType, RequestType>(url, data)`

3. **Let interceptors handle errors**
   - Don't try-catch in services unless you need specific handling
   - Errors are automatically logged and converted to ApiError

4. **Use feature services**
   - Each feature has its own service file
   - Services provide typed, domain-specific methods

