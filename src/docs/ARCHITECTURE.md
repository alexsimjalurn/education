# Architecture Overview

This document provides an overview of the application architecture and design decisions.

## Architecture Principles

### 1. Feature-First Structure
The codebase is organized by features rather than by technical layers. Each feature is self-contained with its own components, hooks, services, and types.

**Benefits:**
- Easy to locate code related to a specific feature
- Features can be developed and tested independently
- Clear boundaries between features
- Easier to scale as the application grows

### 2. Component Separation

#### UI Components (`src/components/ui/`)
- Reusable, atomic components
- No business logic
- Generic and configurable
- Examples: `Button`, `Input`, `Card`, `Spinner`

#### Feature Components (`src/features/[feature]/components/`)
- Business logic specific to a feature
- Can use feature hooks and services
- Examples: `LoginForm`, `CourseCard`, `LessonList`

#### Layout Components (`src/components/layout/`)
- Shared layout components
- Examples: `Header`, `Footer`, `Sidebar`

### 3. Hooks Separation

#### Global Hooks (`src/hooks/`)
- Reusable across multiple features
- Examples: `useWindowSize`, `useDebounce`

#### Feature Hooks (`src/features/[feature]/hooks/`)
- Business logic for a specific feature
- Examples: `useAuth`, `useCourses`, `useLessons`

### 4. Service Layer

All API calls go through a service layer:
- Located in `src/features/[feature]/services.ts`
- Typed responses
- Consistent error handling
- Centralized API client in `src/services/apiClient.ts`

### 5. State Management

#### Global State
- Zustand stores in `src/store/`
- One store per domain
- Example: `userStore.ts`

#### Local State
- React hooks (`useState`, `useReducer`)
- Component-specific state
- Custom hooks for reusable state logic

### 6. Error Handling

Layered error handling strategy:
1. **Custom Error Classes** (`src/lib/errors.ts`)
   - Typed errors (ValidationError, NotFoundError, etc.)
2. **Error Boundaries** (`src/components/errors/ErrorBoundary.tsx`)
   - React error boundaries for component-level errors
3. **Error Logging** (`src/lib/logger.ts`)
   - Centralized logging utility
4. **API Error Handling**
   - Interceptors in API client
   - Consistent error responses

### 7. Styling & Theming

- **Tailwind CSS** for utility-first styling
- **Theme System** (`src/styles/theme.ts`)
  - Consistent colors, spacing, typography
  - Centralized design tokens
- **Responsive Design**
  - Mobile-first approach
  - Breakpoints defined in theme

### 8. Testing Strategy

- **Unit Tests**: Component and utility tests
- **Integration Tests**: Feature workflows
- **E2E Tests**: User journeys (to be implemented)
- **Test Coverage**: Minimum 70% coverage required

### 9. Code Quality

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **TypeScript**: Strict mode enabled
- **Type Safety**: No `any` types allowed

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Route groups
│   ├── (dashboard)/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
│
├── components/             # Shared components
│   ├── ui/                 # Atomic UI components
│   ├── layout/             # Layout components
│   └── errors/             # Error handling components
│
├── features/               # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services.ts
│   │   └── types.ts
│   ├── courses/
│   └── lessons/
│
├── hooks/                  # Global hooks
├── lib/                    # Utilities
│   ├── errors.ts           # Error classes
│   ├── logger.ts           # Logging utility
│   ├── formatDate.ts
│   ├── validation.ts
│   └── helpers.ts
│
├── services/               # Shared services
│   └── apiClient.ts        # API client
│
├── store/                  # Global state
│   └── userStore.ts
│
├── styles/                 # Styling
│   ├── globals.css
│   └── theme.ts
│
├── configs/                # Configuration
│   └── config.ts
│
├── pages/                  # API routes
│   └── api/
│
├── server/                 # Server-only code
│   ├── db/
│   └── jobs/
│
├── tests/                  # Test files
└── docs/                   # Documentation
    └── ADR/                # Architecture Decision Records
```

## Data Flow

1. **User Interaction** → Component
2. **Component** → Feature Hook
3. **Feature Hook** → Service
4. **Service** → API Client
5. **API Client** → Backend API
6. **Response** → Service → Hook → Component → UI Update

## Error Flow

1. **Error Occurs** → Caught by service/hook
2. **Error Handling** → Converted to AppError
3. **Error Logging** → Logged via logger
4. **Error Display** → Shown via ErrorDisplay component
5. **Error Recovery** → ErrorBoundary handles React errors

## Best Practices

1. **Type Safety**: Always use TypeScript types
2. **Error Handling**: Use custom error classes
3. **Logging**: Use logger utility, not console.log
4. **Testing**: Write tests for all features
5. **Documentation**: Document complex logic
6. **Code Style**: Follow coding standards
7. **Performance**: Optimize images, lazy load
8. **Accessibility**: Follow WCAG guidelines

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier

## References

- [Feature-First Architecture ADR](./ADR/0002-feature-first-architecture.md)
- [Error Handling Strategy ADR](./ADR/0003-error-handling-strategy.md)
- [Coding Standards](./CODING_STANDARDS.md)
- [Production Checklist](../../PRODUCTION_CHECKLIST.md)

