import type { NextApiRequest, NextApiResponse } from 'next';

import { validateLoginRequest } from '@/lib/api/validation';

import handler from './login';

// Mock dependencies
jest.mock('@/lib/api/middleware', () => ({
  createApiHandler: (handlers: Record<string, unknown>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const method = req.method as string;
      const handler = handlers[method];
      if (handler) {
        await (handler as (req: NextApiRequest, res: NextApiResponse) => Promise<void>)(req, res);
      }
    };
  },
  logRequest: jest.fn(),
  requireBody: jest.fn(),
}));

jest.mock('@/lib/api/validation', () => ({
  validateLoginRequest: jest.fn(),
}));

/**
 * Login API Route Tests
 *
 * Integration tests for the login API endpoint.
 */
describe('/api/auth/login', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    (validateLoginRequest as jest.Mock).mockReturnValue({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('returns success response with user and token', async () => {
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          user: expect.objectContaining({
            email: 'test@example.com',
          }),
          token: expect.any(String),
        }),
      })
    );
  });

  it('validates login request', async () => {
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(validateLoginRequest).toHaveBeenCalledWith(mockReq.body);
  });

  it('returns error for invalid credentials', async () => {
    (validateLoginRequest as jest.Mock).mockReturnValue({
      email: '',
      password: '',
    });

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: expect.objectContaining({
          message: 'Invalid credentials',
        }),
      })
    );
  });
});

