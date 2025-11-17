import type { NextApiRequest, NextApiResponse } from 'next';

import { createApiHandler, logRequest, requireAuth, requireBody } from '@/lib/api/middleware';
import {
  createSuccessResponse,
  type ApiResponse,
  type PaginatedResponse,
} from '@/lib/api/types';
import { validateCreateCourseRequest } from '@/lib/api/validation';

import type { Course } from '@/features/courses/types';

/**
 * Courses API Route
 *
 * GET /api/courses - Get all courses
 * POST /api/courses - Create a new course
 */
const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Course[] | PaginatedResponse<Course>>>
): Promise<void> => {
  logRequest(req);

  // TODO: Implement actual database query
  // In production: fetch courses from database with pagination

  const courses: Course[] = [];

  // Check if pagination is requested
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  if (req.query.paginated === 'true') {
    const response: PaginatedResponse<Course> = {
      data: courses,
      pagination: {
        page,
        pageSize,
        total: courses.length,
        totalPages: Math.ceil(courses.length / pageSize),
      },
    };
    res.status(200).json(createSuccessResponse(response));
  } else {
    res.status(200).json(createSuccessResponse(courses));
  }
};

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Course>>
): Promise<void> => {
  logRequest(req);

  // Require authentication
  requireAuth(req);

  requireBody(req);

  // Validate input
  const courseData = validateCreateCourseRequest(req.body);

  // TODO: Implement actual database insert
  // In production: create course in database

  const course: Course = {
    id: Date.now().toString(),
    ...courseData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  res.status(201).json(createSuccessResponse(course));
};

export default createApiHandler({
  GET: getHandler,
  POST: postHandler,
});

