'use client';

import { useEffect, useState } from 'react';

import { useUserStore } from '@/store';

import { authService } from '../services';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '../types';

/**
 * useAuth Hook
 *
 * Feature-specific hook for authentication logic.
 * Pure logic, no UI - handles login, logout, registration, and auth state.
 *
 * @returns Authentication state and methods
 * @property {User | null} user - Current authenticated user
 * @property {boolean} isLoading - Loading state for auth operations
 * @property {string | null} error - Error message if any
 * @property {function} login - Login function
 * @property {function} register - Registration function
 * @property {function} logout - Logout function
 * @property {boolean} isAuthenticated - Whether user is authenticated
 *
 * @example
 * ```tsx
 * const { user, login, logout, isAuthenticated } = useAuth();
 *
 * const handleLogin = async () => {
 *   await login({ email: 'user@example.com', password: 'password' });
 * };
 * ```
 */
export const useAuth = () => {
  const { user, setUser, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          clearUser();
        }
      } catch (err) {
        clearUser();
      }
    };
    checkAuth();
  }, [setUser, clearUser]);

  /**
   * Login function
   * @param credentials - Login credentials (email and password)
   * @returns Auth response with user and token
   */
  const login = async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register function
   * @param data - Registration data (name, email, password)
   * @returns Auth response with user and token
   */
  const register = async (data: RegisterData): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      setUser(response.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   * Clears user state and removes token from localStorage
   */
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (err) {
      // Log error but continue with logout
      if (process.env.NODE_ENV === 'development') {
        console.error('Logout error:', err);
      }
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      clearUser();
    }
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};

