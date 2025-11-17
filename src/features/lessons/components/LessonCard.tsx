import React from 'react';

import { Card } from '@/components/ui/Card';

import type { Lesson } from '../types';

/**
 * LessonCard Component
 *
 * Feature component for displaying lesson information.
 * Contains business logic related to lessons (navigation, lesson order, etc.)
 * Uses global UI components (Card) for presentation.
 *
 * @example
 * ```tsx
 * <LessonCard
 *   lesson={lessonData}
 *   onClick={(lessonId) => navigateToLesson(lessonId)}
 * />
 * ```
 */
export interface LessonCardProps {
  /**
   * Lesson data to display
   */
  lesson: Lesson;
  /**
   * Callback when user clicks on the lesson card
   * @param lessonId - The ID of the lesson
   */
  onClick?: (lessonId: string) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(lesson.id);
    }
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-500">
              Lesson {lesson.order}
            </span>
            <span className="text-sm text-gray-400">
              {lesson.duration} min
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
          <p className="text-gray-600 line-clamp-2">{lesson.description}</p>
        </div>
      </div>
    </Card>
  );
};

