/**
 * API Response Types
 *
 * Strictly typed response types for API routes.
 */

/**
 * Standard API Response
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Error Response
 */
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

/**
 * Success Response
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * Helper to create success response
 */
export const createSuccessResponse = <T>(data: T): SuccessResponse<T> => ({
  success: true,
  data,
});

/**
 * Helper to create error response
 */
export const createErrorResponse = (
  message: string,
  code: string,
  details?: unknown
): ErrorResponse => ({
  success: false,
  error: {
    message,
    code,
    details,
  },
});

