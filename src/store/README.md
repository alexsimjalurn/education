# Global Stores

This directory contains global Zustand stores for shared application state.

## Principles

- ✅ **Global State**: Shared across multiple features/components
- ✅ **Persistent**: Can be persisted to localStorage
- ✅ **Naming Convention**: `[name]Store` (e.g., `userStore`, `themeStore`)
- ✅ **Type Safe**: Full TypeScript support
- ✅ **Well Documented**: JSDoc comments with examples

## Available Stores

### userStore

Global store for user session and authentication state.

```tsx
import { useUserStore } from '@/store';

const { user, setUser, clearUser } = useUserStore();
```

**Features:**
- Persisted to localStorage
- User session management
- Authentication state

### themeStore

Global store for theme management.

```tsx
import { useThemeStore } from '@/store';

const { mode, setMode, toggle, getEffectiveTheme } = useThemeStore();
```

**Features:**
- Persisted to localStorage
- Light/Dark/System theme modes
- Theme toggle functionality

## Naming Convention

All stores follow the naming pattern: `[name]Store`

- ✅ `userStore` - User session state
- ✅ `themeStore` - Theme management
- ✅ `cartStore` - Shopping cart (if needed)
- ✅ `notificationStore` - Notifications (if needed)

## When to Create a Global Store

Create a global store when:
- State needs to be shared across multiple features
- State needs to persist across page reloads
- State is application-wide (user, theme, settings)

**Don't create a global store when:**
- State is only used in one feature → Use local state in hooks/components
- State is component-specific → Use `useState` in component
- State is temporary → Use local state

## Adding a New Store

1. Create file: `src/store/[name]Store.ts`
2. Follow naming convention: `use[Name]Store`
3. Use Zustand with persist middleware if needed
4. Add JSDoc documentation
5. Export from `src/store/index.ts`

### Template

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * [Name] State Interface
 */
interface [Name]State {
  // State properties
  value: string;
  // Actions
  setValue: (value: string) => void;
}

/**
 * [Name] Store
 *
 * Description of what this store manages.
 *
 * @example
 * ```tsx
 * const { value, setValue } = use[Name]Store();
 * ```
 */
export const use[Name]Store = create<[Name]State>()(
  persist(
    (set) => ({
      value: '',
      setValue: (value) => set({ value }),
    }),
    {
      name: '[name]-storage',
    }
  )
);
```

## Persistence

Stores can be persisted to localStorage using Zustand's `persist` middleware:

```typescript
export const useStore = create<State>()(
  persist(
    (set) => ({
      // State and actions
    }),
    {
      name: 'store-storage', // localStorage key
      partialize: (state) => ({ /* only persist specific fields */ }),
    }
  )
);
```

## Usage in Components

```tsx
import { useUserStore } from '@/store';

const Component = () => {
  const { user, setUser } = useUserStore();
  
  // Use state
  return <div>Hello, {user?.name}</div>;
};
```

## Usage in Hooks

```tsx
import { useUserStore } from '@/store';

export const useAuth = () => {
  const { user, setUser, clearUser } = useUserStore();
  
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.user);
  };
  
  return { user, login };
};
```

## Best Practices

1. **Keep stores focused**: One store per domain (user, theme, etc.)
2. **Use persist wisely**: Only persist data that should survive page reloads
3. **Type safety**: Always define interfaces for state
4. **Documentation**: Add JSDoc for all stores
5. **Naming**: Follow `[name]Store` convention

## Local State vs Global Store

### Use Global Store For:
- User session
- Theme preferences
- Application settings
- Shopping cart (if e-commerce)
- Notifications (if global)

### Use Local State For:
- Form inputs
- Component-specific UI state
- Feature-specific temporary state
- Loading states (unless shared)
- Error states (unless shared)

