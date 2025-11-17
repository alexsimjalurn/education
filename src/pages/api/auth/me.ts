import type { NextApiRequest, NextApiResponse } from 'next';

import type { User } from '@/features/auth/types';
import { createApiHandler, logRequest, requireAuth } from '@/lib/api/middleware';
import { createSuccessResponse, type ApiResponse } from '@/lib/api/types';


/**
 * Get Current User API Route
 *
 * GET /api/auth/me
 * Returns current authenticated user.
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<User>>
): Promise<void> => {
  logRequest(req);

  // Require authentication
  const userId = requireAuth(req);

  // TODO: Implement actual user lookup from database
  // This is a placeholder
  // In production: fetch user from database using userId from JWT

  const user: User = {
    id: userId,
    email: 'test@example.com',
    name: 'Test User',
    role: 'student',
    createdAt: new Date().toISOString(),
  };

  res.status(200).json(createSuccessResponse(user));
};

export default createApiHandler({
  GET: handler,
});

