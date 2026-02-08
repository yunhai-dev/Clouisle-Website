'use client';

import { useRef } from 'react';
import type { Locale, MarketingHomePageProps } from './data/types';
import { copy } from './data/copy';
import { useReducedMotionPreference } from './hooks/use-reduced-motion';
import { useRevealAnimation } from './hooks/use-reveal';
import { useCardGlow } from './hooks/use-card-glow';
import { HeroSection } from './sections/hero-section';
import { WhySection } from './sections/why-section';
import { CapabilitiesSection } from './sections/capabilities-section';
import { RagSection } from './sections/rag-section';
import { AdvantagesSection } from './sections/advantages-section';
import { DeliverySection } from './sections/delivery-section';
import { ArchitectureSection } from './sections/architecture-section';
import { SecuritySection } from './sections/security-section';
import { UseCasesSection } from './sections/use-cases-section';
import { FinalCtaSection } from './sections/final-cta-section';

export function MarketingHomePage({ lang }: MarketingHomePageProps) {
  const locale: Locale = lang === 'zh' ? 'zh' : 'en';
  const t = copy[locale];
  const reducedMotion = useReducedMotionPreference();
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useRevealAnimation(scopeRef);
  useCardGlow(scopeRef, reducedMotion);

  return (
    <div ref={scopeRef} className="cl-home-shell">
      <div className="cl-noise-overlay" aria-hidden="true" />

      <HeroSection locale={locale} t={t} reducedMotion={reducedMotion} />

      <WhySection locale={locale} t={t} />

      <CapabilitiesSection locale={locale} t={t} />

      <RagSection t={t} />

      <AdvantagesSection locale={locale} t={t} />

      <DeliverySection t={t} reducedMotion={reducedMotion} />

      <div className="cl-section-divider mx-auto max-w-7xl" />

      <ArchitectureSection t={t} reducedMotion={reducedMotion} />

      <SecuritySection t={t} />

      <UseCasesSection locale={locale} t={t} />

      <div className="cl-section-divider mx-auto max-w-7xl" />

      <FinalCtaSection locale={locale} t={t} reducedMotion={reducedMotion} />
    </div>
  );
}
