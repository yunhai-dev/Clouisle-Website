'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import type { Locale, CopyData } from '../data/types';
import { providers } from '../data/providers';
import { useCounter } from '../hooks/use-counter';
import { useMagnetic } from '../hooks/use-magnetic';

type GSAPStatic = typeof import('gsap').gsap;

interface HeroSectionProps {
  locale: Locale;
  t: CopyData;
  reducedMotion: boolean;
}

function StatCounter({
  value,
  label,
  reducedMotion,
}: {
  value: string;
  label: string;
  reducedMotion: boolean;
}) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const counterRef = useCounter(value, reducedMotion);
  const isCountable = !!match;

  return (
    <div data-glow className="cl-stat-card text-center">
      <div className="cl-counter text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
        {isCountable ? (
          <span ref={counterRef}>0{match![2]}</span>
        ) : (
          <span>{value}</span>
        )}
      </div>
      <div className="mt-1.5 text-xs uppercase tracking-[0.14em] text-zinc-400">{label}</div>
    </div>
  );
}

export function HeroSection({ locale, t, reducedMotion }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const magneticPrimaryRef = useMagnetic(reducedMotion, 0.3);
  const magneticSecondaryRef = useMagnetic(reducedMotion, 0.25);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // Scroll-linked parallax for decorative elements
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || reducedMotion) return;

    let cancelled = false;
    let ctx: ReturnType<GSAPStatic['context']> | undefined;

    const init = async () => {
      const [{ gsap: g }, { ScrollTrigger: ST }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      g.registerPlugin(ST);

      ctx = g.context(() => {
        const orbOne = hero.querySelector('.cl-orb-one');
        const orbTwo = hero.querySelector('.cl-orb-two');
        const arc = hero.querySelector('.cl-arc');
        const grid = hero.querySelector('.cl-grid-overlay');

        const tl = g.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        if (orbOne) tl.to(orbOne, { y: 120, ease: 'none' }, 0);
        if (orbTwo) tl.to(orbTwo, { y: -80, ease: 'none' }, 0);
        if (arc) tl.to(arc, { y: 60, opacity: 0, ease: 'none' }, 0);
        if (grid) tl.to(grid, { opacity: 0, ease: 'none' }, 0);

        // Banner tilt: separate ScrollTrigger tied to the banner element itself
        const bannerGlass = hero.querySelector('.cl-hero-banner-glass');
        if (bannerGlass) {
          g.to(bannerGlass, {
            rotateX: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: bannerGlass,
              start: 'top 90%',
              end: 'top 25%',
              scrub: 0.6,
            },
          });
        }
      }, hero);
    };

    init();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reducedMotion]);

  // GSAP marquee
  useEffect(() => {
    const track = marqueeRef.current;
    if (!track || reducedMotion) return;

    let cancelled = false;
    let tween: ReturnType<GSAPStatic['to']> | undefined;

    const init = async () => {
      const { gsap: g } = await import('gsap');
      if (cancelled) return;

      tween = g.to(track, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });

      const parent = track.parentElement;
      if (parent) {
        parent.addEventListener('pointerenter', () => tween?.timeScale(0.3));
        parent.addEventListener('pointerleave', () =>
          g.to(tween!, { timeScale: 1, duration: 0.6, ease: 'power2.out' })
        );
      }
    };

    init();
    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [reducedMotion]);

  const tripleProviders = [...providers, ...providers, ...providers];

  return (
    <section ref={heroRef} className="cl-hero-section">
      <div className="cl-grid-overlay" aria-hidden="true" />
      <div className="cl-orb cl-orb-one" aria-hidden="true" />
      <div className="cl-orb cl-orb-two" aria-hidden="true" />
      <div className="cl-arc" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-32 pt-48 text-center lg:px-12">
        <div className="flex flex-col items-center">
          <span className="cl-badge">{t.badge}</span>

          <h1 className="cl-gradient-heading mt-8 text-5xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl xl:text-8xl">
            {t.title}
          </h1>
          <p className="mt-4 text-2xl font-medium text-zinc-300 sm:text-3xl lg:text-4xl">
            {t.titleSub}
          </p>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-zinc-400">
            {t.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://app.clouisle.asia"
              target="_blank"
              rel="noopener noreferrer"
              className="cl-btn-primary cl-magnetic"
              ref={magneticPrimaryRef as React.Ref<HTMLAnchorElement>}
            >
              {t.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/beta`}
              className="cl-btn-secondary cl-magnetic"
              ref={magneticSecondaryRef as React.Ref<HTMLAnchorElement>}
            >
              <Play className="h-4 w-4" />
              {t.secondaryCta}
            </Link>
          </div>

          {/* Product hero screenshot */}
          {t.heroImage && (
            <div className="cl-hero-banner mt-14 w-full max-w-5xl">
              <div className="cl-hero-banner-glass">
                <Image
                  src={t.heroImage}
                  alt={t.heroImageAlt ?? 'Clouisle platform'}
                  width={1200}
                  height={720}
                  className="w-full rounded-lg"
                  priority
                />
              </div>
            </div>
          )}

          <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {t.stats.map(item => (
              <StatCounter
                key={item.label}
                value={item.value}
                label={item.label}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>

      <div data-reveal className="reveal-item mx-auto w-full max-w-7xl px-6 pb-8 lg:px-12">
        <div data-glow className="cl-trust-strip">
          <p className="text-center text-xs uppercase tracking-[0.16em] text-zinc-400">{t.trustLine}</p>
          <div className="cl-provider-marquee" aria-hidden="true">
            <div ref={marqueeRef} className="cl-provider-track">
              {tripleProviders.map((provider, index) => (
                <span key={`${provider}-${index}`} className="cl-provider-pill">
                  {provider}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
