import type { Metadata } from 'next';
import { Noto_Sans_Lao } from 'next/font/google';

import { ErrorBoundaryWrapper } from '@/components/errors/ErrorBoundaryWrapper';
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';
import '../styles/globals.css';

const notoSansLao = Noto_Sans_Lao({
  subsets: ['lao'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-lao',
  display: 'swap',
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

