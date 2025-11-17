import React from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

import type { Course } from '../types';

/**
 * CourseCard Component
 *
 * Feature component for displaying course information.
 * Contains business logic related to courses (enrollment, pricing, etc.)
 * Uses global UI components (Card, Button) for presentation.
 *
 * @example
 * ```tsx
 * <CourseCard
 *   course={courseData}
 *   onEnroll={(courseId) => handleEnroll(courseId)}
 * />
 * ```
 */
export interface CourseCardProps {
  /**
   * Course data to display
   */
  course: Course;
  /**
   * Callback when user clicks enroll button
   * @param courseId - The ID of the course to enroll in
   */
  onEnroll?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
}) => {
  const handleEnrollClick = () => {
    if (onEnroll) {
      onEnroll(course.id);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {course.thumbnail && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            By {course.instructor}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
            {course.level}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${course.price}</span>
          {onEnroll && (
            <Button onClick={handleEnrollClick} size="sm">
              Enroll
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

