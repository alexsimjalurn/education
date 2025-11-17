'use client';

import { RegisterForm } from '@/features/auth/components/RegisterForm';

/**
 * Register Page
 *
 * Registration page with register form.
 * Uses Tailwind CSS classes, no inline styles.
 */
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
            Register
          </h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

