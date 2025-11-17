import { ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { apiClient } from '@/services/apiClient';

import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from './types';

/**
 * Auth Service
 *
 * Service layer for authentication-related API calls.
 * All API calls go through this service - no direct API calls in components.
 * Strict typing for requests and responses.
 * Error handling is done in apiClient interceptors.
 *
 * @example
 * ```tsx
 * const response = await authService.login({ email: '...', password: '...' });
 * const user = await authService.getCurrentUser();
 * await authService.logout();
 * ```
 */
export const authService = {
  /**
   * Login user
   * @param credentials - Login credentials (email and password)
   * @returns Auth response with user and token
   * @throws {ValidationError} If validation fails
   * @throws {ApiError} If login fails or invalid credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (!credentials.email || !credentials.password) {
      const error = new ValidationError('Email and password are required');
      logger.error('Auth service: Validation failed', { email: credentials.email });
      throw error;
    }
    try {
      const response = await apiClient.post<AuthResponse, LoginCredentials>(
        '/api/auth/login',
        credentials
      );
      logger.info('Auth service: User logged in', { userId: response.data.user.id });
      return response.data;
    } catch (error) {
      logger.error('Auth service: Login failed', { email: credentials.email, error });
      throw error;
    }
  },

  /**
   * Register new user
   * @param data - Registration data (name, email, password)
   * @returns Auth response with user and token
   * @throws {ValidationError} If validation fails
   * @throws {ApiError} If registration fails
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    if (!data.email || !data.password || !data.name) {
      const error = new ValidationError('Name, email, and password are required');
      logger.error('Auth service: Validation failed', { email: data.email });
      throw error;
    }
    try {
      const response = await apiClient.post<AuthResponse, RegisterData>(
        '/api/auth/register',
        data
      );
      logger.info('Auth service: User registered', { userId: response.data.user.id });
      return response.data;
    } catch (error) {
      logger.error('Auth service: Registration failed', { email: data.email, error });
      throw error;
    }
  },

  /**
   * Logout user
   * @throws {ApiError} If logout fails
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post<{ message: string }>('/api/auth/logout');
      logger.info('Auth service: User logged out');
    } catch (error) {
      logger.error('Auth service: Logout failed', { error });
      throw error;
    }
  },

  /**
   * Get current authenticated user
   * @returns Current user or null if not authenticated
   * @throws {ApiError} If request fails (handled internally, returns null)
   */
  async getCurrentUser(): Promise<AuthResponse['user'] | null> {
    try {
      const response = await apiClient.get<AuthResponse['user']>(
        '/api/auth/me'
      );
      logger.debug('Auth service: Current user fetched', { userId: response.data.id });
      return response.data;
    } catch (error) {
      // Return null if user is not authenticated
      // Error is already logged by apiClient interceptor
      logger.debug('Auth service: User not authenticated');
      return null;
    }
  },
};

