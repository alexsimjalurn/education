'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const [isLessonDropdownOpen, setIsLessonDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogoClick = () => {
    setIsWorkDropdownOpen(false);
    setIsLessonDropdownOpen(false);
    router.push('/');
  };

  const toggleWorkDropdown = () => {
    setIsWorkDropdownOpen(prev => {
      const next = !prev;
      if (next) {
        setIsLessonDropdownOpen(false);
      }
      return next;
    });
  };

  const toggleLessonDropdown = () => {
    setIsLessonDropdownOpen(prev => {
      const next = !prev;
      if (next) {
        setIsWorkDropdownOpen(false);
      }
      return next;
    });
  };

  const workItems = [
    { label: 'ຮູບພາບ', href: '/gallery' },
    { label: 'ແບບຈຳລອງ', href: '#' },
    { label: 'ຂຽນໃນອາກາດ', href: '#' },
    { label: 'ແຊັດບັອດ', href: '/chat' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center relative overflow-visible bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
            aria-label="ໄປໜ້າຫຼັກ"
          >
            <Image
              src="/images/logo.webp"
              alt="Education Logo"
              width={320}
              height={120}
              className="h-16 md:h-20 w-auto object-contain transform origin-left scale-125 md:scale-150 -translate-y-1 md:-translate-y-2"
              priority
              quality={85}
            />
          </button>

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
                onClick={toggleWorkDropdown}
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
                      onClick={() => setIsWorkDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={toggleLessonDropdown}
                className="text-gray-900 hover:text-primary-600 transition-colors font-medium no-underline hover:no-underline inline-flex items-center gap-1"
              >
                ບົດຮຽນ
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isLessonDropdownOpen ? 'rotate-180' : ''
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
              {isLessonDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-2 z-50">
                  {['ບົດຮຽນ ປີ1', 'ບົດຮຽນ ປີ2', 'ບົດຮຽນ ປີ3', 'ບົດຮຽນ ປີ4'].map(
                    lesson => (
                      <button
                        key={lesson}
                        type="button"
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsLessonDropdownOpen(false)}
                      >
                        {lesson}
                      </button>
                    )
                  )}
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
