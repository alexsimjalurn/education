'use client';

import { LoginForm } from '@/features/auth/components/LoginForm';

/**
 * Login Page
 *
 * Login page with login form.
 * Uses Tailwind CSS classes, no inline styles.
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
            Login
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

