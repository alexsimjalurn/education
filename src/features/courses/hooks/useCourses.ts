'use client';

import { useEffect, useState } from 'react';

import { courseService } from '../services';
import type {
  Course,
  CreateCourseData,
  UpdateCourseData,
} from '../types';

/**
 * useCourses Hook
 *
 * Feature-specific hook for course management logic.
 * Pure logic, no UI - handles fetching, creating, updating, and deleting courses.
 *
 * @returns Course state and CRUD methods
 * @property {Course[]} courses - List of courses
 * @property {boolean} isLoading - Loading state
 * @property {string | null} error - Error message if any
 * @property {function} fetchCourses - Fetch all courses
 * @property {function} createCourse - Create a new course
 * @property {function} updateCourse - Update an existing course
 * @property {function} deleteCourse - Delete a course
 *
 * @example
 * ```tsx
 * const { courses, isLoading, fetchCourses, createCourse } = useCourses();
 *
 * useEffect(() => {
 *   fetchCourses();
 * }, []);
 *
 * const handleCreate = async () => {
 *   await createCourse({ title: 'New Course', ... });
 * };
 * ```
 */
export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all courses
   */
  const fetchCourses = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to fetch courses';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Create a new course
   * @param data - Course creation data
   * @returns Created course
   */
  const createCourse = async (
    data: CreateCourseData
  ): Promise<Course> => {
    try {
      const newCourse = await courseService.create(data);
      setCourses([...courses, newCourse]);
      return newCourse;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to create course';
      setError(errorMessage);
      throw err;
    }
  };

  /**
   * Update an existing course
   * @param id - Course ID
   * @param data - Course update data
   * @returns Updated course
   */
  const updateCourse = async (
    id: string,
    data: UpdateCourseData
  ): Promise<Course> => {
    try {
      const updatedCourse = await courseService.update(id, data);
      setCourses(
        courses.map((course) =>
          course.id === id ? updatedCourse : course
        )
      );
      return updatedCourse;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to update course';
      setError(errorMessage);
      throw err;
    }
  };

  /**
   * Delete a course
   * @param id - Course ID to delete
   */
  const deleteCourse = async (id: string): Promise<void> => {
    try {
      await courseService.delete(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to delete course';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};

