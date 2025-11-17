export const config = {
  app: {
    name: 'Education Web App',
    version: '1.0.0',
    description: 'A modern education platform',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
  },
  features: {
    enableAuth: true,
    enableCourses: true,
    enableLessons: true,
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
} as const

