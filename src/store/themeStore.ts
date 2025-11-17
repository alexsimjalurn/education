import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Theme Mode
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Theme State Interface
 */
interface ThemeState {
  /**
   * Current theme mode
   */
  mode: ThemeMode;
  /**
   * Set theme mode
   * @param mode - Theme mode (light, dark, or system)
   */
  setMode: (mode: ThemeMode) => void;
  /**
   * Toggle between light and dark mode
   */
  toggle: () => void;
  /**
   * Get effective theme (resolves 'system' to actual theme)
   */
  getEffectiveTheme: () => 'light' | 'dark';
}

/**
 * Theme Store
 *
 * Global store for theme management.
 * Persisted to localStorage for theme persistence.
 *
 * @example
 * ```tsx
 * const { mode, setMode, toggle, getEffectiveTheme } = useThemeStore();
 *
 * // Set theme
 * setMode('dark');
 *
 * // Toggle theme
 * toggle();
 *
 * // Get effective theme
 * const theme = getEffectiveTheme();
 * ```
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
      toggle: () => {
        const current = get().mode;
        const newMode: ThemeMode =
          current === 'light' ? 'dark' : current === 'dark' ? 'light' : 'dark';
        set({ mode: newMode });
      },
      getEffectiveTheme: () => {
        const { mode } = get();
        if (mode === 'system') {
          if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light';
          }
          return 'light';
        }
        return mode;
      },
    }),
    {
      name: 'theme-storage', // localStorage key
    }
  )
);

