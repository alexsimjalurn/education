import type { NextApiRequest, NextApiResponse } from 'next';

import { ApiError, handleError, logError } from '../errors';
import { logger } from '../logger';

import {
  createErrorResponse,
  type ApiResponse,
} from './types';

/**
 * API Middleware Utilities
 *
 * Utilities for handling API requests consistently.
 */

/**
 * HTTP Method type
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * API Handler function type
 */
type ApiHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<T>>
) => Promise<void> | void;

/**
 * Method handler map
 */
interface MethodHandlers {
  GET?: ApiHandler;
  POST?: ApiHandler;
  PUT?: ApiHandler;
  DELETE?: ApiHandler;
  PATCH?: ApiHandler;
}

/**
 * Create API route handler with method validation
 */
export const createApiHandler = (handlers: MethodHandlers) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
  ): Promise<void> => {
    try {
      const method = req.method as HttpMethod;
      const handler = handlers[method];

      if (!handler) {
        res.status(405).json(
          createErrorResponse(
            `Method ${method} not allowed`,
            'METHOD_NOT_ALLOWED'
          )
        );
        return;
      }

      await handler(req, res);
    } catch (error) {
      const appError = handleError(error);
      logError(appError, {
        url: req.url,
        method: req.method,
        context: 'api-handler',
      });

      const status = appError.status || 500;
      res.status(status).json(
        createErrorResponse(
          appError.message,
          appError.code,
          process.env.NODE_ENV === 'development' ? appError.details : undefined
        )
      );
    }
  };
};

/**
 * Validate request body exists
 */
export const requireBody = (req: NextApiRequest): void => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError('Request body is required', 400);
  }
};

/**
 * Get authenticated user ID from request
 * TODO: Implement actual authentication middleware
 */
export const getUserId = (req: NextApiRequest): string | null => {
  // TODO: Extract from JWT token
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  // Placeholder - implement actual JWT verification
  return 'user-id';
};

/**
 * Require authentication
 */
export const requireAuth = (req: NextApiRequest): string => {
  const userId = getUserId(req);
  if (!userId) {
    throw new ApiError('Authentication required', 401);
  }
  return userId;
};

/**
 * Log API request
 */
export const logRequest = (
  req: NextApiRequest,
  context?: Record<string, unknown>
): void => {
  logger.info('API Request', {
    method: req.method,
    url: req.url,
    ...context,
  });
};

