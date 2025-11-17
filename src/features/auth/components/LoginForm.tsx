'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { useAuth } from '../hooks/useAuth';

/**
 * LoginForm Component
 *
 * Feature component for user authentication.
 * Contains business logic: form state, validation, API calls.
 * Uses global UI components (Input, Button) for presentation.
 *
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 */
export const LoginForm: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
      // Redirect will be handled by the auth hook
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleEmailChange}
        required
      />
      <Input
        type="password"
        label="Password"
        value={formData.password}
        onChange={handlePasswordChange}
        required
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button type="submit" isLoading={isLoading} className="w-full">
        Login
      </Button>
    </form>
  );
};

