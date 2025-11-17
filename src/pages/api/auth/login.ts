import type { NextApiRequest, NextApiResponse } from 'next';

import { createApiHandler, logRequest, requireBody } from '@/lib/api/middleware';
import {
  createErrorResponse,
  createSuccessResponse,
  type ApiResponse,
} from '@/lib/api/types';
import { validateLoginRequest } from '@/lib/api/validation';

import type { AuthResponse } from '@/features/auth/types';

/**
 * Login API Route
 *
 * POST /api/auth/login
 * Validates input and authenticates user.
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<AuthResponse>>
): Promise<void> => {
  logRequest(req);

  requireBody(req);

  // Validate input
  const { email, password } = validateLoginRequest(req.body);

  // TODO: Implement actual authentication logic
  // This is a placeholder
  // In production: verify password, check user in database, generate JWT

  // Mock authentication
  if (email && password) {
    const response: AuthResponse = {
      user: {
        id: '1',
        email,
        name: 'Test User',
        role: 'student',
        createdAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token',
    };

    res.status(200).json(createSuccessResponse(response));
    return;
  }

  res.status(401).json(
    createErrorResponse('Invalid credentials', 'INVALID_CREDENTIALS')
  );
};

export default createApiHandler({
  POST: handler,
});

