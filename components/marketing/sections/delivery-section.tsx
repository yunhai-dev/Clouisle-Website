'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { CopyData } from '../data/types';

type GSAPStatic = typeof import('gsap').gsap;

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

interface DeliverySectionProps {
  t: CopyData;
  reducedMotion: boolean;
}

export function DeliverySection({ t, reducedMotion }: DeliverySectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
        const steps = g.utils.toArray<HTMLElement>('.cl-delivery-step', section);

        if (steps.length > 0) {
          g.set(steps, { opacity: 0, y: 20 });
          steps.forEach((step, i) => {
            g.to(step, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                once: true,
              },
              delay: 0.15 + i * 0.2,
            });
          });
        }
      }, section);
    };

    init();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reducedMotion]);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t.deliveryTitle}</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">{t.deliverySubtitle}</p>
      </div>

      <div ref={sectionRef} className="relative mt-10">
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {t.deliverySteps.map((step, index) => (
            <div
              key={step.title}
              className="cl-delivery-step relative"
            >
              <div className="cl-delivery-step-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-2 text-sm font-medium text-zinc-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
