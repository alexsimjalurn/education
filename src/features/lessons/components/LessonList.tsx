'use client'

import { Spinner } from '@/components/ui/Spinner'

import { useLessons } from '../hooks/useLessons'

import { LessonCard } from './LessonCard'

interface LessonListProps {
  courseId?: string
}

export const LessonList: React.FC<LessonListProps> = ({ courseId }) => {
  const { lessons, isLoading, error } = useLessons(courseId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No lessons available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  )
}

