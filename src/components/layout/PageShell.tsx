import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

/**
 * PageShell Props
 */
export interface PageShellProps {
  /**
   * Page content
   */
  children: React.ReactNode;
  /**
   * Show header
   * @default true
   */
  showHeader?: boolean;
  /**
   * Show footer
   * @default true
   */
  showFooter?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * PageShell Component
 *
 * Consistent page layout wrapper with Header and Footer.
 * Ensures layout consistency across all pages.
 *
 * @example
 * ```tsx
 * <PageShell>
 *   <h1>Page Content</h1>
 * </PageShell>
 * ```
 */
export const PageShell: React.FC<PageShellProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  className = '',
}) => {
  return (
    <div className={`page-shell ${className}`}>
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

