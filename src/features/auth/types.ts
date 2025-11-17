export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'teacher' | 'admin'
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role?: 'student' | 'teacher'
}

export interface AuthResponse {
  user: User
  token: string
}

