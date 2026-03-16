'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { BrandLoader } from '@/components/marketing/brand-loader';
import { useReducedMotionPreference } from '@/components/marketing/hooks/use-reduced-motion';

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const reducedMotion = useReducedMotionPreference();
  const showLoader = /^\/(en|zh)\/?$/.test(pathname);

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <>
      {showLoader ? <BrandLoader reducedMotion={reducedMotion} /> : null}
      <Navbar />
      <main>{children}</main>
    </>
  );
}
