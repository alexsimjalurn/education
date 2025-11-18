import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { ApiError, handleError, logError } from '@/lib/errors';
import { logger } from '@/lib/logger';

/**
 * API Client
 *
 * Centralized HTTP client for all API calls.
 * Provides strict typing, error handling, and request/response interceptors.
 *
 * Features:
 * - Automatic token injection
 * - Error handling and logging
 * - Type-safe requests and responses
 * - Request/response interceptors
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL:
        typeof window !== 'undefined'
          ? process.env.NEXT_PUBLIC_API_URL || '/api'
          : 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds - optimized for Vercel edge functions
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: AxiosError) => {
        logError(error, { context: 'request-interceptor' });
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        logger.debug('API Response', {
          url: response.config.url,
          method: response.config.method,
          status: response.status,
        });
        return response;
      },
      (error: AxiosError<{ message?: string }>) => {
        const appError = handleError(error);

        // Log error with consistent structure
        logError(appError, {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          context: 'response-interceptor',
        });

        // Handle specific error cases
        if (error.response?.status === 401) {
          // Handle unauthorized - clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/(auth)';
          }
        }

        // Convert to ApiError for consistent error handling
        const apiError = new ApiError(
          error.response?.data?.message || appError.message,
          error.response?.status || 500,
          error.response?.data
        );

        return Promise.reject(apiError);
      }
    );
  }

  /**
   * GET request
   * @template T - Response data type
   * @param url - API endpoint
   * @param config - Optional axios config
   * @returns Typed response
   */
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  /**
   * POST request
   * @template T - Response data type
   * @template D - Request data type
   * @param url - API endpoint
   * @param data - Request payload
   * @param config - Optional axios config
   * @returns Typed response
   */
  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T, AxiosResponse<T>, D>(url, data, config);
  }

  /**
   * PUT request
   * @template T - Response data type
   * @template D - Request data type
   * @param url - API endpoint
   * @param data - Request payload
   * @param config - Optional axios config
   * @returns Typed response
   */
  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T, AxiosResponse<T>, D>(url, data, config);
  }

  /**
   * DELETE request
   * @template T - Response data type
   * @param url - API endpoint
   * @param config - Optional axios config
   * @returns Typed response
   */
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

export const apiClient = new ApiClient();

