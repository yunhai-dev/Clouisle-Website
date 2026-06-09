'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { CopyData } from '../data/types';
import { providers } from '../data/providers';
import { useCounter } from '../hooks/use-counter';
import { useMagnetic } from '../hooks/use-magnetic';

type GSAPStatic = typeof import('gsap').gsap;

interface HeroSectionProps {
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

export function HeroSection({ t, reducedMotion }: HeroSectionProps) {
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
        const spotlight = hero.querySelector('.cl-hero-spotlight');
        const vignette = hero.querySelector('.cl-hero-vignette');
        const copy = hero.querySelector('.cl-hero-copy');
        const badge = hero.querySelector('.cl-hero-badge');
        const title = hero.querySelector('.cl-hero-title-wrap');
        const subtitle = hero.querySelector('.cl-hero-subtitle');
        const body = hero.querySelector('.cl-hero-body');
        const ctas = hero.querySelector('.cl-hero-cta-row');
        const banner = hero.querySelector('.cl-hero-banner-wrap');
        const stats = hero.querySelector('.cl-hero-stats');
        const trust = hero.querySelector('.cl-hero-trust');

        const tl = g.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        if (spotlight) tl.to(spotlight, { y: -90, scale: 1.14, opacity: 0.28, ease: 'none' }, 0);
        if (vignette) tl.to(vignette, { opacity: 0.92, ease: 'none' }, 0);
        if (orbOne) tl.to(orbOne, { y: 150, x: 24, ease: 'none' }, 0);
        if (orbTwo) tl.to(orbTwo, { y: -92, x: -18, ease: 'none' }, 0);
        if (arc) tl.to(arc, { y: 78, opacity: 0.08, ease: 'none' }, 0);
        if (grid) tl.to(grid, { y: 36, opacity: 0.04, ease: 'none' }, 0);
        if (copy) tl.to(copy, { y: 34, opacity: 0.96, ease: 'none' }, 0);
        if (badge) tl.to(badge, { y: 18, opacity: 0.84, ease: 'none' }, 0);
        if (title) tl.to(title, { y: 54, scale: 0.978, ease: 'none' }, 0);
        if (subtitle) tl.to(subtitle, { y: 72, opacity: 0.78, ease: 'none' }, 0);
        if (body) tl.to(body, { y: 92, opacity: 0.64, ease: 'none' }, 0);
        if (ctas) tl.to(ctas, { y: 110, opacity: 0.56, ease: 'none' }, 0);
        if (banner) tl.to(banner, { y: 138, scale: 1.06, ease: 'none' }, 0);
        if (stats) tl.to(stats, { y: 96, opacity: 0.66, ease: 'none' }, 0);
        if (trust) tl.to(trust, { y: 62, opacity: 0.5, ease: 'none' }, 0);

        // Banner tilt: separate ScrollTrigger tied to the banner element itself
        const bannerGlass = hero.querySelector('.cl-hero-banner-glass');
        if (bannerGlass) {
          g.to(bannerGlass, {
            rotateX: 2,
            y: -18,
            scale: 1.02,
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
      <div className="cl-hero-vignette" aria-hidden="true" />
      <div className="cl-hero-spotlight" aria-hidden="true" />
      <div className="cl-grid-overlay" aria-hidden="true" />
      <div className="cl-orb cl-orb-one" aria-hidden="true" />
      <div className="cl-orb cl-orb-two" aria-hidden="true" />
      <div className="cl-arc" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-32 pt-48 text-center lg:px-12">
        <div className="cl-hero-copy flex flex-col items-center">
          <div className="cl-release-announcement w-full max-w-4xl">
            <div className="cl-release-announcement-header">
              <span className="cl-release-eyebrow">{t.releaseAnnouncement.eyebrow}</span>
              <span className="cl-release-dot" aria-hidden="true" />
              <span>{t.releaseAnnouncement.items[0]}</span>
            </div>
            <p className="cl-release-title mt-3">
              {t.releaseAnnouncement.title}
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {t.releaseAnnouncement.body}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {t.releaseAnnouncement.items.slice(1).map(item => (
                <span key={item} className="cl-release-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="cl-hero-title-wrap">
            <h1 className="cl-gradient-heading mt-8 text-5xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl xl:text-8xl">
              {t.title}
            </h1>
          </div>
          <p className="cl-hero-subtitle mt-4 text-2xl font-medium text-zinc-300 sm:text-3xl lg:text-4xl">
            {t.titleSub}
          </p>

          <p className="cl-hero-body mt-7 max-w-3xl text-lg leading-relaxed text-zinc-400">
            {t.subtitle}
          </p>

          <div className="cl-hero-cta-row mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://app.clouisle.asia"
              className="cl-btn-primary cl-magnetic"
              ref={magneticPrimaryRef as React.Ref<HTMLAnchorElement>}
            >
              {t.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/clouisle/Clouisle/releases/tag/v0.2.9"
              target="_blank"
              rel="noopener noreferrer"
              className="cl-btn-secondary cl-magnetic"
              ref={magneticSecondaryRef as React.Ref<HTMLAnchorElement>}
            >
              <ExternalLink className="h-4 w-4" />
              {t.secondaryCta}
            </a>
          </div>

          {/* Product hero screenshot */}
          {t.heroImage && (
            <div className="cl-hero-banner cl-hero-banner-wrap mt-14 w-full max-w-5xl">
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

          <div className="cl-hero-stats mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
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

      <div data-reveal className="reveal-item cl-hero-trust mx-auto w-full max-w-7xl px-6 pb-8 lg:px-12">
        <div data-glow className="cl-trust-strip">
          <p className="text-center text-xs uppercase tracking-[0.16em] text-zinc-400">{t.trustLine}</p>
          <div className="cl-provider-marquee" aria-hidden="true">
            <div ref={marqueeRef} className="cl-provider-track">
              {tripleProviders.map((provider, index) => {
                const Icon = provider.icon;

                return (
                  <span key={`${provider.name}-${index}`} className="cl-provider-pill">
                    <span className="cl-provider-pill-icon" aria-hidden="true">
                      <Icon size={16} />
                    </span>
                    <span>{provider.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
