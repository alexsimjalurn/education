/**
 * Authentication feature tests
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { LoginForm } from '@/features/auth/components/LoginForm'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

// Mock the auth service
jest.mock('@/features/auth/services', () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    getCurrentUser: jest.fn(),
    logout: jest.fn(),
  },
}))

describe('Authentication', () => {
  describe('LoginForm', () => {
    it('renders login form with email and password fields', () => {
      render(<LoginForm />)
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })

    it('validates required fields', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)
      
      const submitButton = screen.getByRole('button', { name: /login/i })
      await user.click(submitButton)
      
      // HTML5 validation should prevent submission
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toBeInvalid()
    })
  })

  describe('RegisterForm', () => {
    it('renders registration form with all required fields', () => {
      render(<RegisterForm />)
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    })

    it('validates password confirmation', async () => {
      const user = userEvent.setup()
      render(<RegisterForm />)
      
      const passwordInput = screen.getByLabelText(/password/i)
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
      
      await user.type(passwordInput, 'password123')
      await user.type(confirmPasswordInput, 'different123')
      
      await waitFor(() => {
        expect(confirmPasswordInput).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })
})
