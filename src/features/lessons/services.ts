import { ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { apiClient } from '@/services/apiClient';

import type {
  Lesson,
  CreateLessonData,
  UpdateLessonData,
} from './types';

/**
 * Lesson Service
 *
 * Service layer for lesson-related API calls.
 * All API calls go through this service - no direct API calls in components.
 * Strict typing for requests and responses.
 * Error handling is done in apiClient interceptors.
 *
 * @example
 * ```tsx
 * const lessons = await lessonService.getAll(courseId);
 * const lesson = await lessonService.getById('123');
 * const newLesson = await lessonService.create({ courseId, title: '...', ... });
 * ```
 */
export const lessonService = {
  /**
   * Get all lessons (optionally filtered by courseId)
   * @param courseId - Optional course ID to filter lessons
   * @returns Array of lessons
   * @throws {ApiError} If request fails
   */
  async getAll(courseId?: string): Promise<Lesson[]> {
    try {
      const url = courseId
        ? `/api/lessons?courseId=${courseId}`
        : '/api/lessons';
      const response = await apiClient.get<Lesson[]>(url);
      logger.debug('Lesson service: Fetched lessons', {
        count: response.data.length,
        courseId,
      });
      return response.data;
    } catch (error) {
      logger.error('Lesson service: Failed to fetch lessons', { courseId, error });
      throw error;
    }
  },

  /**
   * Get lesson by ID
   * @param id - Lesson ID
   * @returns Lesson data
   * @throws {ValidationError} If ID is invalid
   * @throws {ApiError} If request fails or lesson not found
   */
  async getById(id: string): Promise<Lesson> {
    if (!id) {
      const error = new ValidationError('Lesson ID is required');
      logger.error('Lesson service: Invalid ID', { id });
      throw error;
    }
    try {
      const response = await apiClient.get<Lesson>(`/api/lessons/${id}`);
      return response.data;
    } catch (error) {
      logger.error('Lesson service: Failed to get lesson by ID', { id, error });
      throw error;
    }
  },

  /**
   * Create a new lesson
   * @param data - Lesson creation data
   * @returns Created lesson
   * @throws {ValidationError} If validation fails
   * @throws {ApiError} If request fails
   */
  async create(data: CreateLessonData): Promise<Lesson> {
    if (!data.courseId || !data.title || !data.description) {
      const error = new ValidationError(
        'Course ID, title, and description are required'
      );
      logger.error('Lesson service: Validation failed', { data });
      throw error;
    }
    try {
      const response = await apiClient.post<Lesson, CreateLessonData>(
        '/api/lessons',
        data
      );
      logger.info('Lesson service: Lesson created', { lessonId: response.data.id });
      return response.data;
    } catch (error) {
      logger.error('Lesson service: Failed to create lesson', { data, error });
      throw error;
    }
  },

  /**
   * Update an existing lesson
   * @param id - Lesson ID
   * @param data - Lesson update data
   * @returns Updated lesson
   * @throws {ValidationError} If ID is invalid
   * @throws {ApiError} If request fails or lesson not found
   */
  async update(id: string, data: UpdateLessonData): Promise<Lesson> {
    if (!id) {
      const error = new ValidationError('Lesson ID is required');
      logger.error('Lesson service: Invalid ID', { id });
      throw error;
    }
    try {
      const response = await apiClient.put<Lesson, UpdateLessonData>(
        `/api/lessons/${id}`,
        data
      );
      logger.info('Lesson service: Lesson updated', { lessonId: id });
      return response.data;
    } catch (error) {
      logger.error('Lesson service: Failed to update lesson', { id, data, error });
      throw error;
    }
  },

  /**
   * Delete a lesson
   * @param id - Lesson ID to delete
   * @throws {ValidationError} If ID is invalid
   * @throws {ApiError} If request fails or lesson not found
   */
  async delete(id: string): Promise<void> {
    if (!id) {
      const error = new ValidationError('Lesson ID is required');
      logger.error('Lesson service: Invalid ID', { id });
      throw error;
    }
    try {
      await apiClient.delete(`/api/lessons/${id}`);
      logger.info('Lesson service: Lesson deleted', { lessonId: id });
    } catch (error) {
      logger.error('Lesson service: Failed to delete lesson', { id, error });
      throw error;
    }
  },
};

