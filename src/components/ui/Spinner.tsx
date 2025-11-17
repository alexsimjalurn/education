import React from 'react';

/**
 * Spinner Component
 *
 * A pure, reusable loading spinner component.
 * No business logic, only visual presentation.
 *
 * @example
 * ```tsx
 * <Spinner size="md" />
 * ```
 */
export interface SpinnerProps {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`${sizeStyles[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin ${className}`}
    />
  );
};

