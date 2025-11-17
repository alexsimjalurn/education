'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';

/**
 * Header Component
 *
 * Consistent header layout used across all pages.
 * Uses Tailwind CSS classes, no inline styles.
 */
export const Header: React.FC = () => {
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);

  const workItems = [
    { label: 'ຮູບພາບ', href: '/gallery' },
    { label: 'ແບບຈຳລອງ', href: '#' },
    { label: 'ຂຽນໃນອາກາດ', href: '#' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center relative overflow-visible"
          >
            <Image
              src="/images/logo.png"
              alt="Education Logo"
              width={320}
              height={120}
              className="h-16 md:h-20 w-auto object-contain transform origin-left scale-125 md:scale-150 -translate-y-1 md:-translate-y-2"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-900 hover:text-primary-600 transition-colors font-medium no-underline hover:no-underline"
            >
              ໜ້າຫຼັກ
            </Link>
            <Link
              href="/about"
              className="text-gray-900 hover:text-primary-600 transition-colors font-medium no-underline hover:no-underline"
            >
              ກ່ຽວກັບພວກເຮົາ
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsWorkDropdownOpen(prev => !prev)}
                className="text-gray-900 hover:text-primary-600 transition-colors font-medium no-underline hover:no-underline inline-flex items-center gap-1"
              >
                ຜົນງານທີ່ຜ່ານມາ
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isWorkDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isWorkDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-2 z-50">
                  {workItems.map(item => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="https://www.facebook.com/profile.php?id=61574065144393"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-primary-600 transition-colors font-medium no-underline hover:no-underline"
            >
              ຂ່າວສານ
            </Link>
            <Link
              href="#footer"
              className="text-gray-900 hover:text-primary-600 transition-colors font-medium no-underline hover:no-underline"
            >
              ຕິດຕໍ່ພວກເຮົາ
            </Link>
            <Link href="/register">
              <Button size="sm">ລົງທະບຽນ</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
