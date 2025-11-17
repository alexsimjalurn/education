/**
 * Validation Utilities
 *
 * Common validation functions used throughout the application.
 */

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns true if email is valid
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param password - Password string to validate
 * @returns Validation result with errors
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate required field
 * @param value - Value to validate
 * @returns true if value is not null, undefined, or empty string
 */
export const validateRequired = (
  value: string | null | undefined
): boolean => {
  return value !== null && value !== undefined && value.trim() !== '';
};

