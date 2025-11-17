# Testing Guidelines

This document outlines the testing strategy and guidelines for the project.

## Principles

### ✅ Each Feature Has Test Folder

Tests are co-located with the code they test:

```
features/
├── courses/
│   ├── components/
│   │   ├── CourseCard.tsx
│   │   └── CourseCard.test.tsx      # Component tests
│   ├── hooks/
│   │   ├── useCourses.ts
│   │   └── useCourses.test.ts       # Hook tests
│   └── services.ts
│       └── services.test.ts          # Service tests
```

### ✅ Unit + Integration Tests

- **Unit Tests**: Test individual functions, components, hooks in isolation
- **Integration Tests**: Test how multiple units work together (API routes, service + hook)

### ✅ API Routes Tested

All API routes have corresponding test files:

```
pages/api/
├── auth/
│   ├── login.ts
│   └── login.test.ts
└── courses/
    ├── index.ts
    └── index.test.ts
```

### ✅ File Structure

Tests follow the same structure as source files:

- `features/courses/components/CourseCard.test.tsx`
- `features/courses/hooks/useCourses.test.ts`
- `services/apiClient.test.ts`
- `pages/api/auth/login.test.ts`

### ✅ CI Runs Tests Before Merge

GitHub Actions workflow runs tests on every push and pull request.

## Test Structure

### Component Tests

Test React components with React Testing Library:

```typescript
// features/courses/components/CourseCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CourseCard', () => {
  it('renders course information', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });

  it('calls onEnroll when button is clicked', async () => {
    const handleEnroll = jest.fn();
    const user = userEvent.setup();
    
    render(<CourseCard course={mockCourse} onEnroll={handleEnroll} />);
    
    await user.click(screen.getByRole('button', { name: /enroll/i }));
    expect(handleEnroll).toHaveBeenCalledWith('1');
  });
});
```

### Hook Tests

Test custom hooks with `renderHook`:

```typescript
// features/courses/hooks/useCourses.test.ts
import { renderHook, waitFor } from '@testing-library/react';

describe('useCourses', () => {
  it('fetches courses on mount', async () => {
    (courseService.getAll as jest.Mock).mockResolvedValue([mockCourse]);
    
    const { result } = renderHook(() => useCourses());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(result.current.courses).toEqual([mockCourse]);
  });
});
```

### Service Tests

Test service functions with mocked API client:

```typescript
// services/apiClient.test.ts
describe('apiClient', () => {
  it('handles GET request', async () => {
    const mockResponse = { data: { id: '1' } };
    mockAxiosInstance.get.mockResolvedValue(mockResponse);
    
    const response = await apiClient.get('/test');
    
    expect(response.data).toEqual(mockResponse.data);
  });
});
```

### API Route Tests

Test API routes with mocked dependencies:

```typescript
// pages/api/auth/login.test.ts
describe('/api/auth/login', () => {
  it('returns success response', async () => {
    await handler(mockReq, mockRes);
    
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          user: expect.any(Object),
          token: expect.any(String),
        }),
      })
    );
  });
});
```

## Test Coverage

### Coverage Threshold

Minimum 70% coverage required:

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

### Coverage Report

Run tests with coverage:

```bash
npm run test:coverage
```

## Best Practices

### ✅ DO

- Write tests for all features
- Test user interactions, not implementation details
- Use descriptive test names
- Mock external dependencies
- Test error cases
- Keep tests isolated and independent
- Use `waitFor` for async operations
- Test accessibility

### ❌ DON'T

- Test implementation details
- Test third-party libraries
- Write tests that depend on other tests
- Use `act()` unnecessarily (React Testing Library handles it)
- Test internal state directly
- Skip error cases

## Test Utilities

### Mocking

```typescript
// Mock service
jest.mock('../services', () => ({
  courseService: {
    getAll: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));
```

### Test Data

```typescript
const mockCourse: Course = {
  id: '1',
  title: 'Test Course',
  description: 'Test Description',
  // ...
};
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Run specific test file

```bash
npm test CourseCard.test.tsx
```

## CI/CD

### GitHub Actions Workflow

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

Workflow includes:
1. Install dependencies
2. Run linter
3. Check formatting
4. Type check
5. Run tests with coverage
6. Upload coverage report

### Test Failure

If tests fail, the CI pipeline will fail and prevent merging.

## File Structure Summary

```
src/
├── features/
│   └── courses/
│       ├── components/
│       │   ├── CourseCard.tsx
│       │   └── CourseCard.test.tsx
│       └── hooks/
│           ├── useCourses.ts
│           └── useCourses.test.ts
├── services/
│   ├── apiClient.ts
│   └── apiClient.test.ts
└── pages/
    └── api/
        └── auth/
            ├── login.ts
            └── login.test.ts
```

## Summary

| Aspect | Implementation |
|--------|---------------|
| **Test Location** | Co-located with source files |
| **Test Types** | Unit + Integration |
| **API Tests** | All routes tested |
| **File Structure** | `Component.test.tsx`, `hook.test.ts` |
| **CI** | Runs on push and PR |
| **Coverage** | Minimum 70% required |

