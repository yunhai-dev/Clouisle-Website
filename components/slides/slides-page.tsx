'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { copy } from '@/components/marketing/data/copy';
import type { Locale } from '@/components/marketing/data/types';
import { HeroSection } from './sections/hero-section';
import { WhySection } from './sections/why-section';
import { CapabilitiesSection } from './sections/capabilities-section';
import { MemorySection } from './sections/memory-section';
import { RagSection } from './sections/rag-section';
import { AdvantagesSection } from './sections/advantages-section';
import { DeliverySection } from './sections/delivery-section';
import { ArchitectureSection } from './sections/architecture-section';
import { SecuritySection } from './sections/security-section';
import { UseCasesSection } from './sections/use-cases-section';
import { ComparisonSection } from './sections/comparison-section';

export function SlidesPage({ lang }: { lang: string }) {
  const locale: Locale = lang === 'zh' ? 'zh' : 'en';
  const t = copy[locale];
  const [current, setCurrent] = useState(0);

  const slides = [
    { label: locale === 'zh' ? '产品介绍' : 'Hero', node: <HeroSection t={t} reducedMotion /> },
    { label: locale === 'zh' ? '为什么选择云屿' : 'Why Clouisle', node: <WhySection locale={locale} t={t} /> },
    { label: locale === 'zh' ? 'Agent 管理' : 'Agents', node: <CapabilitiesSection locale={locale} t={t} cardIndex={0} /> },
    { label: locale === 'zh' ? '工作流编排' : 'Workflows', node: <CapabilitiesSection locale={locale} t={t} cardIndex={1} /> },
    { label: locale === 'zh' ? '知识库' : 'Knowledge', node: <CapabilitiesSection locale={locale} t={t} cardIndex={2} /> },
    { label: locale === 'zh' ? '安全治理' : 'Security', node: <CapabilitiesSection locale={locale} t={t} cardIndex={3} /> },
    { label: locale === 'zh' ? 'MCP 集成' : 'MCP', node: <CapabilitiesSection locale={locale} t={t} cardIndex={4} /> },
    { label: locale === 'zh' ? '可观测性' : 'Visibility', node: <CapabilitiesSection locale={locale} t={t} cardIndex={5} /> },
    { label: locale === 'zh' ? '全局记忆' : 'Memory', node: <MemorySection locale={locale} reducedMotion t={t} /> },
    { label: locale === 'zh' ? '知识检索' : 'RAG', node: <RagSection t={t} locale={locale} /> },
    { label: locale === 'zh' ? '平台优势' : 'Advantages', node: <AdvantagesSection locale={locale} t={t} /> },
    { label: locale === 'zh' ? '交付周期' : 'Delivery', node: <DeliverySection t={t} reducedMotion /> },
    { label: locale === 'zh' ? '系统架构' : 'Architecture', node: <ArchitectureSection locale={locale} t={t} reducedMotion /> },
    { label: locale === 'zh' ? '安全与部署' : 'Security', node: <SecuritySection t={t} /> },
    { label: locale === 'zh' ? '应用场景' : 'Use Cases', node: <UseCasesSection locale={locale} t={t} /> },
    { label: locale === 'zh' ? '竞品对比' : 'Comparison', node: <ComparisonSection t={t} /> },
  ];

  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);
  const next = useCallback(() => setCurrent(c => Math.min(c + 1, slides.length - 1)), [slides.length]);

  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 80);
    return () => clearTimeout(t);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  useEffect(() => {
    const slide = document.querySelector('.slide-enter') as HTMLElement | null;
    if (!slide) return;

    // data-reveal marks the right granularity in every section.
    // Hero is the exception — its main content has no data-reveal, so add it explicitly.
    const revealEls = Array.from(slide.querySelectorAll('[data-reveal]')) as HTMLElement[];
    const heroCopy = Array.from(slide.querySelectorAll('.cl-hero-copy > *')) as HTMLElement[];

    const raw = heroCopy.length > 0
      ? [...heroCopy, ...revealEls.filter(el => !el.closest('.cl-hero-copy'))]
      : revealEls;

    const targets = raw
      .filter(el => el.getBoundingClientRect().height > 0)      // skip hidden
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
      .slice(0, 20);

    targets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'none';
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 60 + i * 100);
    });

    return () => targets.forEach(el => {
      el.style.opacity = el.style.transform = el.style.transition = '';
    });
  }, [current]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0a0a', overflow: 'hidden' }}>
      {/* force reveal-items and hero min-height in slide context */}
      <style>{`
        @keyframes slide-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .slides-content .reveal-item { opacity: 1 !important; transform: none !important; }
        .slides-content .pt-48, .slides-content .pt-32, .slides-content .pt-28,
        .slides-content .pt-24, .slides-content .pt-20 { padding-top: 2rem !important; }
        .slides-content .pb-32, .slides-content .pb-24,
        .slides-content .pb-20, .slides-content .pb-16 { padding-bottom: 1.5rem !important; }
        .slides-content .mt-14, .slides-content .mt-12 { margin-top: 1.5rem !important; }
        .slides-content .mt-10, .slides-content .mt-8 { margin-top: 1rem !important; }
        .slides-content section#platform { height: 100%; display: flex; flex-direction: column; }
        .slides-content .cl-why-section { height: 100%; display: flex !important; flex-direction: column; justify-content: space-evenly; }
        .slides-content .cl-rag-section { height: 100%; display: flex !important; flex-direction: column; }
        .slides-content .cl-advantages-section { height: 100%; display: flex !important; flex-direction: column; }
        .slides-content .cl-delivery-section { height: 100%; display: flex !important; flex-direction: column; }
        .slides-content .cl-architecture-section { height: 100%; display: flex; flex-direction: column; padding-top: 2rem; padding-bottom: 1.5rem; }
        .slides-content section#platform > div:last-child { flex: 1; min-height: 0; grid-auto-rows: 1fr; }
        .slides-content .cl-bento-lg { display: flex !important; flex-direction: column; align-items: stretch; height: 100%; min-height: 0; }
        .slides-content .cl-bento-lg .cl-capability-content { flex-shrink: 0; }
        .slides-content .cl-capability-media-wrap { flex: 1; min-height: 0; width: 100% !important; max-width: none !important; display: flex; flex-direction: column; }
        .slides-content .cl-carousel-slide { object-fit: contain !important; }
        .slides-content .cl-capability-media { flex: 1; min-height: 0; height: 100%; aspect-ratio: unset !important; }
        .slides-content .cl-capability-content p { font-size: 0.95rem !important; }
        .slides-content .cl-bento-lg .cl-capability-highlight { font-size: 0.875rem !important; }
        .slides-content .cl-capability-content > div:first-child { display: none; }
        .slides-content .cl-capability-content h3 { display: none; }
        .slides-content .cl-capability-content > p:first-of-type { margin-top: 0; text-align: left; }
        .slides-content .cl-bento-lg ul { display: flex; flex-wrap: wrap; gap: 0.35rem 1.25rem; margin-top: 0.75rem; }
        .slides-content section#memory { height: 100%; display: flex; flex-direction: column; }
        .slides-content section#memory > div:nth-child(1) { flex-shrink: 0; }
        .slides-content section#memory > div:nth-child(2) { flex: 1; min-height: 0; margin-top: 0.75rem !important; display: flex; flex-direction: column; }
        .slides-content .cl-memory-preview-container { flex: 1; min-height: 0; }
        .slides-content .cl-memory-preview-content { height: 100%; display: flex; flex-direction: column; }
        .slides-content .cl-memory-preview-frame { flex: 1; min-height: 0; aspect-ratio: unset !important; }
        .slides-content .cl-memory-preview-image { object-fit: contain !important; }
        .slides-content section#memory > div:nth-child(3) { display: none; }

        .slides-content .cl-architecture-section { height: 100%; display: flex; flex-direction: column; padding-top: 2rem; padding-bottom: 1.5rem; overflow: hidden; }
        .slides-content section#security { height: 100%; display: flex; flex-direction: column; justify-content: center; padding-top: 0 !important; }
        .slides-content section#security > div:first-child { text-align: left !important; }
        .slides-content section#security > div:first-child h2 { font-size: 2.25rem !important; }
        .slides-content section#security > div:last-child { margin-top: 1.5rem !important; }
        .slides-content section#use-cases { height: 100%; display: flex; flex-direction: column; justify-content: center; padding-top: 0 !important; }
        .slides-content section#use-cases > div:last-child { margin-top: 1.5rem !important; }
        .slides-content section#comparison { height: 100%; min-height: 0; }
        .slides-content section#security .cl-security-card p { font-size: 1rem !important; }

        .slides-content .cl-architecture-stage { flex: 1; min-height: 0; display: flex !important; flex-direction: column; overflow: hidden; }
        .slides-content .cl-architecture-copy-column { flex-shrink: 0; }
        .slides-content .cl-architecture-copy-shell { margin-bottom: 0 !important; }
        .slides-content .cl-architecture-visual-column { flex: 1; min-height: 0; display: flex; flex-direction: column; }
        .slides-content .cl-architecture-shell { flex: 1; min-height: 0; display: flex; flex-direction: column; position: relative !important; top: 0 !important; }
        .slides-content .cl-architecture-canvas { flex: 1; min-height: 0; height: unset !important; max-height: unset !important; padding-bottom: 0 !important; }
      `}</style>

      <div className="slides-content" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div key={current} className="slide-enter" style={{ width: '100%', height: '100%' }}>
          {slides[current].node}
        </div>
      </div>

      {/* Bottom navigation */}
      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 16, zIndex: 9999,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 999, padding: '8px 20px', backdropFilter: 'blur(16px)',
        color: 'white', fontSize: 13, userSelect: 'none',
      }}>
        <button onClick={prev} disabled={current === 0}
          style={{ opacity: current === 0 ? 0.25 : 1, background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 2, display: 'flex' }}>
          <ChevronLeft size={16} />
        </button>
        <span style={{ minWidth: 160, textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
          {slides[current].label} · {current + 1} / {slides.length}
        </span>
        <button onClick={next} disabled={current === slides.length - 1}
          style={{ opacity: current === slides.length - 1 ? 0.25 : 1, background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 2, display: 'flex' }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{
        position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999,
      }}>
        {slides.map((s, i) => (
          <button key={s.label} onClick={() => setCurrent(i)} title={s.label}
            style={{
              width: i === current ? 8 : 6, height: i === current ? 8 : 6,
              borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
              background: i === current ? 'white' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.2s',
            }} />
        ))}
      </div>
    </div>
  );
}
