/**
 * Store Exports
 *
 * Central export point for all global stores.
 * Import stores from here for consistency.
 *
 * @example
 * ```tsx
 * import { useUserStore, useThemeStore } from '@/store';
 * ```
 */

export { useUserStore } from './userStore';
export type { User } from '@/features/auth/types';

export { useThemeStore } from './themeStore';
export type { ThemeMode } from './themeStore';

