# Auth Feature

Authentication feature for user login, registration, and session management.

## Overview

This feature handles:
- User authentication (login/logout)
- User registration
- Session management
- Protected routes

## Structure

```
auth/
├── components/
│   ├── LoginForm.tsx          # Login form component
│   └── RegisterForm.tsx       # Registration form component
├── hooks/
│   └── useAuth.ts             # Authentication hook
├── services.ts                # Auth API service
├── types.ts                   # TypeScript types
└── README.md                  # This file
```

## Components

### LoginForm

Login form component with email and password fields.

**Props**: None (uses `useAuth` hook internally)

**Usage**:
```tsx
import { LoginForm } from '@/features/auth/components/LoginForm';

<LoginForm />
```

### RegisterForm

Registration form component with name, email, password, and confirm password fields.

**Props**: None (uses `useAuth` hook internally)

**Usage**:
```tsx
import { RegisterForm } from '@/features/auth/components/RegisterForm';

<RegisterForm />
```

## Hooks

### useAuth

Authentication hook that provides:
- `user` - Current authenticated user
- `isLoading` - Loading state
- `error` - Error message
- `login(credentials)` - Login function
- `register(data)` - Registration function
- `logout()` - Logout function
- `isAuthenticated` - Boolean indicating if user is authenticated

**Usage**:
```tsx
import { useAuth } from '@/features/auth/hooks/useAuth';

const { user, login, logout, isAuthenticated } = useAuth();
```

## Services

### authService

Service layer for authentication API calls:
- `login(credentials)` - POST /api/auth/login
- `register(data)` - POST /api/auth/register
- `logout()` - POST /api/auth/logout
- `getCurrentUser()` - GET /api/auth/me

**Usage**:
```tsx
import { authService } from '@/features/auth/services';

const response = await authService.login({ email, password });
```

## Types

### User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
  createdAt: string;
}
```

### AuthResponse

```typescript
interface AuthResponse {
  user: User;
  token: string;
}
```

### LoginCredentials

```typescript
interface LoginCredentials {
  email: string;
  password: string;
}
```

### RegisterData

```typescript
interface RegisterData {
  name: string;
  email: string;
  password: string;
}
```

## API Endpoints

- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

See [API Contracts](../../docs/API_CONTRACTS.md#auth) for detailed API documentation.

## State Management

Authentication state is managed globally using `userStore`:
- User session persisted to localStorage
- Global access via `useUserStore()` hook

## Testing

Tests are co-located with source files:
- `components/LoginForm.test.tsx` (TODO)
- `components/RegisterForm.test.tsx` (TODO)
- `hooks/useAuth.test.ts` (TODO)

## Related Documentation

- [Component Architecture](../../docs/COMPONENT_ARCHITECTURE.md)
- [Hooks Architecture](../../docs/HOOKS_ARCHITECTURE.md)
- [Service Layer](../../docs/SERVICE_LAYER.md)
- [State Management](../../docs/STATE_MANAGEMENT.md)

