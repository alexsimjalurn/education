'use client';

import { useEffect, useState } from 'react';

import { lessonService } from '../services';
import type {
  Lesson,
  CreateLessonData,
  UpdateLessonData,
} from '../types';

/**
 * useLessons Hook
 *
 * Feature-specific hook for lesson management logic.
 * Pure logic, no UI - handles fetching, creating, updating, and deleting lessons.
 *
 * @param courseId - Optional course ID to filter lessons
 * @returns Lesson state and CRUD methods
 * @property {Lesson[]} lessons - List of lessons
 * @property {boolean} isLoading - Loading state
 * @property {string | null} error - Error message if any
 * @property {function} fetchLessons - Fetch lessons (optionally filtered by courseId)
 * @property {function} createLesson - Create a new lesson
 * @property {function} updateLesson - Update an existing lesson
 * @property {function} deleteLesson - Delete a lesson
 *
 * @example
 * ```tsx
 * const { lessons, isLoading, fetchLessons } = useLessons(courseId);
 *
 * useEffect(() => {
 *   fetchLessons();
 * }, [courseId]);
 *
 * const handleCreate = async () => {
 *   await createLesson({ courseId, title: 'New Lesson', ... });
 * };
 * ```
 */
export const useLessons = (courseId?: string) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch lessons (optionally filtered by courseId)
   */
  const fetchLessons = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await lessonService.getAll(courseId);
      setLessons(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to fetch lessons';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  /**
   * Create a new lesson
   * @param data - Lesson creation data
   * @returns Created lesson
   */
  const createLesson = async (
    data: CreateLessonData
  ): Promise<Lesson> => {
    try {
      const newLesson = await lessonService.create(data);
      setLessons([...lessons, newLesson]);
      return newLesson;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to create lesson';
      setError(errorMessage);
      throw err;
    }
  };

  /**
   * Update an existing lesson
   * @param id - Lesson ID
   * @param data - Lesson update data
   * @returns Updated lesson
   */
  const updateLesson = async (
    id: string,
    data: UpdateLessonData
  ): Promise<Lesson> => {
    try {
      const updatedLesson = await lessonService.update(id, data);
      setLessons(
        lessons.map((lesson) =>
          lesson.id === id ? updatedLesson : lesson
        )
      );
      return updatedLesson;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to update lesson';
      setError(errorMessage);
      throw err;
    }
  };

  /**
   * Delete a lesson
   * @param id - Lesson ID to delete
   */
  const deleteLesson = async (id: string): Promise<void> => {
    try {
      await lessonService.delete(id);
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to delete lesson';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    lessons,
    isLoading,
    error,
    fetchLessons,
    createLesson,
    updateLesson,
    deleteLesson,
  };
};

