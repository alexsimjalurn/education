import type { Metadata } from 'next';
import { Noto_Sans_Lao } from 'next/font/google';

import { ErrorBoundaryWrapper } from '@/components/errors/ErrorBoundaryWrapper';
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';
import '../styles/globals.css';

const notoSansLao = Noto_Sans_Lao({
  subsets: ['lao'],
  weight: ['400', '600'], // Only essential weights for fastest loading
  variable: '--font-noto-sans-lao',
  display: 'swap', // Show fallback font immediately, swap when loaded
  preload: true,
  fallback: ['system-ui', 'arial'], // Fallback fonts for instant display
  adjustFontFallback: true, // Better font fallback matching
});

export const metadata: Metadata = {
  title: 'Education Web App',
  description: 'A modern education platform',
  metadataBase: new URL('https://education-gray-iota.vercel.app'),
  openGraph: {
    title: 'Education Web App',
    description: 'A modern education platform',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lo" className={notoSansLao.variable}>
      <body>
        <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>
        <FloatingChatButton />
      </body>
    </html>
  );
}

