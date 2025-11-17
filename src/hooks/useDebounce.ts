'use client';

import { useEffect, useState } from 'react';

/**
 * useDebounce Hook
 *
 * Global reusable hook that debounces a value.
 * Pure logic, no UI - delays value updates until specified delay has passed.
 * Useful for debouncing input fields, search queries, etc.
 *
 * @template T - The type of the value to debounce
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value that updates after the delay
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   // This will only run after user stops typing for 500ms
 *   performSearch(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 * ```
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

