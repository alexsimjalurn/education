'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

/**
 * Register Page
 *
 * Modern registration page inspired by provided design.
 * Includes illustration panel and detailed sign-up form.
 */
export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/BG2.png')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-blue-100 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-100 opacity-30 blur-3xl" />
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white rounded-3xl shadow-xl p-4 lg:p-6 h-full">
            <div className="bg-gradient-to-br from-[#F6F7FB] to-white rounded-3xl h-full flex flex-col items-center justify-center p-5">
              <Image
                src="/images/logo.png"
                alt="Education Logo"
                width={300}
                height={300}
                className="w-full h-auto max-w-[220px]"
                priority
              />
              <div className="flex items-center gap-1.5 mt-4">
                <span className="h-1.5 w-6 rounded-full bg-brandBlue" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-6 h-full flex flex-col">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  ລົງທະບຽນ
                </h1>
                <p className="text-sm text-gray-600">
                  ມາສ້າງບັນຊີຂອງທ່ານເພື່ອເຂົ້າເຖິງລະບົບສ່ວນຕົວ.
                </p>
              </div>
              <Link href="/" className="inline-flex">
                <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  ກັບໄປໜ້າຫຼັກ
                </Button>
              </Link>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

