'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { BrainCircuit, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { CopyData, Locale } from '../data/types';

type GSAPStatic = typeof import('gsap').gsap;

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

const memoryIcons = [BrainCircuit, ShieldCheck];

const memoryPreview = {
  en: {
    badge: 'Memory UI Preview',
    image: '/images/Memory.webp',
    alt: 'Clouisle memory graph interface preview',
  },
  zh: {
    badge: '记忆界面预览',
    image: '/images/Memory.webp',
    alt: '云屿记忆图谱界面预览',
  },
} satisfies Record<
  Locale,
  {
    badge: string;
    image: string;
    alt: string;
  }
>;

interface MemorySectionProps {
  locale: Locale;
  reducedMotion: boolean;
  t: CopyData;
}

export function MemorySection({ locale, reducedMotion, t }: MemorySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const preview = memoryPreview[locale];

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
        const aura = section.querySelector('.cl-memory-preview-aura');
        const frame = section.querySelector('.cl-memory-preview-frame');
        const image = section.querySelector('.cl-memory-preview-image');
        const cards = g.utils.toArray<HTMLElement>('.cl-memory-card');

        const timeline = g.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        if (aura) timeline.to(aura, { y: -40, scale: 1.1, opacity: 0.85, ease: 'none' }, 0);
        if (frame) timeline.to(frame, { y: -8, scale: 1.005, rotateX: -1, ease: 'none' }, 0);
        if (image) timeline.to(image, { scale: 1.08, ease: 'none' }, 0);
        if (cards.length > 0) {
          timeline.to(cards, { y: 12, opacity: 0.96, stagger: 0.05, ease: 'none' }, 0);
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
    <section ref={sectionRef} id="memory" className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t.memoryEyebrow}</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-zinc-100 lg:text-4xl">{t.memoryTitle}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 lg:text-base">{t.memoryBody}</p>
      </div>

      <div
        data-reveal
        className="reveal-item mt-10"
        style={getRevealStyle(120)}
      >
        <div className="cl-memory-preview-container">
          <div className="cl-memory-preview-aura" aria-hidden="true" />
          <div className="cl-memory-preview-content">
            <span className="cl-memory-preview-badge">{preview.badge}</span>
            <div className="cl-memory-preview-frame">
              <Image
                src={preview.image}
                alt={preview.alt}
                fill
                sizes="(min-width: 1024px) 80vw, 92vw"
                className="cl-memory-preview-image"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:gap-6">
        {t.memoryCards.map((card, index) => {
          const Icon = memoryIcons[index];

          return (
            <article
              key={card.label}
              data-reveal
              data-glow="interactive"
              className="reveal-item cl-rag-card cl-memory-card"
              style={getRevealStyle(180 + index * 60)}
            >
              <div className="relative z-[1]">
                <div className="flex items-start justify-between gap-4">
                  <span className="cl-chip">{card.label}</span>
                  <span className="cl-memory-card-icon" aria-hidden="true">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-medium text-zinc-100 lg:text-xl">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300/90 lg:text-[0.9375rem]">{card.summary}</p>

                <ul className="mt-6 space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="cl-memory-list-item">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
