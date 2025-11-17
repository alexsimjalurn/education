# Service Layer Architecture

This document explains the service layer architecture and how API calls should be structured.

## Principles

### ✅ All API Calls Through Service Layer

**Never make API calls directly in components or hooks.** Always use the service layer.

```typescript
// ❌ DON'T: Direct API call in component
const Component = () => {
  const [data, setData] = useState();
  
  useEffect(() => {
    fetch('/api/courses').then(res => res.json()).then(setData);
  }, []);
};

// ✅ DO: Use service layer
const Component = () => {
  const { courses, fetchCourses } = useCourses();
  
  useEffect(() => {
    fetchCourses();
  }, []);
};
```

### ✅ Strict Typing of Request/Response

All service methods must have strict TypeScript types for both requests and responses.

```typescript
// ✅ Strict typing
export const courseService = {
  async getAll(): Promise<Course[]> {
    const response = await apiClient.get<Course[]>('/api/courses');
    return response.data;
  },
  
  async create(data: CreateCourseData): Promise<Course> {
    const response = await apiClient.post<Course, CreateCourseData>(
      '/api/courses',
      data
    );
    return response.data;
  },
};
```

### ✅ Error Handling in Service

Error handling is done at two levels:

1. **API Client Level**: Interceptors handle common errors (401, network errors, etc.)
2. **Service Level**: Validation and domain-specific error handling

```typescript
// Service-level validation
async create(data: CreateCourseData): Promise<Course> {
  if (!data.title || !data.description) {
    throw new Error('Title and description are required');
  }
  
  // API client handles HTTP errors
  const response = await apiClient.post<Course, CreateCourseData>(
    '/api/courses',
    data
  );
  return response.data;
}
```

### ✅ No API Calls in Components

Components should only use hooks, which in turn use services.

```typescript
// Component → Hook → Service → API Client
// Component
const CourseList = () => {
  const { courses, isLoading } = useCourses(); // Hook
  // ...
};

// Hook
export const useCourses = () => {
  const fetchCourses = async () => {
    const data = await courseService.getAll(); // Service
    // ...
  };
};

// Service
export const courseService = {
  async getAll(): Promise<Course[]> {
    return apiClient.get<Course[]>('/api/courses'); // API Client
  },
};
```

## Architecture

### Layer Structure

```
┌─────────────────┐
│   Components     │  ← UI Layer (no API calls)
└────────┬─────────┘
         │
┌────────▼─────────┐
│      Hooks       │  ← Logic Layer (uses services)
└────────┬─────────┘
         │
┌────────▼─────────┐
│    Services      │  ← Service Layer (API calls)
└────────┬─────────┘
         │
┌────────▼─────────┐
│   API Client     │  ← HTTP Layer (axios)
└─────────────────┘
```

### API Client (`src/services/apiClient.ts`)

Centralized HTTP client with:
- Request/response interceptors
- Automatic token injection
- Error handling and logging
- Type-safe methods

### Feature Services (`src/features/[feature]/services.ts`)

Domain-specific services that:
- Use the API client
- Provide typed methods
- Handle domain-specific validation
- Return typed responses

## Examples

### Course Service

```typescript
// src/features/courses/services.ts
import { apiClient } from '@/services/apiClient';
import type { Course, CreateCourseData, UpdateCourseData } from './types';

export const courseService = {
  /**
   * Get all courses
   * @returns Array of courses
   * @throws {ApiError} If request fails
   */
  async getAll(): Promise<Course[]> {
    const response = await apiClient.get<Course[]>('/api/courses');
    return response.data;
  },

  /**
   * Create a new course
   * @param data - Course creation data
   * @returns Created course
   * @throws {ApiError} If request fails
   */
  async create(data: CreateCourseData): Promise<Course> {
    // Validation
    if (!data.title || !data.description) {
      throw new Error('Title and description are required');
    }
    
    // API call with strict typing
    const response = await apiClient.post<Course, CreateCourseData>(
      '/api/courses',
      data
    );
    return response.data;
  },
};
```

### Auth Service

```typescript
// src/features/auth/services.ts
import { apiClient } from '@/services/apiClient';
import type { LoginCredentials, AuthResponse } from './types';

export const authService = {
  /**
   * Login user
   * @param credentials - Login credentials
   * @returns Auth response with user and token
   * @throws {ApiError} If login fails
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }
    
    // API call with strict typing
    const response = await apiClient.post<AuthResponse, LoginCredentials>(
      '/api/auth/login',
      credentials
    );
    return response.data;
  },
};
```

## Type Safety

### Request Types

Always type request data:

```typescript
// ✅ Typed request
async create(data: CreateCourseData): Promise<Course> {
  const response = await apiClient.post<Course, CreateCourseData>(
    '/api/courses',
    data // TypeScript ensures data matches CreateCourseData
  );
  return response.data;
}
```

### Response Types

Always type response data:

```typescript
// ✅ Typed response
async getAll(): Promise<Course[]> {
  const response = await apiClient.get<Course[]>('/api/courses');
  return response.data; // TypeScript knows this is Course[]
}
```

## Error Handling

### API Client Interceptors

The API client automatically handles:
- 401 Unauthorized → Clears token, redirects to login
- Network errors → Logs and converts to ApiError
- All errors → Logs and converts to ApiError

### Service-Level Validation

Services can add validation before API calls:

```typescript
async create(data: CreateCourseData): Promise<Course> {
  // Service-level validation
  if (!data.title) {
    throw new Error('Title is required');
  }
  
  // API call (errors handled by apiClient)
  const response = await apiClient.post<Course, CreateCourseData>(
    '/api/courses',
    data
  );
  return response.data;
}
```

## Rules

### ✅ DO

- Use feature services for all API calls
- Use strict typing for requests and responses
- Add validation in services when needed
- Let API client handle common errors
- Document service methods with JSDoc

### ❌ DON'T

- Make API calls directly in components
- Make API calls directly in hooks (use services)
- Use `any` types
- Skip error handling
- Duplicate API logic

## File Structure

```
src/
├── services/
│   ├── apiClient.ts          # Centralized HTTP client
│   └── README.md
└── features/
    ├── courses/
    │   ├── services.ts       # Course service
    │   ├── hooks/
    │   │   └── useCourses.ts # Uses courseService
    │   └── components/
    │       └── CourseList.tsx # Uses useCourses hook
    └── auth/
        ├── services.ts       # Auth service
        ├── hooks/
        │   └── useAuth.ts    # Uses authService
        └── components/
            └── LoginForm.tsx # Uses useAuth hook
```

## Summary

| Layer | Responsibility | Can Call |
|-------|---------------|----------|
| **Components** | UI rendering | Hooks only |
| **Hooks** | Business logic | Services only |
| **Services** | API calls | API Client only |
| **API Client** | HTTP requests | External API |

**Flow**: Component → Hook → Service → API Client → API

