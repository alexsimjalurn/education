# Lessons Feature

Lesson management feature for creating, viewing, updating, and deleting lessons within courses.

## Overview

This feature handles:
- Lesson listing and browsing
- Lesson creation and management
- Lesson content display
- Lesson progress tracking

## Structure

```
lessons/
├── components/
│   ├── LessonCard.tsx         # Lesson card component
│   └── LessonList.tsx         # Lesson list component
├── hooks/
│   └── useLessons.ts          # Lessons management hook
├── services.ts                # Lessons API service
├── types.ts                   # TypeScript types
└── README.md                  # This file
```

## Components

### LessonCard

Displays lesson information in a card format.

**Props**:
- `lesson: Lesson` - Lesson data
- `onClick?: (lessonId: string) => void` - Optional click callback

**Usage**:
```tsx
import { LessonCard } from '@/features/lessons/components/LessonCard';

<LessonCard
  lesson={lessonData}
  onClick={(lessonId) => navigateToLesson(lessonId)}
/>
```

### LessonList

Displays a list of lessons.

**Props**: (TODO - define props)

**Usage**:
```tsx
import { LessonList } from '@/features/lessons/components/LessonList';

<LessonList courseId="123" />
```

## Hooks

### useLessons

Lessons management hook that provides:
- `lessons` - Array of lessons
- `isLoading` - Loading state
- `error` - Error message
- `fetchLessons()` - Fetch lessons (optionally filtered by courseId)
- `createLesson(data)` - Create a new lesson
- `updateLesson(id, data)` - Update a lesson
- `deleteLesson(id)` - Delete a lesson

**Usage**:
```tsx
import { useLessons } from '@/features/lessons/hooks/useLessons';

const { lessons, isLoading, fetchLessons, createLesson } = useLessons(courseId);
```

## Services

### lessonService

Service layer for lessons API calls:
- `getAll(courseId?)` - GET /api/lessons?courseId=...
- `getById(id)` - GET /api/lessons/[id]
- `create(data)` - POST /api/lessons
- `update(id, data)` - PUT /api/lessons/[id]
- `delete(id)` - DELETE /api/lessons/[id]

**Usage**:
```tsx
import { lessonService } from '@/features/lessons/services';

const lessons = await lessonService.getAll(courseId);
const lesson = await lessonService.getById('123');
```

## Types

### Lesson

```typescript
interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}
```

### CreateLessonData

```typescript
interface CreateLessonData {
  courseId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
}
```

### UpdateLessonData

```typescript
type UpdateLessonData = Partial<CreateLessonData>;
```

## API Endpoints

- `GET /api/lessons` - Get all lessons (optionally filtered by courseId)
- `GET /api/lessons/[id]` - Get lesson by ID
- `POST /api/lessons` - Create a new lesson
- `PUT /api/lessons/[id]` - Update a lesson
- `DELETE /api/lessons/[id]` - Delete a lesson

See [API Contracts](../../docs/API_CONTRACTS.md#lessons) for detailed API documentation.

## State Management

Lesson state is managed locally in the `useLessons` hook:
- Fetched lessons stored in hook state
- No global state needed (feature-specific)

## Testing

Tests are co-located with source files:
- `components/LessonCard.test.tsx` (TODO)
- `hooks/useLessons.test.ts` (TODO)

## Related Documentation

- [Component Architecture](../../docs/COMPONENT_ARCHITECTURE.md)
- [Hooks Architecture](../../docs/HOOKS_ARCHITECTURE.md)
- [Service Layer](../../docs/SERVICE_LAYER.md)
- [State Management](../../docs/STATE_MANAGEMENT.md)

