'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { CopyData } from '../data/types';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

interface RagSectionProps {
  t: CopyData;
}

export function RagSection({ t }: RagSectionProps) {
  return (
    <section id="rag" className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t.ragEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{t.ragTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">{t.ragSubtitle}</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {t.ragModes.map((mode, index) => (
          <article
            key={mode.badge}
            data-reveal
            data-glow
            className="reveal-item cl-rag-card"
            style={getRevealStyle(120 + index * 80)}
          >
            {mode.image && (
              <div className="cl-rag-card-image">
                <Image
                  src={mode.image}
                  alt={mode.imageAlt ?? mode.title}
                  width={560}
                  height={280}
                  className="w-full rounded-lg"
                />
              </div>
            )}
            <span className="cl-chip">{mode.badge}</span>
            <h3 className="mt-3 text-lg font-medium text-zinc-100">{mode.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{mode.summary}</p>
            <ul className="mt-4 space-y-2">
              {mode.points.map(point => (
                <li key={point} className="cl-capability-highlight">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
