import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/features/auth/types';

/**
 * User State Interface
 */
interface UserState {
  /**
   * Current authenticated user
   */
  user: User | null;
  /**
   * Set the current user
   * @param user - User object or null
   */
  setUser: (user: User | null) => void;
  /**
   * Clear the current user (logout)
   */
  clearUser: () => void;
}

/**
 * User Store
 *
 * Global store for user session and authentication state.
 * Persisted to localStorage for session persistence.
 *
 * @example
 * ```tsx
 * const { user, setUser, clearUser } = useUserStore();
 *
 * // Set user after login
 * setUser(userData);
 *
 * // Clear user on logout
 * clearUser();
 * ```
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // localStorage key
    }
  )
);

