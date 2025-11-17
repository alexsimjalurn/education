import { ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { apiClient } from '@/services/apiClient';

import type {
  Course,
  CreateCourseData,
  UpdateCourseData,
} from './types';

/**
 * Course Service
 *
 * Service layer for course-related API calls.
 * All API calls go through this service - no direct API calls in components.
 * Strict typing for requests and responses.
 * Error handling is done in apiClient interceptors.
 *
 * @example
 * ```tsx
 * const courses = await courseService.getAll();
 * const course = await courseService.getById('123');
 * const newCourse = await courseService.create({ title: 'New Course', ... });
 * ```
 */
export const courseService = {
  /**
   * Get all courses
   * @returns Array of courses
   * @throws {ApiError} If request fails
   */
  async getAll(): Promise<Course[]> {
    try {
      const response = await apiClient.get<Course[]>('/api/courses');
      logger.debug('Course service: Fetched courses', { count: response.data.length });
      return response.data;
    } catch (error) {
      logger.error('Course service: Failed to fetch courses', { error });
      throw error;
    }
  },

  /**
   * Get course by ID
   * @param id - Course ID
   * @returns Course data
   * @throws {ValidationError} If ID is invalid
   * @throws {ApiError} If request fails or course not found
   */
  async getById(id: string): Promise<Course> {
    if (!id) {
      const error = new ValidationError('Course ID is required');
      logger.error('Course service: Invalid ID', { id });
      throw error;
    }
    try {
      const response = await apiClient.get<Course>(`/api/courses/${id}`);
      return response.data;
    } catch (error) {
      logger.error('Course service: Failed to get course by ID', { id, error });
      throw error;
    }
  },

  /**
   * Create a new course
   * @param data - Course creation data
   * @returns Created course
   * @throws {ValidationError} If validation fails
   * @throws {ApiError} If request fails
   */
  async create(data: CreateCourseData): Promise<Course> {
    if (!data.title || !data.description) {
      const error = new ValidationError('Title and description are required');
      logger.error('Course service: Validation failed', { data });
      throw error;
    }
    try {
      const response = await apiClient.post<Course, CreateCourseData>(
        '/api/courses',
        data
      );
      logger.info('Course service: Course created', { courseId: response.data.id });
      return response.data;
    } catch (error) {
      logger.error('Course service: Failed to create course', { data, error });
      throw error;
    }
  },

  /**
   * Update an existing course
   * @param id - Course ID
   * @param data - Course update data
   * @returns Updated course
   * @throws {ValidationError} If ID is invalid
   * @throws {ApiError} If request fails or course not found
   */
  async update(id: string, data: UpdateCourseData): Promise<Course> {
    if (!id) {
      const error = new ValidationError('Course ID is required');
      logger.error('Course service: Invalid ID', { id });
      throw error;
    }
    try {
      const response = await apiClient.put<Course, UpdateCourseData>(
        `/api/courses/${id}`,
        data
      );
      logger.info('Course service: Course updated', { courseId: id });
      return response.data;
    } catch (error) {
      logger.error('Course service: Failed to update course', { id, data, error });
      throw error;
    }
  },

  /**
   * Delete a course
   * @param id - Course ID to delete
   * @throws {ValidationError} If ID is invalid
   * @throws {ApiError} If request fails or course not found
   */
  async delete(id: string): Promise<void> {
    if (!id) {
      const error = new ValidationError('Course ID is required');
      logger.error('Course service: Invalid ID', { id });
      throw error;
    }
    try {
      await apiClient.delete(`/api/courses/${id}`);
      logger.info('Course service: Course deleted', { courseId: id });
    } catch (error) {
      logger.error('Course service: Failed to delete course', { id, error });
      throw error;
    }
  },
};

