'use client';

import Image from 'next/image';
import Link from 'next/link';
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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    if (!acceptTerms) {
      setTermsError('ກະລຸນາຍອມຮັບຂໍ້ກໍານົດແລະນະໂຍບາຍຄວາມປອດໄພ');
      return;
    }
    setTermsError(null);

    try {
      await register({
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleChange =
    (key: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [key]: e.target.value });
    };
  const passwordMismatch =
    formData.password !== formData.confirmPassword &&
    formData.confirmPassword
      ? 'ລະຫັດຜ່ານບໍ່ກົງກັນ'
      : undefined;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          type="text"
          label="ຊື່"
          placeholder="ຊື່"
          value={formData.firstName}
          onChange={handleChange('firstName')}
          required
        />
        <Input
          type="text"
          label="ນາມສະກຸນ"
          placeholder="ນາມສະກຸນ"
          value={formData.lastName}
          onChange={handleChange('lastName')}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          type="email"
          label="ອີເມວ"
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange('email')}
          required
        />
        <Input
          type="tel"
          label="ເບີໂທ"
          placeholder="+856 XX XXX XXXX"
          value={formData.phone}
          onChange={handleChange('phone')}
        />
      </div>

      <Input
        type="password"
        label="ລະຫັດຜ່ານ"
        value={formData.password}
        onChange={handleChange('password')}
        required
      />
      <Input
        type="password"
        label="ຢືນຢັນລະຫັດຜ່ານ"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        required
        error={passwordMismatch}
      />

      <label className="flex items-start gap-2.5 text-sm text-gray-600">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-gray-300 text-brandBlue focus:ring-brandBlue"
          checked={acceptTerms}
          onChange={e => setAcceptTerms(e.target.checked)}
        />
        <span>
          ຂ້ອຍຍອມຮັບທຸກເງື່ອນໄຂໃນ{' '}
          <Link href="/terms" className="text-brandBlue hover:underline">
            ຂໍ້ກໍານົດ
          </Link>{' '}
          ແລະ{' '}
          <Link href="/privacy" className="text-brandBlue hover:underline">
            ນະໂຍບາຍຄວາມປອດໄພ
          </Link>
        </span>
      </label>
      {(termsError || error) && (
        <p className="text-sm text-red-600">{termsError || error}</p>
      )}

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full py-2 text-sm font-semibold"
      >
        ສ້າງບັນຊີ
      </Button>

      <p className="text-center text-sm text-gray-600">
        ມີບັນຊີແລ້ວ?{' '}
        <Link href="/login" className="text-brandBlue font-semibold">
          ເຂົ້າລະບົບ
        </Link>
      </p>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs uppercase tracking-wide text-gray-500">
          ຫຼືລົງທະບຽນດ້ວຍ
        </span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {[
          { name: 'Facebook', src: '/images/facebook_icon.png' },
          { name: 'Google', src: '/images/google_icon.png' },
          { name: 'GitHub', src: '/images/github_icon.png' },
          { name: 'Apple', src: '/images/apple_icon.png' },
        ].map(provider => (
          <button
            key={provider.name}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:border-brandBlue hover:text-brandBlue transition-colors"
          >
            <Image
              src={provider.src}
              alt={`${provider.name} icon`}
              width={20}
              height={20}
              className="w-5 h-5"
            />
            {provider.name}
          </button>
        ))}
      </div>
    </form>
  );
};

