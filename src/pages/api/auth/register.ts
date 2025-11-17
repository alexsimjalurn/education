import type { NextApiRequest, NextApiResponse } from 'next';

import type { AuthResponse } from '@/features/auth/types';
import { createApiHandler, logRequest, requireBody } from '@/lib/api/middleware';
import { createSuccessResponse, type ApiResponse } from '@/lib/api/types';
import { validateRegisterRequest } from '@/lib/api/validation';


/**
 * Register API Route
 *
 * POST /api/auth/register
 * Validates input and creates new user.
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<AuthResponse>>
): Promise<void> => {
  logRequest(req);

  requireBody(req);

  // Validate input
  const { email, name, role } = validateRegisterRequest(req.body);

  // TODO: Implement actual registration logic
  // This is a placeholder
  // In production: check if user exists, hash password, create user in database, generate JWT

  // Mock registration
  const response: AuthResponse = {
    user: {
      id: Date.now().toString(),
      email,
      name,
      role: (role ?? 'student') as 'student' | 'teacher' | 'admin',
      createdAt: new Date().toISOString(),
    },
    token: 'mock-jwt-token',
  };

  res.status(201).json(createSuccessResponse(response));
};

export default createApiHandler({
  POST: handler,
});

