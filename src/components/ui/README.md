# UI Components

This directory contains **pure, reusable UI components** with no business logic.

## Principles

- ✅ **Pure & Reusable**: Can be used anywhere in the application
- ✅ **No Business Logic**: Only presentation and basic interaction
- ✅ **Strongly Typed Props**: Full TypeScript support with JSDoc
- ✅ **Generic**: Not tied to any specific feature
- ✅ **Composable**: Can be combined to build complex components
- ✅ **Accessible**: Follow WCAG guidelines

## Component Structure

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

## Rules

- ❌ **No API calls**
- ❌ **No feature-specific logic**
- ❌ **No hooks from features**
- ❌ **No business rules**
- ✅ **Only presentation and basic interaction**
- ✅ **Can use global hooks** (e.g., `useWindowSize`)

## Available Components

### Button
A versatile button component with variants and sizes.

```typescript
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

### Input
Form input with label and error display.

```typescript
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

### Card
Container component for content sections.

```typescript
<Card title="Course Title" footer={<Button>Action</Button>}>
  Content here
</Card>
```

### Spinner
Loading indicator component.

```typescript
<Spinner size="md" />
```

## Adding New Components

1. Create component file in this directory
2. Follow the component structure above
3. Add TypeScript types
4. Write tests
5. Update this README
6. Add to Storybook (if applicable)

