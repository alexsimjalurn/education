'use client';

import { useEffect, useState } from 'react';

/**
 * Window Size Interface
 */
export interface WindowSize {
  /**
   * Window width in pixels
   */
  width: number;
  /**
   * Window height in pixels
   */
  height: number;
}

/**
 * useWindowSize Hook
 *
 * Global reusable hook that tracks window dimensions.
 * Pure logic, no UI - returns window size and updates on resize.
 *
 * @returns Current window size (width and height)
 *
 * @example
 * ```tsx
 * const { width, height } = useWindowSize();
 * const isMobile = width < 768;
 * ```
 */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

