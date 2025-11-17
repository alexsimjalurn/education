# State Management Architecture

This document explains the state management strategy and when to use global stores vs local state.

## Principles

### ✅ Global Store (`store/`) for Shared State

Use global stores for state that needs to be shared across multiple features or components.

**Examples:**
- User session and authentication state
- Theme preferences
- Application settings
- Shopping cart (if e-commerce)
- Global notifications

### ✅ Local State for Feature-Specific State

Use local state (React hooks) for state that is specific to a feature or component.

**Examples:**
- Form inputs
- Component-specific UI state
- Feature-specific temporary state
- Loading states (unless shared)
- Error states (unless shared)

### ✅ Consistent Naming

All global stores follow the naming convention: `[name]Store`

- ✅ `userStore` - User session state
- ✅ `themeStore` - Theme management
- ✅ `cartStore` - Shopping cart
- ❌ `user` - Missing "Store" suffix
- ❌ `UserStore` - Should be camelCase

## Architecture

### Global Stores (`src/store/`)

```
src/store/
├── userStore.ts      # User session and auth state
├── themeStore.ts     # Theme management
├── index.ts          # Central exports
└── README.md         # Store documentation
```

### Local State

- **Component State**: `useState` in components
- **Hook State**: `useState` in custom hooks
- **Feature State**: State in feature hooks (e.g., `useCourses`)

## Examples

### Global Store: userStore

```typescript
// src/store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
```

**Usage:**
```tsx
// In any component or hook
import { useUserStore } from '@/store';

const { user, setUser, clearUser } = useUserStore();
```

### Global Store: themeStore

```typescript
// src/store/themeStore.ts
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
      toggle: () => {
        const current = get().mode;
        set({ mode: current === 'light' ? 'dark' : 'light' });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
```

**Usage:**
```tsx
import { useThemeStore } from '@/store';

const { mode, setMode, toggle } = useThemeStore();
```

### Local State: Feature Hook

```typescript
// src/features/courses/hooks/useCourses.ts
export const useCourses = () => {
  // Local state - only used in this hook
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // This state is feature-specific, not shared globally
  // So it stays in the hook, not in a global store
};
```

### Local State: Component

```typescript
// src/features/auth/components/LoginForm.tsx
export const LoginForm = () => {
  // Local state - only used in this component
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // Form state is component-specific, not shared
  // So it stays in the component
};
```

## Decision Tree

When deciding between global store and local state:

1. **Is the state shared across multiple features?**
   - ✅ Yes → Global Store
   - ❌ No → Local State

2. **Does the state need to persist across page reloads?**
   - ✅ Yes → Global Store (with persist)
   - ❌ No → Consider local state first

3. **Is the state application-wide (user, theme, settings)?**
   - ✅ Yes → Global Store
   - ❌ No → Local State

4. **Is the state only used in one feature/component?**
   - ✅ Yes → Local State
   - ❌ No → Global Store

## Naming Convention

### Global Stores

- **File**: `[name]Store.ts` (e.g., `userStore.ts`)
- **Hook**: `use[Name]Store` (e.g., `useUserStore`)
- **Interface**: `[Name]State` (e.g., `UserState`)

```typescript
// ✅ Good
export const useUserStore = create<UserState>(...);
export const useThemeStore = create<ThemeState>(...);
export const useCartStore = create<CartState>(...);

// ❌ Bad
export const useUser = create<UserState>(...); // Missing "Store"
export const useTheme = create<ThemeState>(...); // Missing "Store"
```

### Local State

- Use descriptive names
- Follow React conventions

```typescript
// ✅ Good
const [courses, setCourses] = useState<Course[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState({ email: '', password: '' });

// ❌ Bad
const [data, setData] = useState([]); // Too generic
const [loading, setLoading] = useState(false); // Missing "is" prefix
```

## Persistence

Global stores can be persisted to localStorage:

```typescript
export const useStore = create<State>()(
  persist(
    (set) => ({
      // State and actions
    }),
    {
      name: 'store-storage', // localStorage key
      partialize: (state) => ({ 
        // Only persist specific fields
        user: state.user 
      }),
    }
  )
);
```

**When to persist:**
- ✅ User session
- ✅ Theme preferences
- ✅ Application settings
- ❌ Temporary UI state
- ❌ Loading states
- ❌ Error states

## Best Practices

### ✅ DO

- Use global stores for shared state
- Use local state for component/feature-specific state
- Follow naming convention: `[name]Store`
- Persist only necessary data
- Keep stores focused (one store per domain)
- Document stores with JSDoc

### ❌ DON'T

- Create global stores for temporary state
- Create global stores for component-specific state
- Mix concerns in one store
- Persist sensitive data without encryption
- Use global stores when local state is sufficient

## File Structure

```
src/
├── store/                    # Global stores
│   ├── userStore.ts         # User session
│   ├── themeStore.ts        # Theme management
│   ├── index.ts             # Central exports
│   └── README.md            # Store documentation
├── features/
│   ├── courses/
│   │   └── hooks/
│   │       └── useCourses.ts # Local state (courses, loading, error)
│   └── auth/
│       ├── hooks/
│       │   └── useAuth.ts   # Uses userStore + local state
│       └── components/
│           └── LoginForm.tsx # Local state (form data)
```

## Summary

| State Type | Location | When to Use | Example |
|------------|----------|-------------|---------|
| **Global Store** | `src/store/` | Shared across features | `userStore`, `themeStore` |
| **Feature State** | `src/features/[feature]/hooks/` | Feature-specific | `useCourses` hook state |
| **Component State** | Component | Component-specific | Form inputs, UI state |

**Flow:**
- Global state → `src/store/[name]Store.ts`
- Feature state → `src/features/[feature]/hooks/use[Feature].ts`
- Component state → `useState` in component

