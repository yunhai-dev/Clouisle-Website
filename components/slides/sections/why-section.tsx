'use client';

import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Locale, CopyData } from '@/components/marketing/data/types';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

const flow: Record<Locale, { label: string; subs: string[]; rgb: string }[]> = {
  zh: [
    { label: '碎片化数据', subs: ['PDF · DOCX · XLSX', '数据库 · API', '业务系统'], rgb: '161,161,170' },
    { label: '知识层', subs: ['解析与向量索引', 'Naive + Agentic RAG', '权限隔离存储'], rgb: '6,182,212' },
    { label: 'Agent 层', subs: ['知识 · 工具 · MCP', '多模型路由', '会话生命周期'], rgb: '139,92,246' },
    { label: '执行层', subs: ['15+ 节点工作流', '多触发器编排', '外部系统对接'], rgb: '16,185,129' },
    { label: '业务落地', subs: ['审批 · 通知', '数据写入', '流程自动化'], rgb: '245,158,11' },
  ],
  en: [
    { label: 'Fragmented Data', subs: ['PDF · DOCX · XLSX', 'Databases · APIs', 'Business Systems'], rgb: '161,161,170' },
    { label: 'Knowledge Layer', subs: ['Parse & vector index', 'Naive + Agentic RAG', 'Permission-scoped'], rgb: '6,182,212' },
    { label: 'Agent Layer', subs: ['Knowledge · Tools · MCP', 'Multi-model routing', 'Conversation lifecycle'], rgb: '139,92,246' },
    { label: 'Execution Layer', subs: ['15+ node workflows', 'Multi-trigger', 'External API bridge'], rgb: '16,185,129' },
    { label: 'Business Action', subs: ['Approvals · Alerts', 'Data writes', 'Process automation'], rgb: '245,158,11' },
  ],
};

interface WhySectionProps {
  locale: Locale;
  t: CopyData;
}

export function WhySection({ locale, t }: WhySectionProps) {
  const stages = flow[locale];
  return (
    <section className="cl-why-section mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-12">
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

      <div data-reveal className="reveal-item mt-10" style={getRevealStyle(420)}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}>
          {stages.map((stage, i) => (
            <Fragment key={stage.label}>
              <div style={{
                flex: 1,
                background: `rgba(${stage.rgb},0.08)`,
                border: `1px solid rgba(${stage.rgb},0.28)`,
                borderRadius: '0.75rem',
                padding: '1rem 1.25rem',
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: `rgb(${stage.rgb})`, marginBottom: '0.5rem' }}>
                  {stage.label}
                </div>
                {stage.subs.map(sub => (
                  <div key={sub} style={{ fontSize: '0.72rem', color: 'rgba(228,228,231,0.65)', lineHeight: 1.7 }}>
                    {sub}
                  </div>
                ))}
              </div>
              {i < stages.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(161,161,170,0.35)', flexShrink: 0 }}>
                  <ChevronRight size={16} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
