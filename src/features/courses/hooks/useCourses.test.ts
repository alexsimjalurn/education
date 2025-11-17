import { renderHook, waitFor } from '@testing-library/react';

import { courseService } from '../services';

import { useCourses } from './useCourses';

// Mock the course service
jest.mock('../services', () => ({
  courseService: {
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

/**
 * useCourses Hook Tests
 *
 * Unit tests for useCourses feature hook.
 */
describe('useCourses', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCourse = {
    id: '1',
    title: 'Test Course',
    description: 'Test Description',
    instructor: 'John Doe',
    duration: 120,
    price: 99.99,
    level: 'beginner' as const,
    category: 'programming',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  it('initializes with empty courses array', () => {
    (courseService.getAll as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useCourses());

    expect(result.current.courses).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('fetches courses on mount', async () => {
    (courseService.getAll as jest.Mock).mockResolvedValue([mockCourse]);

    const { result } = renderHook(() => useCourses());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(courseService.getAll).toHaveBeenCalledTimes(1);
    expect(result.current.courses).toEqual([mockCourse]);
  });

  it('handles fetch error', async () => {
    const errorMessage = 'Failed to fetch courses';
    (courseService.getAll as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useCourses());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.courses).toEqual([]);
  });

  it('creates a new course', async () => {
    (courseService.getAll as jest.Mock).mockResolvedValue([]);
    (courseService.create as jest.Mock).mockResolvedValue(mockCourse);

    const { result } = renderHook(() => useCourses());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const newCourseData = {
      title: 'New Course',
      description: 'New Description',
      instructor: 'Jane Doe',
      duration: 60,
      price: 49.99,
      level: 'intermediate' as const,
      category: 'design',
    };

    await result.current.createCourse(newCourseData);

    expect(courseService.create).toHaveBeenCalledWith(newCourseData);
    expect(result.current.courses).toContainEqual(mockCourse);
  });

  it('handles create error', async () => {
    (courseService.getAll as jest.Mock).mockResolvedValue([]);
    const errorMessage = 'Failed to create course';
    (courseService.create as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useCourses());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const newCourseData = {
      title: 'New Course',
      description: 'New Description',
      instructor: 'Jane Doe',
      duration: 60,
      price: 49.99,
      level: 'beginner' as const,
      category: 'programming',
    };

    await expect(result.current.createCourse(newCourseData)).rejects.toThrow(
      errorMessage
    );
    expect(result.current.error).toBe(errorMessage);
  });

  it('updates a course', async () => {
    (courseService.getAll as jest.Mock).mockResolvedValue([mockCourse]);
    const updatedCourse = { ...mockCourse, title: 'Updated Course' };
    (courseService.update as jest.Mock).mockResolvedValue(updatedCourse);

    const { result } = renderHook(() => useCourses());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const updateData = { title: 'Updated Course' };
    await result.current.updateCourse('1', updateData);

    expect(courseService.update).toHaveBeenCalledWith('1', updateData);
    expect(result.current.courses[0].title).toBe('Updated Course');
  });

  it('deletes a course', async () => {
    (courseService.getAll as jest.Mock).mockResolvedValue([mockCourse]);
    (courseService.delete as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useCourses());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.deleteCourse('1');

    expect(courseService.delete).toHaveBeenCalledWith('1');
    expect(result.current.courses).not.toContainEqual(mockCourse);
  });
});

