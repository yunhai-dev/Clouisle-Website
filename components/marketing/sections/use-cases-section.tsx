'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Locale, CopyData } from '../data/types';
import { useCases } from '../data/use-cases';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

interface UseCasesSectionProps {
  locale: Locale;
  t: CopyData;
}

export function UseCasesSection({ locale, t }: UseCasesSectionProps) {
  const caseItems = useCases[locale];

  return (
    <section id="use-cases" className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t.useCaseEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{t.useCaseTitle}</h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {caseItems.map((item, index) => (
          <article
            key={item.title}
            data-reveal
            data-glow
            className="reveal-item cl-usecase-card"
            style={getRevealStyle(110 + index * 70)}
          >
            {item.image && (
              <div className="cl-usecase-card-image">
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  width={560}
                  height={280}
                  className="w-full rounded-lg"
                />
              </div>
            )}
            <h3 className="text-lg font-medium text-zinc-100">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
