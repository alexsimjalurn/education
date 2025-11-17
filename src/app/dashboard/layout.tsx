import React from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

/**
 * Dashboard Layout
 *
 * Consistent layout for dashboard pages with Header, Sidebar, and Footer.
 * Uses Tailwind CSS classes, no inline styles.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-secondary-50">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

