'use client';

import type { CSSProperties } from 'react';
import type { Locale, CopyData } from '../data/types';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

interface AdvantagesSectionProps {
  locale: Locale;
  t: CopyData;
}

export function AdvantagesSection({ locale, t }: AdvantagesSectionProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t.advantagesEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{t.advantagesTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">{t.advantagesSubtitle}</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {t.advantages.map((advantage, index) => (
          <article
            key={advantage.title}
            data-reveal
            data-glow
            className="reveal-item cl-advantage-card relative overflow-hidden"
            style={getRevealStyle(120 + index * 70)}
          >
            <span className="cl-number-decoration cl-number-decoration-lg" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="relative z-[1]">
              <h3 className="mt-3 text-lg font-medium text-zinc-100">{advantage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{advantage.description}</p>
              <p className="mt-4 border-l-2 border-zinc-600 pl-3 text-xs uppercase tracking-[0.12em] text-zinc-400">
                {advantage.proof}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
