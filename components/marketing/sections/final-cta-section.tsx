'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import type { CopyData, Locale } from '../data/types';
import { useMagnetic } from '../hooks/use-magnetic';

type GSAPStatic = typeof import('gsap').gsap;

interface FinalCtaSectionProps {
  locale: Locale;
  t: CopyData;
  reducedMotion: boolean;
}

export function FinalCtaSection({ locale, t, reducedMotion }: FinalCtaSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const magneticPrimaryRef = useMagnetic(reducedMotion, 0.3);
  const magneticSecondaryRef = useMagnetic(reducedMotion, 0.25);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    let cancelled = false;
    let ctx: ReturnType<GSAPStatic['context']> | undefined;

    const init = async () => {
      const [{ gsap: g }, { ScrollTrigger: ST }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      g.registerPlugin(ST);

      ctx = g.context(() => {
        const vignette = section.querySelector('.cl-final-vignette');
        const orbOne = section.querySelector('.cl-final-orb-one');
        const orbTwo = section.querySelector('.cl-final-orb-two');
        const shell = section.querySelector('.cl-final-shell');
        const copy = section.querySelector('.cl-final-copy');
        const roadmap = section.querySelector('.cl-final-roadmap');
        const heading = section.querySelector('.cl-final-heading');
        const body = section.querySelector('.cl-final-body');
        const actions = section.querySelector('.cl-final-actions');
        const sweep = section.querySelector('.cl-final-sweep');

        const timeline = g.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            end: 'bottom top',
            scrub: 1,
          },
        });

        if (vignette) timeline.to(vignette, { opacity: 0.94, ease: 'none' }, 0);
        if (orbOne) timeline.to(orbOne, { y: -46, x: 26, scale: 1.08, ease: 'none' }, 0);
        if (orbTwo) timeline.to(orbTwo, { y: 58, x: -18, scale: 1.12, ease: 'none' }, 0);
        if (shell) timeline.to(shell, { y: -30, scale: 1.015, ease: 'none' }, 0);
        if (copy) timeline.to(copy, { y: -12, ease: 'none' }, 0);
        if (roadmap) timeline.to(roadmap, { opacity: 0.74, ease: 'none' }, 0);
        if (heading) timeline.to(heading, { y: -20, scale: 1.02, ease: 'none' }, 0);
        if (body) timeline.to(body, { y: -8, opacity: 0.86, ease: 'none' }, 0);
        if (actions) timeline.to(actions, { y: 12, ease: 'none' }, 0);
        if (sweep) timeline.to(sweep, { xPercent: 180, opacity: 0.8, ease: 'none' }, 0);
      }, section);
    };

    init();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="book-demo" className="cl-section-glow cl-final-section">
      <div className="cl-final-vignette" aria-hidden="true" />
      <div className="cl-final-orb cl-final-orb-one" aria-hidden="true" />
      <div className="cl-final-orb cl-final-orb-two" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-32 pt-28 text-center lg:px-12">
        <div data-reveal data-glow="interactive" className="reveal-item cl-final-shell">
          <div className="cl-final-sweep" aria-hidden="true" />
          <div className="cl-final-copy">
            <p className="cl-final-roadmap text-xs uppercase tracking-[0.14em] text-zinc-400">
              {t.roadmapNow} &middot; {t.roadmapNext}
            </p>
            <h2 className="cl-final-heading cl-gradient-heading-accent mt-6 text-4xl font-semibold leading-tight lg:text-5xl">
              {t.finalTitle}
            </h2>
            <p className="cl-final-body mt-5 max-w-2xl text-base text-zinc-300">{t.finalBody}</p>
            <div className="cl-final-actions mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="https://app.clouisle.asia"
                className="cl-btn-primary cl-btn-lg cl-magnetic"
                ref={magneticPrimaryRef as React.Ref<HTMLAnchorElement>}
              >
                {t.finalPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="cl-btn-secondary cl-btn-lg cl-magnetic"
                ref={magneticSecondaryRef as React.Ref<HTMLAnchorElement>}
              >
                {t.finalSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
