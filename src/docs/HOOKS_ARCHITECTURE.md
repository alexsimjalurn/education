# Hooks Architecture

This document explains the hooks architecture and separation between global and feature-specific hooks.

## Hook Types

### Global Hooks (`src/hooks/`)

**Purpose**: Reusable hooks that can be used across multiple features.

**Characteristics**:
- ✅ **Pure Logic**: No UI, only business logic
- ✅ **Reusable**: Can be used in any feature
- ✅ **Prefix `use`**: All hooks start with `use`
- ✅ **Generic**: Not tied to any specific feature
- ✅ **Well Documented**: JSDoc comments with examples

**Examples**:
- `useWindowSize` - Tracks window dimensions
- `useDebounce` - Debounces values (useful for input fields)

**Location**: `src/hooks/use[Name].ts`

---

### Feature Hooks (`src/features/[feature]/hooks/`)

**Purpose**: Hooks that contain business logic specific to a feature.

**Characteristics**:
- ✅ **Pure Logic**: No UI, only business logic
- ✅ **Feature-Specific**: Tied to a particular feature
- ✅ **Prefix `use`**: All hooks start with `use`
- ✅ **Uses Feature Services**: Can call feature services
- ✅ **Well Documented**: JSDoc comments with examples

**Examples**:
- `useAuth` - Authentication logic (login, logout, register)
- `useCourses` - Course management logic (fetch, create, update, delete)
- `useLessons` - Lesson management logic (fetch, create, update, delete)

**Location**: `src/features/[feature]/hooks/use[Name].ts`

---

## Examples

### ✅ Global Hook: useDebounce

```typescript
// src/hooks/useDebounce.ts
'use client';

import { useEffect, useState } from 'react';

/**
 * useDebounce Hook
 *
 * Global reusable hook that debounces a value.
 * Pure logic, no UI - delays value updates until specified delay has passed.
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

**Usage**:
```tsx
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  performSearch(debouncedSearchTerm);
}, [debouncedSearchTerm]);
```

### ✅ Feature Hook: useAuth

```typescript
// src/features/auth/hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';

import { useUserStore } from '@/store/userStore';

import { authService } from '../services';
import type { LoginCredentials, RegisterData } from '../types';

/**
 * useAuth Hook
 *
 * Feature-specific hook for authentication logic.
 * Pure logic, no UI - handles login, logout, registration, and auth state.
 */
export const useAuth = () => {
  const { user, setUser, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    // Login logic
  };

  const logout = async () => {
    // Logout logic
  };

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
```

**Usage**:
```tsx
const { user, login, logout, isAuthenticated } = useAuth();

const handleLogin = async () => {
  await login({ email: 'user@example.com', password: 'password' });
};
```

### ✅ Feature Hook: useCourses

```typescript
// src/features/courses/hooks/useCourses.ts
'use client';

import { useEffect, useState } from 'react';

import { courseService } from '../services';
import type { Course, CreateCourseData } from '../types';

/**
 * useCourses Hook
 *
 * Feature-specific hook for course management logic.
 * Pure logic, no UI - handles fetching, creating, updating, and deleting courses.
 */
export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    // Fetch logic
  };

  const createCourse = async (data: CreateCourseData) => {
    // Create logic
  };

  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    createCourse,
  };
};
```

**Usage**:
```tsx
const { courses, isLoading, fetchCourses, createCourse } = useCourses();

useEffect(() => {
  fetchCourses();
}, []);

const handleCreate = async () => {
  await createCourse({ title: 'New Course', ... });
};
```

## Decision Tree

When creating a new hook, ask:

1. **Is it reusable across multiple features?**
   - ✅ Yes → Global Hook (`src/hooks/`)
   - ❌ No → Feature Hook (`src/features/[feature]/hooks/`)

2. **Does it contain feature-specific business logic?**
   - ✅ Yes → Feature Hook
   - ❌ No → Global Hook

3. **Is it tied to a specific feature/domain?**
   - ✅ Yes → Feature Hook
   - ❌ No → Global Hook

## Rules

### All Hooks
- ✅ **Prefix with `use`**: `useAuth`, `useDebounce`, `useCourses`
- ✅ **Pure Logic**: No UI components, only logic
- ✅ **Well Documented**: JSDoc with description and examples
- ✅ **Type Safe**: Strongly typed with TypeScript

### Global Hooks
- ❌ **No feature-specific logic**
- ❌ **No feature services**
- ✅ **Can use other global hooks**
- ✅ **Can use global utilities**

### Feature Hooks
- ✅ **Can use feature services**
- ✅ **Can use feature types**
- ✅ **Can use global hooks**
- ✅ **Can use global utilities**
- ❌ **Should not use other feature hooks**

## File Naming

- **Global Hooks**: `use[Name].ts` (e.g., `useDebounce.ts`)
- **Feature Hooks**: `use[Name].ts` (e.g., `useAuth.ts`)

## Import Order in Feature Hooks

```typescript
// 1. External libraries
import { useEffect, useState } from 'react';

// 2. Absolute imports (global hooks, stores, utilities)
import { useUserStore } from '@/store/userStore';

// 3. Feature imports (services, types)
import { authService } from '../services';
import type { LoginCredentials } from '../types';
```

## Summary

| Aspect | Global Hooks | Feature Hooks |
|--------|-------------|---------------|
| **Location** | `src/hooks/` | `src/features/[feature]/hooks/` |
| **Reusability** | ✅ High | ❌ Feature-specific |
| **Business Logic** | ❌ Generic utilities | ✅ Feature-specific |
| **Uses Services** | ❌ No | ✅ Yes (feature services) |
| **Uses Global Hooks** | ✅ Yes | ✅ Yes |
| **Prefix** | ✅ `use` | ✅ `use` |
| **UI Components** | ❌ No | ❌ No |

