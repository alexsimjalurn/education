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

  if (typeof email !== 'string' || !validateRequired(email)) {
    throw new ValidationError('Email is required');
  }

  if (!validateEmail(email)) {
    throw new ValidationError('Invalid email format');
  }

  if (typeof password !== 'string' || !validateRequired(password)) {
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

  if (typeof name !== 'string' || !validateRequired(name)) {
    throw new ValidationError('Name is required');
  }

  if (typeof email !== 'string' || !validateRequired(email)) {
    throw new ValidationError('Email is required');
  }

  if (!validateEmail(email)) {
    throw new ValidationError('Invalid email format');
  }

  if (typeof password !== 'string' || !validateRequired(password)) {
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

  if (typeof title !== 'string' || !validateRequired(title)) {
    throw new ValidationError('Title is required');
  }

  if (typeof description !== 'string' || !validateRequired(description)) {
    throw new ValidationError('Description is required');
  }

  if (typeof instructor !== 'string' || !validateRequired(instructor)) {
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

  if (typeof category !== 'string' || !validateRequired(category)) {
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
    thumbnail: typeof thumbnail === 'string' ? thumbnail : undefined,
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

  if (typeof courseId !== 'string' || !validateRequired(courseId)) {
    throw new ValidationError('Course ID is required');
  }

  if (typeof title !== 'string' || !validateRequired(title)) {
    throw new ValidationError('Title is required');
  }

  if (typeof description !== 'string' || !validateRequired(description)) {
    throw new ValidationError('Description is required');
  }

  if (typeof content !== 'string' || !validateRequired(content)) {
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
    videoUrl: typeof videoUrl === 'string' ? videoUrl : undefined,
    duration,
    order,
  };
};

