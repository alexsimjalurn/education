import type { NextApiRequest, NextApiResponse } from 'next';

import { createApiHandler, logRequest, requireAuth } from '@/lib/api/middleware';
import {
  createSuccessResponse,
  type ApiResponse,
} from '@/lib/api/types';

/**
 * Logout API Route
 *
 * POST /api/auth/logout
 * Logs out the current user.
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ message: string }>>
): Promise<void> => {
  logRequest(req);

  // Require authentication
  requireAuth(req);

  // TODO: Implement actual logout logic
  // In production: invalidate token, clear session, etc.

  res.status(200).json(
    createSuccessResponse({ message: 'Logged out successfully' })
  );
};

export default createApiHandler({
  POST: handler,
});

