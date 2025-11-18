import type { Metadata } from 'next';
import { Noto_Sans_Lao } from 'next/font/google';

import { ErrorBoundaryWrapper } from '@/components/errors/ErrorBoundaryWrapper';
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';
import '../styles/globals.css';

const notoSansLao = Noto_Sans_Lao({
  subsets: ['lao'],
  weight: ['400', '500', '600', '700'], // Reduced from 9 weights to 4 essential weights for faster loading
  variable: '--font-noto-sans-lao',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Education Web App',
  description: 'A modern education platform',
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

