'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import type { CopyData, ArchitectureScaleTarget } from '../data/types';

type GSAPStatic = typeof import('gsap').gsap;

function getRevealStyle(delay: number): CSSProperties {
  return { ['--reveal-delay' as string]: `${delay}ms` };
}

interface ArchitectureSectionProps {
  t: CopyData;
  reducedMotion: boolean;
}

/* ------------------------------------------------------------------ */
/*  Helpers: measure node positions relative to canvas, build paths   */
/* ------------------------------------------------------------------ */

interface Pt { x: number; y: number }

function bottomCenter(el: HTMLElement, canvas: HTMLElement): Pt {
  const er = el.getBoundingClientRect();
  const cr = canvas.getBoundingClientRect();
  return { x: er.left + er.width / 2 - cr.left, y: er.bottom - cr.top };
}

function topCenter(el: HTMLElement, canvas: HTMLElement): Pt {
  const er = el.getBoundingClientRect();
  const cr = canvas.getBoundingClientRect();
  return { x: er.left + er.width / 2 - cr.left, y: er.top - cr.top };
}

function center(el: HTMLElement, canvas: HTMLElement): Pt {
  const er = el.getBoundingClientRect();
  const cr = canvas.getBoundingClientRect();
  return {
    x: er.left + er.width / 2 - cr.left,
    y: er.top + er.height / 2 - cr.top,
  };
}

/** Straight line */
function line(a: Pt, b: Pt) {
  return `M${a.x} ${a.y} L${b.x} ${b.y}`;
}

