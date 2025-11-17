export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: number // in hours
  price: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

export interface CreateCourseData {
  title: string
  description: string
  instructor: string
  duration: number
  price: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  thumbnail?: string
}

export interface UpdateCourseData extends Partial<CreateCourseData> {}

