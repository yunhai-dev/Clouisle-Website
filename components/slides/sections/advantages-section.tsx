'use client';

import { Zap, Shield, Layers, BarChart3 } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Locale, CopyData } from '@/components/marketing/data/types';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

const CARD_COLORS = [
  { rgb: '6,182,212' },
  { rgb: '139,92,246' },
  { rgb: '16,185,129' },
  { rgb: '245,158,11' },
];

const ICONS = [Zap, Shield, Layers, BarChart3];

interface AdvantagesSectionProps {
  locale: Locale;
  t: CopyData;
}

export function AdvantagesSection({ locale, t }: AdvantagesSectionProps) {
  return (
    <section className="cl-advantages-section mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t.advantagesEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{t.advantagesTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">{t.advantagesSubtitle}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2" style={{ flex: 1 }}>
        {t.advantages.map((advantage, index) => {
          const { rgb } = CARD_COLORS[index];
          const Icon = ICONS[index];
          return (
            <article
              key={advantage.title}
              data-reveal
              data-glow
              className="reveal-item cl-advantage-card relative overflow-hidden"
              style={{ ...getRevealStyle(120 + index * 70), background: `rgba(${rgb},0.04)`, borderColor: `rgba(${rgb},0.2)` }}
            >
              <div className="relative z-[1]">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1, color: `rgb(${rgb})`, letterSpacing: '-0.02em' }}>
                      {advantage.metric}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: `rgba(${rgb},0.7)`, marginTop: '0.2rem' }}>
                      {advantage.metricLabel}
                    </div>
                  </div>
                  <div style={{ padding: '0.5rem', background: `rgba(${rgb},0.1)`, borderRadius: '0.5rem', border: `1px solid rgba(${rgb},0.2)` }}>
                    <Icon size={18} style={{ color: `rgb(${rgb})` }} />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-zinc-100">{advantage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{advantage.description}</p>
                <p className="mt-4 border-l-2 pl-3 text-xs uppercase tracking-[0.12em] text-zinc-500" style={{ borderColor: `rgba(${rgb},0.4)` }}>
                  {advantage.proof}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
