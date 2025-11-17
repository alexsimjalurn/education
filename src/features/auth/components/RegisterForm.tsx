'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { useAuth } from '../hooks/useAuth';

/**
 * RegisterForm Component
 *
 * Feature component for user registration.
 * Contains business logic: form state, validation, password matching, API calls.
 * Uses global UI components (Input, Button) for presentation.
 *
 * @example
 * ```tsx
 * <RegisterForm />
 * ```
 */
export const RegisterForm: React.FC = () => {
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, confirmPassword: e.target.value });
  };

  const passwordMismatch =
    formData.password !== formData.confirmPassword &&
    formData.confirmPassword
      ? 'Passwords do not match'
      : undefined;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        label="Name"
        value={formData.name}
        onChange={handleNameChange}
        required
      />
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
      <Input
        type="password"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
        error={passwordMismatch}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button type="submit" isLoading={isLoading} className="w-full">
        Register
      </Button>
    </form>
  );
};

