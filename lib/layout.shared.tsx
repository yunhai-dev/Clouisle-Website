import Image from 'next/image';
import { i18n } from '@/lib/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: (
        <>
          <Image src="/clouise-dark.svg" alt="Clouisle" width={24} height={24} />
          {locale === 'zh' ? '云屿' : 'Clouisle'}
        </>
      ),
    },
  };
}
