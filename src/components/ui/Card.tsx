import React from 'react';

/**
 * Card Component
 *
 * A pure, reusable card container component.
 * No business logic, only layout and styling.
 *
 * @example
 * ```tsx
 * <Card title="Card Title" footer={<Button>Action</Button>}>
 *   Card content here
 * </Card>
 * ```
 */
export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Optional title displayed in header section
   */
  title?: string;
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  footer,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200">{footer}</div>
      )}
    </div>
  );
};

