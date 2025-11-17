import type { NextApiRequest, NextApiResponse } from 'next';

import {
  createApiHandler,
  logRequest,
  requireAuth,
  requireBody,
} from '@/lib/api/middleware';
import {
  createErrorResponse,
  createSuccessResponse,
  type ApiResponse,
} from '@/lib/api/types';
import { validateCreateLessonRequest } from '@/lib/api/validation';

import type { Lesson, UpdateLessonData } from '@/features/lessons/types';

/**
 * Lesson by ID API Route
 *
 * GET /api/lessons/[id] - Get lesson by ID
 * PUT /api/lessons/[id] - Update lesson
 * DELETE /api/lessons/[id] - Delete lesson
 */
const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Lesson>>
): Promise<void> => {
  logRequest(req, { lessonId: req.query.id });

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    res.status(400).json(
      createErrorResponse('Lesson ID is required', 'INVALID_ID')
    );
    return;
  }

  // TODO: Implement actual database query
  // In production: fetch lesson from database

  res.status(404).json(
    createErrorResponse('Lesson not found', 'NOT_FOUND', { id })
  );
};

const putHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Lesson>>
): Promise<void> => {
  logRequest(req, { lessonId: req.query.id });

  // Require authentication
  requireAuth(req);

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    res.status(400).json(
      createErrorResponse('Lesson ID is required', 'INVALID_ID')
    );
    return;
  }

  requireBody(req);

  // Validate input (partial validation for update)
  const updateData = validateCreateLessonRequest(req.body) as UpdateLessonData;

  // TODO: Implement actual database update
  // In production: update lesson in database

  const lesson: Lesson = {
    id,
    ...updateData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Lesson;

  res.status(200).json(createSuccessResponse(lesson));
};

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ message: string }>>
): Promise<void> => {
  logRequest(req, { lessonId: req.query.id });

  // Require authentication
  requireAuth(req);

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    res.status(400).json(
      createErrorResponse('Lesson ID is required', 'INVALID_ID')
    );
    return;
  }

  // TODO: Implement actual database delete
  // In production: delete lesson from database

  res.status(200).json(
    createSuccessResponse({ message: 'Lesson deleted successfully' })
  );
};

export default createApiHandler({
  GET: getHandler,
  PUT: putHandler,
  DELETE: deleteHandler,
});

