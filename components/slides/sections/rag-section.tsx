'use client';

import { Fragment } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { CopyData, Locale } from '@/components/marketing/data/types';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

const flows: Record<Locale, { naive: string[]; agentic: string[] }> = {
  zh: {
    naive: ['用户查询', '向量检索', '上下文注入', 'LLM 生成', '答案 + 引用'],
    agentic: ['用户查询', '任务拆解', '多轮检索', '工具调用', '交叉验证', '综合输出'],
  },
  en: {
    naive: ['User Query', 'Vector Retrieval', 'Context Injection', 'LLM Generation', 'Answer + Citation'],
    agentic: ['User Query', 'Task Planning', 'Multi-step Retrieval', 'Tool Invocation', 'Cross Verification', 'Synthesized Output'],
  },
};

function FlowDiagram({ steps, rgb, loop }: { steps: string[]; rgb: string; loop?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: 1, gap: '4px' }}>
      {steps.map((step, i) => (
        <Fragment key={step}>
          <div style={{
            flex: 1,
            background: `rgba(${rgb},0.1)`,
            border: `1px solid rgba(${rgb},0.3)`,
            borderRadius: '0.5rem',
            padding: '0.5rem 0.75rem',
            fontSize: '0.78rem',
            fontWeight: 500,
            color: `rgb(${rgb})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}>
            {step}
          </div>
          {i < steps.length - 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
              {loop && i === 2
                ? <RefreshCw size={12} style={{ color: `rgba(${rgb},0.5)` }} />
                : <ChevronDown size={12} style={{ color: `rgba(${rgb},0.4)` }} />
              }
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

interface RagSectionProps {
  t: CopyData;
  locale?: Locale;
}

export function RagSection({ t, locale = 'en' }: RagSectionProps) {
  const f = flows[locale];
  return (
    <section id="rag" className="cl-rag-section mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t.ragEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{t.ragTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">{t.ragSubtitle}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {t.ragModes.map((mode, index) => (
          <article key={mode.badge} data-reveal data-glow className="reveal-item cl-rag-card" style={getRevealStyle(120 + index * 80)}>
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

      <div data-reveal className="reveal-item mt-6" style={{ ...getRevealStyle(340), flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1, minHeight: 0 }}>
          {([
            { label: 'Naive RAG', steps: f.naive, rgb: '6,182,212', loop: false },
            { label: 'Agentic RAG', steps: f.agentic, rgb: '139,92,246', loop: true },
          ] as const).map(({ label, steps, rgb, loop }) => (
            <div key={label} style={{
              background: `rgba(${rgb},0.05)`,
              border: `1px solid rgba(${rgb},0.2)`,
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: `rgb(${rgb})`, marginBottom: '0.75rem', flexShrink: 0 }}>{label}</div>
              <FlowDiagram steps={steps} rgb={rgb} loop={loop} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
