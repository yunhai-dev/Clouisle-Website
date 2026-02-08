'use client';

import type { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
