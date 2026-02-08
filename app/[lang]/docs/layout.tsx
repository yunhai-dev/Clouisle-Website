import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <DocsLayout
      tree={source.getPageTree(lang)}
      {...baseOptions(lang)}
      themeSwitch={{ enabled: true, mode: 'light-dark-system' }}
    >
      {children}
    </DocsLayout>
  );
}
