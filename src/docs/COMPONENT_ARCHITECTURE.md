# Component Architecture

This document explains the distinction between UI Components and Feature Components, and how they should be structured.

## Component Types

### UI Components (`src/components/ui/`)

**Purpose**: Pure, reusable components with no business logic.

**Characteristics**:
- ✅ **Pure & Reusable**: Can be used anywhere in the application
- ✅ **No Business Logic**: Only handle presentation and user interaction
- ✅ **Strongly Typed Props**: Full TypeScript support with JSDoc
- ✅ **Generic**: Not tied to any specific feature or domain
- ✅ **Composable**: Can be combined to build more complex components

**Examples**:
- `Button.tsx` - Generic button with variants
- `Input.tsx` - Form input with label and error
- `Card.tsx` - Container component
- `Spinner.tsx` - Loading indicator

**Structure**:
```typescript
import React from 'react';

/**
 * Component description
 * 
 * @example
 * ```tsx
 * <Component prop="value" />
 * ```
 */
export interface ComponentProps {
  /**
   * Prop description
   */
  prop: string;
}

export const Component: React.FC<ComponentProps> = ({ prop }) => {
  // Only presentation logic
  return <div>{prop}</div>;
};
```

**Rules**:
- ❌ No API calls
- ❌ No feature-specific logic
- ❌ No hooks from features
- ❌ No business rules
- ✅ Only presentation and basic interaction
- ✅ Can use global hooks (e.g., `useWindowSize`)

---

### Feature Components (`src/features/[feature]/components/`)

**Purpose**: Components that contain business logic related to a specific feature.

**Characteristics**:
- ✅ **Business Logic**: Contains feature-specific logic
- ✅ **Feature-Specific**: Tied to a particular feature/domain
- ✅ **Uses UI Components**: Composes UI components for presentation
- ✅ **Uses Feature Hooks**: Can use hooks from the same feature
- ✅ **Uses Feature Services**: Can call feature services

**Examples**:
- `CourseCard.tsx` - Displays course with enrollment logic
- `LoginForm.tsx` - Authentication form with validation
- `LessonList.tsx` - Lists lessons with filtering logic

**Structure**:
```typescript
import React from 'react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

import { useFeatureHook } from '../hooks/useFeatureHook';
import type { FeatureType } from '../types';

/**
 * FeatureComponent description
 * 
 * Contains business logic related to [feature].
 * Uses global UI components for presentation.
 */
export interface FeatureComponentProps {
  data: FeatureType;
  onAction?: (id: string) => void;
}

export const FeatureComponent: React.FC<FeatureComponentProps> = ({
  data,
  onAction,
}) => {
  // Business logic
  const { processData } = useFeatureHook();
  
  const handleClick = () => {
    // Feature-specific logic
    if (onAction) {
      onAction(data.id);
    }
  };

  // Uses UI components
  return (
    <Card>
      <h3>{data.title}</h3>
      <Button onClick={handleClick}>Action</Button>
    </Card>
  );
};
```

**Rules**:
- ✅ Can use UI components from `@/components/ui/`
- ✅ Can use feature hooks from `../hooks/`
- ✅ Can use feature services
- ✅ Can contain business logic
- ✅ Can make API calls (through services)
- ❌ Should not duplicate UI component functionality

---

## Decision Tree

When creating a new component, ask:

1. **Is it reusable across multiple features?**
   - ✅ Yes → UI Component (`src/components/ui/`)
   - ❌ No → Feature Component (`src/features/[feature]/components/`)

2. **Does it contain business logic?**
   - ✅ Yes → Feature Component
   - ❌ No → UI Component

3. **Is it tied to a specific feature/domain?**
   - ✅ Yes → Feature Component
   - ❌ No → UI Component

4. **Does it use feature-specific hooks or services?**
   - ✅ Yes → Feature Component
   - ❌ No → UI Component

## Examples

### ✅ Good: UI Component

```typescript
// src/components/ui/Button.tsx
import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ variant, onClick }) => {
  // Pure presentation, no business logic
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

### ✅ Good: Feature Component

```typescript
// src/features/courses/components/CourseCard.tsx
import React from 'react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

import { useCourses } from '../hooks/useCourses';
import type { Course } from '../types';

export interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
}) => {
  // Business logic: enrollment handling
  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(course.id);
    }
  };

  // Uses UI components
  return (
    <Card>
      <h3>{course.title}</h3>
      <Button onClick={handleEnroll}>Enroll</Button>
    </Card>
  );
};
```

### ❌ Bad: Mixing Concerns

```typescript
// ❌ DON'T: UI Component with business logic
export const Button: React.FC<ButtonProps> = ({ courseId }) => {
  const { enroll } = useCourses(); // ❌ Feature hook in UI component
  
  return <button onClick={() => enroll(courseId)}>Enroll</button>;
};

// ❌ DON'T: Feature Component duplicating UI functionality
export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // ❌ Recreating button functionality instead of using UI component
  return (
    <div>
      <button className="px-4 py-2 bg-blue-600...">Enroll</button>
    </div>
  );
};
```

## File Naming

- **UI Components**: PascalCase matching component name
  - `Button.tsx` → exports `Button`
  - `Input.tsx` → exports `Input`

- **Feature Components**: PascalCase matching component name
  - `CourseCard.tsx` → exports `CourseCard`
  - `LoginForm.tsx` → exports `LoginForm`

## Import Order in Feature Components

```typescript
// 1. External libraries
import React from 'react';

// 2. Absolute imports (UI components)
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// 3. Feature imports (hooks, types, services)
import { useFeatureHook } from '../hooks/useFeatureHook';
import type { FeatureType } from '../types';
```

## Testing

- **UI Components**: Test presentation and interaction only
- **Feature Components**: Test business logic and integration with UI components

## Summary

| Aspect | UI Components | Feature Components |
|--------|---------------|---------------------|
| **Location** | `src/components/ui/` | `src/features/[feature]/components/` |
| **Business Logic** | ❌ None | ✅ Yes |
| **Reusability** | ✅ High | ❌ Feature-specific |
| **Uses UI Components** | ❌ No | ✅ Yes |
| **Uses Feature Hooks** | ❌ No | ✅ Yes |
| **Props Typing** | ✅ Strongly typed | ✅ Strongly typed |
| **Documentation** | ✅ JSDoc required | ✅ JSDoc required |

