import type { NextApiRequest, NextApiResponse } from 'next';

import {
  createApiHandler,
  logRequest,
  requireAuth,
  requireBody,
} from '@/lib/api/middleware';
import {
  createSuccessResponse,
  type ApiResponse,
} from '@/lib/api/types';
import { validateCreateLessonRequest } from '@/lib/api/validation';

import type { Lesson } from '@/features/lessons/types';

/**
 * Lessons API Route
 *
 * GET /api/lessons - Get all lessons (optionally filtered by courseId)
 * POST /api/lessons - Create a new lesson
 */
const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Lesson[]>>
): Promise<void> => {
  logRequest(req, { courseId: req.query.courseId });

  const { courseId } = req.query;

  // TODO: Implement actual database query
  // In production: fetch lessons from database, filter by courseId if provided

  const lessons: Lesson[] = [];

  res.status(200).json(createSuccessResponse(lessons));
};

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Lesson>>
): Promise<void> => {
  logRequest(req);

  // Require authentication
  requireAuth(req);

  requireBody(req);

  // Validate input
  const lessonData = validateCreateLessonRequest(req.body);

  // TODO: Implement actual database insert
  // In production: create lesson in database

  const lesson: Lesson = {
    id: Date.now().toString(),
    ...lessonData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  res.status(201).json(createSuccessResponse(lesson));
};

export default createApiHandler({
  GET: getHandler,
  POST: postHandler,
});

