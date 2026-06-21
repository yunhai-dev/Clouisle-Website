'use client';

import type { CSSProperties } from 'react';
import { Sparkles, ShieldCheck, Layers } from 'lucide-react';
import type { CopyData } from '@/components/marketing/data/types';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

const BADGE_META: Record<
  NonNullable<CopyData['comparison']['rows'][number]['badge']>,
  { label: { en: string; zh: string }; Icon: typeof Sparkles }
> = {
  recommended: {
    label: { en: 'Recommended for you', zh: '推荐能力' },
    Icon: Sparkles,
  },
  enterprise: {
    label: { en: 'Enterprise-ready', zh: '企业就绪' },
    Icon: ShieldCheck,
  },
  different: {
    label: { en: 'Differentiated', zh: '差异化' },
    Icon: Layers,
  },
};

interface ComparisonSectionProps {
  t: CopyData;
  locale?: 'en' | 'zh';
}

export function ComparisonSection({ t, locale = 'en' }: ComparisonSectionProps) {
  const { comparison } = t;

  return (
    <section
      id="comparison"
      className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 pb-10 pt-10 lg:px-12"
    >
      <div data-reveal className="reveal-item shrink-0" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{comparison.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{comparison.title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">{comparison.subtitle}</p>
      </div>

      <div
        className="mt-5 min-h-0 flex-1 overflow-auto rounded-2xl border border-white/10"
        style={{ background: 'linear-gradient(180deg, rgba(14,18,26,0.82), rgba(8,12,20,0.92))' }}
      >
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10" style={{ background: 'rgba(10,14,22,0.96)', backdropFilter: 'blur(8px)' }}>
            <tr className="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-zinc-400">
              <th className="w-[26%] px-5 py-3.5 align-bottom font-medium">{comparison.columns.scenario}</th>
              <th
                className="w-[37%] px-5 py-3.5 align-bottom font-medium"
                style={{ color: 'rgba(207, 226, 255, 0.95)' }}
              >
                {comparison.columns.clouisle}
              </th>
              <th className="w-[37%] px-5 py-3.5 align-bottom font-medium">{comparison.columns.others}</th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row, i) => {
              const Badge = row.badge ? BADGE_META[row.badge] : null;
              return (
                <tr
                  key={row.scenario}
                  data-reveal
                  className="reveal-item border-b border-white/5 align-top last:border-b-0"
                  style={{
                    ...getRevealStyle(120 + i * 50),
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  }}
                >
                  <td className="px-5 py-4">
                    <p className="text-zinc-100">{row.scenario}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{row.pain}</p>
                  </td>
                  <td
                    className="px-5 py-4 text-zinc-100"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(133, 191, 255, 0.08), rgba(133, 191, 255, 0))',
                      borderLeft: '1px solid rgba(133, 191, 255, 0.18)',
                    }}
                  >
                    <p className="leading-relaxed">{row.clouisle}</p>
                    {Badge ? (
                      <span
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.1em]"
                        style={{
                          background: 'rgba(133, 191, 255, 0.12)',
                          color: 'rgba(207, 226, 255, 0.95)',
                          border: '1px solid rgba(133, 191, 255, 0.28)',
                        }}
                      >
                        <Badge.Icon size={11} />
                        {Badge.label[locale]}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-zinc-400">
                    <p className="leading-relaxed">{row.others}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {comparison.note ? (
        <p className="mt-3 shrink-0 text-xs text-zinc-500">{comparison.note}</p>
      ) : null}
    </section>
  );
}