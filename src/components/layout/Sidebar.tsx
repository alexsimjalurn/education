'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Navigation Items
 */
const navItems = [
  { href: '/(dashboard)', label: 'Dashboard' },
  { href: '/(dashboard)/courses', label: 'Courses' },
  { href: '/(dashboard)/lessons', label: 'Lessons' },
  { href: '/(dashboard)/profile', label: 'Profile' },
];

/**
 * Sidebar Component
 *
 * Consistent sidebar layout for dashboard pages.
 * Uses Tailwind CSS classes, no inline styles.
 *
 * @example
 * ```tsx
 * <Sidebar />
 * ```
 */
export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-secondary-50 border-r border-secondary-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