/** Vertical-biased cubic bezier */
function curve(a: Pt, b: Pt) {
  const my = (a.y + b.y) / 2;
  return `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
}

/* ------------------------------------------------------------------ */

export function ArchitectureSection({ t, reducedMotion }: ArchitectureSectionProps) {
  const architectureRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isCompactViewport, setIsCompactViewport] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 1023px)');
    const onChange = () => setIsCompactViewport(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  /* ---------- draw / redraw SVG paths from live DOM positions ---------- */
  const drawPaths = useCallback(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!canvas || !svg) return;

    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    svg.setAttribute('viewBox', `0 0 ${cw} ${ch}`);

    const nodeMap: Record<string, HTMLElement> = {};
    canvas.querySelectorAll<HTMLElement>('[data-arch-node]').forEach(el => {
      const key = el.dataset.archKey;
      if (key) nodeMap[key] = el;
    });

    const scaleMap: Record<string, HTMLElement[]> = { vector: [], worker: [] };
    canvas.querySelectorAll<HTMLElement>('[data-arch-scale-node]').forEach(el => {
      const target = el.dataset.archScaleTarget as 'vector' | 'worker' | undefined;
      if (target) scaleMap[target].push(el);
    });

    // --- main links ---
    const mainPaths: string[] = [];
    const { frontend, backend, vector, pgsql, worker, scheduler } = nodeMap;

    if (frontend && backend) mainPaths.push(line(bottomCenter(frontend, canvas), topCenter(backend, canvas)));
    if (backend && vector)   mainPaths.push(curve(bottomCenter(backend, canvas), topCenter(vector, canvas)));
    if (backend && pgsql)    mainPaths.push(curve(bottomCenter(backend, canvas), topCenter(pgsql, canvas)));
    if (backend && worker)   mainPaths.push(curve(bottomCenter(backend, canvas), topCenter(worker, canvas)));
    if (scheduler && worker)  mainPaths.push(line(bottomCenter(scheduler, canvas), topCenter(worker, canvas)));
    if (scheduler && backend) mainPaths.push(curve(bottomCenter(scheduler, canvas), topCenter(backend, canvas)));

    // set paths on link elements
    const linkEls = svg.querySelectorAll<SVGPathElement>('.cl-arch-link');
    const streamEls = svg.querySelectorAll<SVGPathElement>('.cl-arch-stream');
    mainPaths.forEach((d, i) => {
      if (linkEls[i]) linkEls[i].setAttribute('d', d);
      if (streamEls[i]) streamEls[i].setAttribute('d', d);
    });

    // --- scale links ---
    const scaleLinkEls = svg.querySelectorAll<SVGPathElement>('.cl-arch-scale-link');
    const scaleStreamEls = svg.querySelectorAll<SVGPathElement>('.cl-arch-scale-stream');
    let si = 0;
    for (const target of ['vector', 'worker'] as const) {
      const parent = nodeMap[target];
      if (!parent) continue;
      const from = bottomCenter(parent, canvas);
      for (const child of scaleMap[target]) {
        const to = topCenter(child, canvas);
        const d = curve(from, to);
        if (scaleLinkEls[si]) scaleLinkEls[si].setAttribute('d', d);
        if (scaleStreamEls[si]) scaleStreamEls[si].setAttribute('d', d);
        si++;
      }
    }

    // --- pulses ---
    canvas.querySelectorAll<HTMLElement>('[data-arch-pulse]').forEach(el => {
      const target = el.dataset.archPulseTarget;
      const node = target ? nodeMap[target] : undefined;
      if (node) {
        const c = center(node, canvas);
        el.style.left = `${c.x}px`;
        el.style.top = `${c.y}px`;
      }
    });
  }, []);

  /* ---------- GSAP entrance animation ---------- */
  useEffect(() => {
    const architecture = architectureRef.current;
    if (!architecture || reducedMotion) return;

    let cancelled = false;
    let ctx: ReturnType<GSAPStatic['context']> | undefined;
    const expandQueue: { kill: () => void }[] = [];
    const hoverCleanup: Array<() => void> = [];

    const init = async () => {
      const [{ gsap: g }, { ScrollTrigger: ST }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      g.registerPlugin(ST);

      // initial draw so paths exist before animation
      drawPaths();

      ctx = g.context(() => {
        const nodes = g.utils.toArray<HTMLElement>('[data-arch-node]');
        const links = g.utils.toArray<SVGPathElement>('.cl-arch-link');
        const streams = g.utils.toArray<SVGPathElement>('.cl-arch-stream');
        const scaleNodes = g.utils.toArray<HTMLElement>('[data-arch-scale-node]');
        const scaleLinks = g.utils.toArray<SVGPathElement>('.cl-arch-scale-link');
        const scaleStreams = g.utils.toArray<SVGPathElement>('.cl-arch-scale-stream');
        const pulses = g.utils.toArray<HTMLElement>('[data-arch-pulse]');
        const clusterNodes = g.utils.toArray<HTMLElement>('[data-arch-cluster-target]');

        const applyClusterFocus = (target?: ArchitectureScaleTarget) => {
          if (target) {
            architecture.setAttribute('data-cluster-focus', target);
          } else {
            architecture.removeAttribute('data-cluster-focus');
          }
        };

        const clearExpandQueue = () => {
          for (const tween of expandQueue) tween.kill();
          expandQueue.length = 0;
        };
        const expandNodes = () => {
          clearExpandQueue();
          nodes.forEach((node, index) => {
            const tween = g.delayedCall(index * 0.12, () => node.classList.add('is-node-expanded'));
            expandQueue.push(tween);
          });
        };

        for (const link of [...links, ...scaleLinks]) {
          const length = link.getTotalLength();
          g.set(link, { strokeDasharray: length, strokeDashoffset: length, opacity: 0.35 });
        }

        g.set(nodes, { opacity: 0, y: 24, scale: 0.96 });
        g.set(scaleNodes, { opacity: 0, y: 20, scale: 0.92 });
        g.set(streams, { opacity: 0.12, strokeDashoffset: 0 });
        g.set(scaleStreams, { opacity: 0.08, strokeDashoffset: 0 });
        g.set(pulses, { opacity: 0, scale: 0.5 });

        const entrance = g.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: architecture,
            start: 'top 78%',
            end: 'bottom 38%',
            toggleActions: 'play none none reverse',
          },
        });

        entrance
          .to(architecture, { '--arch-glow': 1, duration: 0.65 }, 0)
          .to(
            nodes,
            { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.6 },
            0.08
          )
          .to(
            links,
            { strokeDashoffset: 0, opacity: 0.88, duration: 0.92, stagger: 0.07, ease: 'power2.inOut' },
            0.22
          )
          .to(
            scaleLinks,
            { strokeDashoffset: 0, opacity: 0.74, duration: 0.74, stagger: 0.05, ease: 'power2.inOut' },
            0.46
          )
          .to(streams, { opacity: 0.92, duration: 0.28 }, 0.86)
          .to(scaleStreams, { opacity: 0.8, duration: 0.28 }, 0.86)
          .to(
            scaleNodes,
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.52 },
            0.62
          )
          .to(pulses, { opacity: 0.9, scale: 1, duration: 0.48, stagger: 0.08 }, 0.9)
          .add(() => expandNodes(), 0.86);

        for (const node of clusterNodes) {
          const onEnter = (event: PointerEvent) => {
            const target = (event.currentTarget as HTMLElement).dataset.archClusterTarget as
              | ArchitectureScaleTarget
              | undefined;
            applyClusterFocus(target);
          };
          const onLeave = () => applyClusterFocus();
          node.addEventListener('pointerenter', onEnter);
          node.addEventListener('pointerleave', onLeave);
          hoverCleanup.push(() => {
            node.removeEventListener('pointerenter', onEnter);
            node.removeEventListener('pointerleave', onLeave);
          });
        }

        for (const node of scaleNodes) {
          const onEnter = (event: PointerEvent) => {
            const target = (event.currentTarget as HTMLElement).dataset.archScaleTarget as
              | ArchitectureScaleTarget
              | undefined;
            applyClusterFocus(target);
          };
          const onLeave = () => applyClusterFocus();
          node.addEventListener('pointerenter', onEnter);
          node.addEventListener('pointerleave', onLeave);
          hoverCleanup.push(() => {
            node.removeEventListener('pointerenter', onEnter);
            node.removeEventListener('pointerleave', onLeave);
          });
        }

        const onCanvasLeave = () => applyClusterFocus();
        architecture.addEventListener('pointerleave', onCanvasLeave);
        hoverCleanup.push(() => architecture.removeEventListener('pointerleave', onCanvasLeave));
      }, architecture);
    };

    init();

    return () => {
      cancelled = true;
      for (const tween of expandQueue) tween.kill();
      hoverCleanup.forEach(cleanup => cleanup());
      architecture.removeAttribute('data-cluster-focus');
      ctx?.revert();
    };
  }, [reducedMotion, drawPaths]);

  /* ---------- redraw on resize ---------- */
  useEffect(() => {
    const onResize = () => drawPaths();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [drawPaths]);

  /* ---------- connection definitions (just slot counts for SVG elements) ---------- */
  const mainLinkCount = 6;
  const scaleLinkCount = 6; // 3 vector + 3 worker

  return (
    <section id="architecture" className="mx-auto w-full max-w-7xl px-6 pb-24 pt-28 lg:px-12">
      <div data-reveal className="reveal-item" style={getRevealStyle(70)}>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t.architectureEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-zinc-100">{t.architectureTitle}</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">{t.architectureBody}</p>
      </div>

      <div
        className="mt-8 cl-architecture-shell"
        ref={architectureRef}
      >
        <div className="cl-architecture-canvas" ref={canvasRef}>
          <svg
            className="cl-arch-svg"
            ref={svgRef}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <g className="cl-arch-links">
              {Array.from({ length: mainLinkCount }, (_, i) => (
                <path key={i} className="cl-arch-link" d="M0 0" />
              ))}
            </g>
            <g className="cl-arch-scale-links">
              {Array.from({ length: scaleLinkCount }, (_, i) => {
                const target = i < 3 ? 'vector' : 'worker';
                return <path key={i} className="cl-arch-scale-link" data-arch-scale-target={target} d="M0 0" />;
              })}
            </g>
            <g className="cl-arch-streams">
              {Array.from({ length: mainLinkCount }, (_, i) => (
                <path key={i} className="cl-arch-stream" d="M0 0" />
              ))}
            </g>
            <g className="cl-arch-scale-streams">
              {Array.from({ length: scaleLinkCount }, (_, i) => {
                const target = i < 3 ? 'vector' : 'worker';
                return <path key={i} className="cl-arch-scale-stream" data-arch-scale-target={target} d="M0 0" />;
              })}
            </g>
          </svg>

          {t.architectureNodes.map(node => {
            const clusterTarget =
              node.key === 'vector' || node.key === 'worker'
                ? (node.key as ArchitectureScaleTarget)
                : undefined;

            return (
              <div
                key={node.key}
                data-arch-node
                data-arch-key={node.key}
                data-arch-cluster-target={clusterTarget}
                className={cn('cl-arch-node', `cl-arch-node-${node.key}`)}
              >
                <p className="cl-node-title">{node.title}</p>
                <p className="cl-node-text">{node.subtitle}</p>
                <p className="cl-node-meta">{node.meta}</p>
                <p data-arch-expand className="cl-node-expand">
                  {node.expansion}
                </p>
              </div>
            );
          })}

          <div
            className="cl-arch-scale-lane cl-arch-scale-lane-vector"
            style={{
              position: 'absolute',
              zIndex: 4,
              display: 'grid',
              gap: isCompactViewport ? '0.42rem' : '0.46rem',
              gridTemplateColumns: isCompactViewport ? '1fr' : 'repeat(3, minmax(0, 1fr))',
              width: isCompactViewport ? 'min(43%, 210px)' : 'min(36%, 360px)',
              left: isCompactViewport ? '4%' : '2%',
              bottom: isCompactViewport ? '2.2%' : '1.6%',
            }}
          >
            {t.architectureScaleNodes
              .filter(node => node.target === 'vector')
              .map(node => (
                <div
                  key={node.id}
                  data-arch-scale-node
                  data-arch-scale-target={node.target}
                  className={cn('cl-arch-scale-node', node.variant === 'add' ? 'cl-arch-scale-node-add' : null)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '0.74rem',
                    border: `1px ${node.variant === 'add' ? 'dashed' : 'solid'} ${
                      node.variant === 'add' ? 'rgba(166, 214, 255, 0.34)' : 'rgba(255, 255, 255, 0.11)'
                    }`,
                    background: node.variant === 'add' ? 'rgba(13, 20, 34, 0.82)' : 'rgba(10, 16, 27, 0.74)',
                    padding: isCompactViewport ? '0.42rem 0.48rem' : '0.44rem 0.5rem',
                  }}
                >
                  {node.variant === 'add' ? (
                    <span
                      className="cl-arch-scale-plus"
                      aria-hidden="true"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      +
                    </span>
                  ) : null}
                  <p className="cl-arch-scale-title" style={{ fontSize: '0.63rem', lineHeight: 1.2 }}>
                    {node.title}
                  </p>
                  <p className="cl-arch-scale-detail" style={{ fontSize: '0.62rem', lineHeight: 1.35 }}>
                    {node.detail}
                  </p>
                </div>
              ))}
          </div>

          <div
            className="cl-arch-scale-lane cl-arch-scale-lane-worker"
            style={{
              position: 'absolute',
              zIndex: 4,
              display: 'grid',
              gap: isCompactViewport ? '0.42rem' : '0.46rem',
              gridTemplateColumns: isCompactViewport ? '1fr' : 'repeat(3, minmax(0, 1fr))',
              width: isCompactViewport ? 'min(43%, 210px)' : 'min(36%, 360px)',
              right: isCompactViewport ? '4%' : '2%',
              bottom: isCompactViewport ? '2.2%' : '1.6%',
            }}
          >
            {t.architectureScaleNodes
              .filter(node => node.target === 'worker')
              .map(node => (
                <div
                  key={node.id}
                  data-arch-scale-node
                  data-arch-scale-target={node.target}
                  className={cn('cl-arch-scale-node', node.variant === 'add' ? 'cl-arch-scale-node-add' : null)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '0.74rem',
                    border: `1px ${node.variant === 'add' ? 'dashed' : 'solid'} ${
                      node.variant === 'add' ? 'rgba(166, 214, 255, 0.34)' : 'rgba(255, 255, 255, 0.11)'
                    }`,
                    background: node.variant === 'add' ? 'rgba(13, 20, 34, 0.82)' : 'rgba(10, 16, 27, 0.74)',
                    padding: isCompactViewport ? '0.42rem 0.48rem' : '0.44rem 0.5rem',
                  }}
                >
                  {node.variant === 'add' ? (
                    <span
                      className="cl-arch-scale-plus"
                      aria-hidden="true"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      +
                    </span>
                  ) : null}
                  <p className="cl-arch-scale-title" style={{ fontSize: '0.63rem', lineHeight: 1.2 }}>
                    {node.title}
                  </p>
                  <p className="cl-arch-scale-detail" style={{ fontSize: '0.62rem', lineHeight: 1.35 }}>
                    {node.detail}
                  </p>
                </div>
              ))}
          </div>

          <span data-arch-pulse data-arch-pulse-target="backend" className="cl-arch-pulse" />
          <span data-arch-pulse data-arch-pulse-target="vector" className="cl-arch-pulse" />
          <span data-arch-pulse data-arch-pulse-target="worker" className="cl-arch-pulse" />
        </div>
        <div className="cl-architecture-beam" aria-hidden="true" />
      </div>
    </section>
  );
}
