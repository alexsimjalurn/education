# Features

This directory contains feature-first modules. Each feature is self-contained with its components, hooks, services, and tests.

## Structure

```
features/
├── auth/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   └── LoginForm.test.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useAuth.test.ts
│   ├── services.ts
│   └── types.ts
├── courses/
│   ├── components/
│   │   ├── CourseCard.tsx
│   │   └── CourseCard.test.tsx
│   ├── hooks/
│   │   ├── useCourses.ts
│   │   └── useCourses.test.ts
│   ├── services.ts
│   └── types.ts
└── lessons/
    ├── components/
    ├── hooks/
    ├── services.ts
    └── types.ts
```

## Test Structure

Tests are co-located with source files:

- **Component tests**: `components/ComponentName.test.tsx`
- **Hook tests**: `hooks/useHookName.test.ts`
- **Service tests**: `services.test.ts`

## Principles

- ✅ **Self-contained**: Each feature contains all its code
- ✅ **Tested**: All components, hooks, and services have tests
- ✅ **Typed**: Strict TypeScript types
- ✅ **Documented**: JSDoc comments
