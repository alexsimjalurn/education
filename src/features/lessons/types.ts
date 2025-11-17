export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  content: string
  videoUrl?: string
  duration: number // in minutes
  order: number
  createdAt: string
  updatedAt: string
}

export interface CreateLessonData {
  courseId: string
  title: string
  description: string
  content: string
  videoUrl?: string
  duration: number
  order: number
}

export interface UpdateLessonData extends Partial<CreateLessonData> {}

