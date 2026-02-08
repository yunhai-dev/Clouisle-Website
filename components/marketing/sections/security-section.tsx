'use client';

import type { CSSProperties } from 'react';
import { Server, DatabaseZap, ShieldCheck, KeyRound, LockKeyhole, FileSearch, Route, Lock } from 'lucide-react';
import type { CopyData } from '../data/types';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

const securityIcons = [Server, DatabaseZap, ShieldCheck, KeyRound, LockKeyhole, FileSearch, Route, Lock];

interface SecuritySectionProps {
  t: CopyData;
}

export function SecuritySection({ t }: SecuritySectionProps) {
  return (
    <section id="security" className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div data-reveal className="reveal-item text-center" style={getRevealStyle(70)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t.securityEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{t.securityTitle}</h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.securityItems.map((item, index) => {
          const Icon = securityIcons[index] ?? ShieldCheck;
          return (
            <div
              key={item}
              data-reveal
              data-glow
              className="reveal-item cl-security-card"
              style={getRevealStyle(120 + index * 60)}
            >
              <Icon className="h-5 w-5 text-zinc-400" />
              <p className="mt-3 text-sm leading-relaxed text-zinc-200">{item}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
