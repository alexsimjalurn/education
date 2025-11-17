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
import { validateCreateCourseRequest } from '@/lib/api/validation';

import type { Course, UpdateCourseData } from '@/features/courses/types';

/**
 * Course by ID API Route
 *
 * GET /api/courses/[id] - Get course by ID
 * PUT /api/courses/[id] - Update course
 * DELETE /api/courses/[id] - Delete course
 */
const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Course>>
): Promise<void> => {
  logRequest(req, { courseId: req.query.id });

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    res.status(400).json(
      createErrorResponse('Course ID is required', 'INVALID_ID')
    );
    return;
  }

  // TODO: Implement actual database query
  // In production: fetch course from database

  res.status(404).json(
    createErrorResponse('Course not found', 'NOT_FOUND', { id })
  );
};

const putHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Course>>
): Promise<void> => {
  logRequest(req, { courseId: req.query.id });

  // Require authentication
  requireAuth(req);

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    res.status(400).json(
      createErrorResponse('Course ID is required', 'INVALID_ID')
    );
    return;
  }

  requireBody(req);

  // Validate input (partial validation for update)
  const updateData = validateCreateCourseRequest(req.body) as UpdateCourseData;

  // TODO: Implement actual database update
  // In production: update course in database

  const course: Course = {
    id,
    ...updateData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Course;

  res.status(200).json(createSuccessResponse(course));
};

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ message: string }>>
): Promise<void> => {
  logRequest(req, { courseId: req.query.id });

  // Require authentication
  requireAuth(req);

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    res.status(400).json(
      createErrorResponse('Course ID is required', 'INVALID_ID')
    );
    return;
  }

  // TODO: Implement actual database delete
  // In production: delete course from database

  res.status(200).json(
    createSuccessResponse({ message: 'Course deleted successfully' })
  );
};

export default createApiHandler({
  GET: getHandler,
  PUT: putHandler,
  DELETE: deleteHandler,
});

