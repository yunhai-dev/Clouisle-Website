'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale, CopyData, Capability } from '../data/types';
import { capabilities } from '../data/capabilities';

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

const bentoSpans = [
  'md:col-span-4',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-4',
  'md:col-span-3',
  'md:col-span-3',
];

const isLargeCard = (index: number) => index === 0 || index === 3;

interface CapabilitiesSectionProps {
  locale: Locale;
  t: CopyData;
}

/** Normalize previewImage to always be an array */
function getImages(item: Capability): string[] {
  if (!item.previewImage) return [];
  return Array.isArray(item.previewImage) ? item.previewImage : [item.previewImage];
}

function getAlt(item: Capability, index: number): string {
  if (!item.previewImageAlt) return item.previewTitle;
  if (Array.isArray(item.previewImageAlt)) return item.previewImageAlt[index] ?? item.previewTitle;
  return item.previewImageAlt;
}

/** Carousel for multiple images, static for single */
function MediaCarousel({ images, item }: { images: string[]; item: Capability }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    clearTimer();
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
  }, [images.length, clearTimer]);

  useEffect(() => {
    resetTimer();
    return clearTimer;
  }, [resetTimer, clearTimer]);

  if (images.length === 0) return null;

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={getAlt(item, i)}
          fill
          className={cn('cl-carousel-slide', i === current && 'is-active')}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 70vw, 92vw"
        />
      ))}
      <div className="cl-capability-media-image-mask" aria-hidden="true" />
      {images.length > 1 && (
        <div className="cl-carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              className={cn('cl-carousel-dot', i === current && 'is-active')}
              onClick={() => {
                setCurrent(i);
                resetTimer();
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

function BentoCard({ item, index }: { item: Capability; index: number }) {
  const Icon = item.icon;
  const large = isLargeCard(index);
  const images = getImages(item);
  const hasImages = images.length > 0;

  return (
    <article
      data-reveal
      data-glow="interactive"
      className={cn(
        'reveal-item cl-capability-card',
        bentoSpans[index],
        large ? 'cl-bento-lg' : 'cl-bento-sm'
      )}
      style={getRevealStyle(120 + index * 60)}
    >
      <div className="cl-capability-content">
        <div className="flex items-center justify-between">
          <span className="cl-chip">{item.tag}</span>
          <Icon className="h-4 w-4 text-zinc-300" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-zinc-100">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
        {large && (
          <ul className="mt-4 space-y-2">
            {item.highlights.map(highlight => (
              <li key={highlight} className="cl-capability-highlight">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {large && (
        <div className="cl-capability-media-wrap">
          <div className={cn('cl-capability-media', `cl-capability-media-${item.previewTone}`)}>
            {hasImages ? (
              <MediaCarousel images={images} item={item} />
            ) : (
              <>
                <div className="cl-capability-media-grid" aria-hidden="true" />
                <div className="cl-capability-media-head">
                  <span>{item.previewTitle}</span>
                  <span>{item.previewMeta}</span>
                </div>
                <div className="cl-capability-media-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cl-capability-media-metric">{item.previewMetric}</div>
              </>
            )}
          </div>
        </div>
      )}

      {!large && hasImages && (
        <div className="cl-capability-media-compact">
          <MediaCarousel images={images} item={item} />
        </div>
      )}
    </article>
  );
}

export function CapabilitiesSection({ locale, t }: CapabilitiesSectionProps) {
  const capabilityItems = capabilities[locale];

  return (
    <section id="platform" className="mx-auto w-full max-w-7xl px-6 pb-24 pt-28 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(60)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Capabilities</p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{t.capabilitiesTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">{t.capabilitiesLead}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6">
        {capabilityItems.map((item, index) => (
          <BentoCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
