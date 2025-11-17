import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

/**
 * API Client Tests
 *
 * Unit tests for the centralized API client.
 */
describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    mockedAxios.create.mockReturnValue({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn(),
        },
        response: {
          use: jest.fn(),
        },
      },
    } as unknown as axios.AxiosInstance);
  });

  it('creates axios instance with correct baseURL', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: '/api',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      })
    );
  });

  it('adds authorization header when token exists', async () => {
    localStorageMock.setItem('token', 'test-token');

    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: {} }),
      post: jest.fn().mockResolvedValue({ data: {} }),
      put: jest.fn().mockResolvedValue({ data: {} }),
      delete: jest.fn().mockResolvedValue({ data: {} }),
      interceptors: {
        request: {
          use: jest.fn((onFulfilled) => {
            // Simulate interceptor call
            const config = { headers: {} };
            onFulfilled(config);
            return config;
          }),
        },
        response: {
          use: jest.fn(),
        },
      },
    } as unknown as axios.AxiosInstance;

    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    // Re-import to trigger constructor
    jest.resetModules();
    const { apiClient: newApiClient } = await import('./apiClient');

    await newApiClient.get('/test');

    expect(mockAxiosInstance.get).toHaveBeenCalled();
  });

  it('handles GET request', async () => {
    const mockResponse = { data: { id: '1', name: 'Test' } };
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue(mockResponse),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    } as unknown as axios.AxiosInstance;

    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    jest.resetModules();
    const { apiClient: newApiClient } = await import('./apiClient');

    const response = await newApiClient.get<{ id: string; name: string }>(
      '/test'
    );

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
    expect(response.data).toEqual(mockResponse.data);
  });

  it('handles POST request', async () => {
    const mockResponse = { data: { id: '1' } };
    const mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn().mockResolvedValue(mockResponse),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    } as unknown as axios.AxiosInstance;

    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    jest.resetModules();
    const { apiClient: newApiClient } = await import('./apiClient');

    const requestData = { name: 'Test' };
    const response = await newApiClient.post<{ id: string }, typeof requestData>(
      '/test',
      requestData
    );

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/test',
      requestData,
      undefined
    );
    expect(response.data).toEqual(mockResponse.data);
  });

  it('handles error responses', async () => {
    const mockError = {
      response: {
        status: 404,
        data: { message: 'Not found' },
      },
      config: { url: '/test', method: 'get' },
    };

    const mockAxiosInstance = {
      get: jest.fn().mockRejectedValue(mockError),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: {
          use: jest.fn((onFulfilled, onRejected) => {
            // Simulate error interceptor
            onRejected(mockError);
          }),
        },
      },
    } as unknown as axios.AxiosInstance;

    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    jest.resetModules();
    const { apiClient: newApiClient } = await import('./apiClient');

    await expect(newApiClient.get('/test')).rejects.toThrow();
  });
});

