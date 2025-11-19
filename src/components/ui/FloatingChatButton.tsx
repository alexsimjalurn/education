'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * FloatingChatButton
 *
 * A global floating button that stays visible on every page.
 */
export const FloatingChatButton: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/chat')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/chat"
        className="relative inline-flex items-center rounded-full bg-ctaBlue px-10 py-3 font-sans font-semibold text-white shadow-lg shadow-ctaBlue/40 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ctaBlue"
      >
        <span className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
          <Image
            src="/images/chatbot.webp"
            alt="Chatbot icon"
            width={32}
            height={32}
            className="w-8 h-8"
            priority
            quality={80}
          />
        </span>
        ແຊັດບັອດ
      </Link>
    </div>
  );
};

