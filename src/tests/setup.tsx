/**
 * Test setup utilities and helpers
 */

import { render } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'

import { ErrorBoundary } from '@/components/errors/ErrorBoundary'

const TestWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary>{children}</ErrorBoundary>
)

/**
 * Custom render function with providers
 */
export const renderWithProviders = (ui: ReactElement) => {
  return render(ui, { wrapper: TestWrapper })
}

/**
 * Test utilities
 */
export const testUtils = {
  /**
   * Wait for async operations
   */
  waitFor: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Mock API response
   */
  mockApiResponse: <T,>(data: T, delay = 0) => {
    return new Promise<T>((resolve) => {
      setTimeout(() => resolve(data), delay)
    })
  },
}

