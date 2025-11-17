# Courses Feature

Course management feature for creating, viewing, updating, and deleting courses.

## Overview

This feature handles:
- Course listing and browsing
- Course creation and management
- Course enrollment
- Course details

## Structure

```
courses/
├── components/
│   ├── CourseCard.tsx         # Course card component
│   └── CourseList.tsx         # Course list component
├── hooks/
│   └── useCourses.ts          # Courses management hook
├── services.ts                # Courses API service
├── types.ts                   # TypeScript types
└── README.md                  # This file
```

## Components

### CourseCard

Displays course information in a card format.

**Props**:
- `course: Course` - Course data
- `onEnroll?: (courseId: string) => void` - Optional enroll callback

**Usage**:
```tsx
import { CourseCard } from '@/features/courses/components/CourseCard';

<CourseCard
  course={courseData}
  onEnroll={(courseId) => handleEnroll(courseId)}
/>
```

### CourseList

Displays a list of courses.

**Props**: (TODO - define props)

**Usage**:
```tsx
import { CourseList } from '@/features/courses/components/CourseList';

<CourseList />
```

## Hooks

### useCourses

Courses management hook that provides:
- `courses` - Array of courses
- `isLoading` - Loading state
- `error` - Error message
- `fetchCourses()` - Fetch all courses
- `createCourse(data)` - Create a new course
- `updateCourse(id, data)` - Update a course
- `deleteCourse(id)` - Delete a course

**Usage**:
```tsx
import { useCourses } from '@/features/courses/hooks/useCourses';

const { courses, isLoading, fetchCourses, createCourse } = useCourses();
```

## Services

### courseService

Service layer for courses API calls:
- `getAll()` - GET /api/courses
- `getById(id)` - GET /api/courses/[id]
- `create(data)` - POST /api/courses
- `update(id, data)` - PUT /api/courses/[id]
- `delete(id)` - DELETE /api/courses/[id]

**Usage**:
```tsx
import { courseService } from '@/features/courses/services';

const courses = await courseService.getAll();
const course = await courseService.getById('123');
```

## Types

### Course

```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}
```

### CreateCourseData

```typescript
interface CreateCourseData {
  title: string;
  description: string;
  instructor: string;
  duration: number;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail?: string;
}
```

### UpdateCourseData

```typescript
type UpdateCourseData = Partial<CreateCourseData>;
```

## API Endpoints

- `GET /api/courses` - Get all courses
- `GET /api/courses/[id]` - Get course by ID
- `POST /api/courses` - Create a new course
- `PUT /api/courses/[id]` - Update a course
- `DELETE /api/courses/[id]` - Delete a course

See [API Contracts](../../docs/API_CONTRACTS.md#courses) for detailed API documentation.

## State Management

Course state is managed locally in the `useCourses` hook:
- Fetched courses stored in hook state
- No global state needed (feature-specific)

## Testing

Tests are co-located with source files:
- `components/CourseCard.test.tsx` ✅
- `hooks/useCourses.test.ts` ✅

## Related Documentation

- [Component Architecture](../../docs/COMPONENT_ARCHITECTURE.md)
- [Hooks Architecture](../../docs/HOOKS_ARCHITECTURE.md)
- [Service Layer](../../docs/SERVICE_LAYER.md)
- [State Management](../../docs/STATE_MANAGEMENT.md)

