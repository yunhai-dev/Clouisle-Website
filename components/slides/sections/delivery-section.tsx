'use client';

import { CheckCircle2 } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { CopyData } from '@/components/marketing/data/types';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

const STEP_COLORS = [
  { rgb: '6,182,212' },
  { rgb: '139,92,246' },
  { rgb: '16,185,129' },
];

interface DeliverySectionProps {
  t: CopyData;
  reducedMotion: boolean;
}

export function DeliverySection({ t }: DeliverySectionProps) {
  return (
    <section className="cl-delivery-section mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">
          {t.deliveryTitle}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{t.deliveryTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">{t.deliverySubtitle}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3" style={{ flex: 1 }}>
        {t.deliverySteps.map((step, index) => {
          const { rgb } = STEP_COLORS[index];
          return (
            <div
              key={step.title}
              data-reveal
              data-glow
              className="reveal-item cl-delivery-step"
              style={{ ...getRevealStyle(120 + index * 80), background: `rgba(${rgb},0.04)`, borderColor: `rgba(${rgb},0.2)` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{
                  fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: `rgb(${rgb})`, background: `rgba(${rgb},0.1)`,
                  border: `1px solid rgba(${rgb},0.25)`, borderRadius: '999px', padding: '0.2rem 0.6rem',
                }}>
                  {step.duration}
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: `rgba(${rgb},0.15)`, lineHeight: 1 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-base font-semibold text-zinc-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.detail}</p>

              <ul className="mt-4 space-y-1.5">
                {step.outcomes.map(outcome => (
                  <li key={outcome} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', fontSize: '0.78rem', color: 'rgba(228,228,231,0.7)', lineHeight: 1.5 }}>
                    <CheckCircle2 size={12} style={{ color: `rgb(${rgb})`, flexShrink: 0, marginTop: '0.15rem' }} />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
