'use client';

import type { CSSProperties } from 'react';
import type { Locale, CopyData } from '../data/types';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

interface WhySectionProps {
  locale: Locale;
  t: CopyData;
}

export function WhySection({ locale, t }: WhySectionProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div data-reveal className="reveal-item" style={getRevealStyle(70)}>
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Why Clouisle</p>
          <h2 className="cl-gradient-heading-accent mt-4 text-4xl font-semibold leading-[1.12] lg:text-5xl">
            {t.whyTitle}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">{t.whyBody}</p>
        </div>

        <div className="flex flex-col gap-4">
          {t.whyPoints.map((point, index) => (
            <div
              key={point}
              data-reveal
              data-glow
              className="reveal-item cl-why-point relative pl-14"
              style={getRevealStyle(120 + index * 80)}
            >
              <span className="cl-number-decoration absolute left-3 top-2.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
