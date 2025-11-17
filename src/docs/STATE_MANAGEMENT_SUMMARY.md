# State Management Summary

Quick reference for state management decisions.

## Global Stores (`src/store/`)

Use for state shared across multiple features/components.

### Available Stores

- **`userStore`** - User session and authentication state
- **`themeStore`** - Theme management (light/dark/system)

### Naming Convention

- File: `[name]Store.ts` (e.g., `userStore.ts`)
- Hook: `use[Name]Store` (e.g., `useUserStore`)
- Interface: `[Name]State` (e.g., `UserState`)

### Usage

```tsx
import { useUserStore, useThemeStore } from '@/store';

// User store
const { user, setUser, clearUser } = useUserStore();

// Theme store
const { mode, setMode, toggle } = useThemeStore();
```

## Local State

Use for feature/component-specific state.

### Feature Hooks

```tsx
// src/features/courses/hooks/useCourses.ts
export const useCourses = () => {
  // Local state - only used in this hook
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
};
```

### Components

```tsx
// Component-specific state
const [formData, setFormData] = useState({
  email: '',
  password: '',
});
```

## Decision Guide

| State Type | Location | Example |
|------------|----------|---------|
| User session | Global Store | `userStore` |
| Theme | Global Store | `themeStore` |
| Feature data | Feature Hook | `useCourses` hook |
| Form inputs | Component | `useState` in component |
| UI state | Component | `useState` in component |

## Rules

✅ **DO:**
- Use global stores for shared state
- Use local state for component/feature-specific state
- Follow naming: `[name]Store`
- Import from `@/store` (central export)

❌ **DON'T:**
- Create global stores for temporary state
- Create global stores for component-specific state
- Import stores directly (use `@/store`)

