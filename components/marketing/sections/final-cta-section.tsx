'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Locale, CopyData } from '../data/types';
import { useMagnetic } from '../hooks/use-magnetic';

interface FinalCtaSectionProps {
  locale: Locale;
  t: CopyData;
  reducedMotion: boolean;
}

export function FinalCtaSection({ locale, t, reducedMotion }: FinalCtaSectionProps) {
  const magneticPrimaryRef = useMagnetic(reducedMotion, 0.3);
  const magneticSecondaryRef = useMagnetic(reducedMotion, 0.25);

  return (
    <section id="book-demo" className="cl-section-glow">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-32 pt-28 text-center lg:px-12">
        <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">
          {t.roadmapNow} &middot; {t.roadmapNext}
        </p>
        <h2 className="cl-gradient-heading-accent mt-6 text-4xl font-semibold leading-tight lg:text-5xl">
          {t.finalTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-base text-zinc-300">{t.finalBody}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/beta`}
            className="cl-btn-primary cl-btn-lg cl-magnetic"
            ref={magneticPrimaryRef as React.Ref<HTMLAnchorElement>}
          >
            {t.finalPrimary}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="mailto:yunhai@yhnotes.com"
            className="cl-btn-secondary cl-btn-lg cl-magnetic"
            ref={magneticSecondaryRef as React.Ref<HTMLAnchorElement>}
          >
            {t.finalSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
