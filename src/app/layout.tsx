import type { Metadata } from 'next';

import { ErrorBoundaryWrapper } from '@/components/errors/ErrorBoundaryWrapper';
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';
import '../styles/globals.css';

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
    <html lang="lo">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&family=Phetsarath:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>
        <FloatingChatButton />
      </body>
    </html>
  );
}

