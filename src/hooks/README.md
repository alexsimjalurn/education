# Global Hooks

This directory contains **global reusable hooks** that can be used across multiple features.

## Principles

- ✅ **Pure Logic**: No UI, only business logic
- ✅ **Reusable**: Can be used in any feature
- ✅ **Prefix `use`**: All hooks start with `use`
- ✅ **Generic**: Not tied to any specific feature
- ✅ **Well Documented**: JSDoc comments with examples

## Available Hooks

### useWindowSize
Tracks window dimensions and updates on resize.

```tsx
const { width, height } = useWindowSize();
const isMobile = width < 768;
```

### useDebounce
Debounces a value, useful for input fields and search queries.

```tsx
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  performSearch(debouncedSearchTerm);
}, [debouncedSearchTerm]);
```

## Adding New Global Hooks

When creating a new global hook:

1. **File naming**: `use[Name].ts` (e.g., `useLocalStorage.ts`)
2. **Export**: Named export with `use` prefix
3. **Documentation**: Add JSDoc with description and examples
4. **Pure logic**: No UI components, only logic
5. **Type safety**: Strongly typed with TypeScript

### Template

```typescript
'use client';

import { useState } from 'react';

/**
 * use[Name] Hook
 *
 * Description of what the hook does.
 * Pure logic, no UI - [what it does].
 *
 * @param param - Parameter description
 * @returns Return value description
 *
 * @example
 * ```tsx
 * const value = use[Name](param);
 * ```
 */
export const use[Name] = (param: ParamType): ReturnType => {
  // Implementation
  return value;
};
```

## Rules

- ❌ **No UI components**
- ❌ **No feature-specific logic**
- ❌ **No direct API calls** (use services instead)
- ✅ **Only reusable logic**
- ✅ **Can use other global hooks**
- ✅ **Can use global utilities**

## When to Create a Global Hook

Create a global hook when:
- The logic is reusable across multiple features
- It's a generic utility (e.g., debounce, window size, localStorage)
- It's not tied to a specific domain/feature

If the hook is specific to a feature, put it in `src/features/[feature]/hooks/`.

