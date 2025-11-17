# Coding Standards

This document outlines the coding standards and best practices for this project.

> **Note**: For detailed coding style rules (semicolons, quotes, indentation, import order), see [CODING_STYLE.md](./CODING_STYLE.md)

## TypeScript

### Type Safety
- Always use TypeScript types, **never use `any`** unless absolutely necessary
- Use `unknown` instead of `any` when type is truly unknown
- Use interfaces for object shapes
- Use type unions for discriminated unions
- Prefer `type` for unions and intersections, `interface` for objects
- TypeScript strict mode is enabled with all strict checks

### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types/Interfaces**: PascalCase (e.g., `User`, `CourseData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Files**: Match the export (e.g., `UserProfile.tsx` exports `UserProfile`)

## React

### Component Structure
```typescript
// 1. External imports
import React from 'react';
import { NextPage } from 'next';

// 2. Absolute imports (@/...)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';

// 3. Relative imports (./...)
import { formatDate } from './helpers';

// 4. Types/Interfaces
interface ComponentProps {
  title: string;
  onAction: () => void;
}

// 5. Component
export const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // 6. Hooks
  const { user } = useAuth();
  
  // 7. Handlers
  const handleClick = () => {
    onAction();
  };
  
  // 8. Render
  return <div>{title}</div>;
};
```

### Hooks Rules
- Always use hooks at the top level
- Use custom hooks to extract logic
- Separate global hooks from feature hooks

### Props
- Use destructuring for props
- Provide default values when appropriate
- Use TypeScript for prop validation

## File Organization

### Feature-First Structure
- Keep feature code in `src/features/[feature-name]/`
- Shared components in `src/components/`
- Global hooks in `src/hooks/`
- Utilities in `src/lib/`

### File Naming
- One component per file
- File name matches component name
- Use `.tsx` for React components
- Use `.ts` for utilities and types

## Error Handling

### Error Classes
Use custom error classes from `@/lib/errors`:
```typescript
import { ValidationError, NotFoundError } from '@/lib/errors'

if (!email) {
  throw new ValidationError('Email is required')
}
```

### Error Boundaries
Wrap components in ErrorBoundary for error recovery:
```typescript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## Styling

### Tailwind CSS
- Use Tailwind utility classes
- Follow mobile-first approach
- Use theme colors from `tailwind.config.js`
- Extract repeated patterns to components

### Component Styling
```typescript
// Good
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg">
  Click me
</button>

// Better - Extract to component
<Button variant="primary">Click me</Button>
```

## Testing

### Test Structure
```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Arrange
    // Act
    // Assert
  })
})
```

### Test Coverage
- Aim for >70% coverage
- Test user interactions, not implementation
- Use React Testing Library best practices

## API Services

### Service Layer
- All API calls go through service layer
- Services in `src/features/[feature]/services.ts`
- Use typed responses
- Handle errors consistently

```typescript
export const courseService = {
  async getAll(): Promise<Course[]> {
    try {
      const response = await apiClient.get<Course[]>('/api/courses')
      return response.data
    } catch (error) {
      logError(error)
      throw handleError(error)
    }
  },
}
```

## State Management

### Global State
- Use Zustand for global state
- Keep stores in `src/store/`
- One store per domain

### Local State
- Use `useState` for component state
- Use `useReducer` for complex state
- Extract to custom hooks when reusable

## Performance

### Optimization
- Use `React.memo` for expensive components
- Use `useMemo` and `useCallback` appropriately
- Lazy load routes and heavy components
- Optimize images

### Code Splitting
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
})
```

## Documentation

### Code Comments
- Comment "why", not "what"
- Use JSDoc for public APIs
- Keep comments up to date

### README Files
- Each feature should have a README if complex
- Document public APIs
- Include usage examples

## Git

### Commit Messages
- Use conventional commits
- Format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat(auth): add login form validation
fix(courses): resolve course list loading issue
```

## Code Review

### Checklist
- [ ] Code follows standards
- [ ] Tests written and passing
- [ ] No console.logs
- [ ] Error handling implemented
- [ ] TypeScript types correct
- [ ] Documentation updated

