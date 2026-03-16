import '../globals.css';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
