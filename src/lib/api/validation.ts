import { ValidationError } from '../errors';
import { validateEmail, validatePassword, validateRequired } from '../validation';

/**
 * API Validation Utilities
 *
 * Utilities for validating API request data.
 */

/**
 * Validate login request
 */
export const validateLoginRequest = (data: unknown): {
  email: string;
  password: string;
} => {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid request data');
  }

  const { email, password } = data as Record<string, unknown>;

  if (!validateRequired(email) || typeof email !== 'string') {
    throw new ValidationError('Email is required');
  }

  if (!validateEmail(email)) {
    throw new ValidationError('Invalid email format');
  }

  if (!validateRequired(password) || typeof password !== 'string') {
    throw new ValidationError('Password is required');
  }

  return { email, password };
};

/**
 * Validate register request
 */
export const validateRegisterRequest = (data: unknown): {
  name: string;
  email: string;
  password: string;
  role?: 'student' | 'teacher';
} => {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid request data');
  }

  const { name, email, password, role } = data as Record<string, unknown>;

  if (!validateRequired(name) || typeof name !== 'string') {
    throw new ValidationError('Name is required');
  }

  if (!validateRequired(email) || typeof email !== 'string') {
    throw new ValidationError('Email is required');
  }

  if (!validateEmail(email)) {
    throw new ValidationError('Invalid email format');
  }

  if (!validateRequired(password) || typeof password !== 'string') {
    throw new ValidationError('Password is required');
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    throw new ValidationError(
      passwordValidation.errors.join(', ')
    );
  }

  if (role && role !== 'student' && role !== 'teacher') {
    throw new ValidationError('Invalid role. Must be student or teacher');
  }

  return {
    name,
    email,
    password,
    role: (role as 'student' | 'teacher') || 'student',
  };
};

/**
 * Validate course creation request
 */
export const validateCreateCourseRequest = (data: unknown): {
  title: string;
  description: string;
  instructor: string;
  duration: number;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail?: string;
} => {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid request data');
  }

  const {
    title,
    description,
    instructor,
    duration,
    price,
    level,
    category,
    thumbnail,
  } = data as Record<string, unknown>;

  if (!validateRequired(title) || typeof title !== 'string') {
    throw new ValidationError('Title is required');
  }

  if (!validateRequired(description) || typeof description !== 'string') {
    throw new ValidationError('Description is required');
  }

  if (!validateRequired(instructor) || typeof instructor !== 'string') {
    throw new ValidationError('Instructor is required');
  }

  if (typeof duration !== 'number' || duration <= 0) {
    throw new ValidationError('Duration must be a positive number');
  }

  if (typeof price !== 'number' || price < 0) {
    throw new ValidationError('Price must be a non-negative number');
  }

  if (
    !level ||
    (level !== 'beginner' && level !== 'intermediate' && level !== 'advanced')
  ) {
    throw new ValidationError(
      'Level must be beginner, intermediate, or advanced'
    );
  }

  if (!validateRequired(category) || typeof category !== 'string') {
    throw new ValidationError('Category is required');
  }

  if (thumbnail && typeof thumbnail !== 'string') {
    throw new ValidationError('Thumbnail must be a string');
  }

  return {
    title,
    description,
    instructor,
    duration,
    price,
    level,
    category,
    thumbnail,
  };
};

/**
 * Validate lesson creation request
 */
export const validateCreateLessonRequest = (data: unknown): {
  courseId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
} => {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid request data');
  }

  const {
    courseId,
    title,
    description,
    content,
    videoUrl,
    duration,
    order,
  } = data as Record<string, unknown>;

  if (!validateRequired(courseId) || typeof courseId !== 'string') {
    throw new ValidationError('Course ID is required');
  }

  if (!validateRequired(title) || typeof title !== 'string') {
    throw new ValidationError('Title is required');
  }

  if (!validateRequired(description) || typeof description !== 'string') {
    throw new ValidationError('Description is required');
  }

  if (!validateRequired(content) || typeof content !== 'string') {
    throw new ValidationError('Content is required');
  }

  if (typeof duration !== 'number' || duration <= 0) {
    throw new ValidationError('Duration must be a positive number');
  }

  if (typeof order !== 'number' || order < 0) {
    throw new ValidationError('Order must be a non-negative number');
  }

  if (videoUrl && typeof videoUrl !== 'string') {
    throw new ValidationError('Video URL must be a string');
  }

  return {
    courseId,
    title,
    description,
    content,
    videoUrl,
    duration,
    order,
  };
};

