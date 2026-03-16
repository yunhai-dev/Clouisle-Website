'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface BrandLoaderProps {
  reducedMotion: boolean;
}

const PRIMARY_PATH_VARS = {
  ['--dur' as string]: '2.55s',
  ['--delay' as string]: '0s',
  ['--len' as string]: '2133.691650390625',
  ['--flow-start' as string]: '2133.691650390625',
  ['--segment' as string]: '240',
};

const SECONDARY_PATH_VARS = {
  ['--dur' as string]: '1.7s',
  ['--delay' as string]: '1.48s',
  ['--len' as string]: '394.45556640625',
  ['--flow-start' as string]: '394.45556640625',
  ['--segment' as string]: '150',
};

export function BrandLoader({ reducedMotion }: BrandLoaderProps) {
  const [phase, setPhase] = useState<'visible' | 'hiding' | 'hidden'>('visible');
  const [progress, setProgress] = useState(0);
  const [isPortalReady, setIsPortalReady] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsPortalReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'visible') return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let finished = false;
    const start = window.performance.now();
    const minDuration = reducedMotion ? 1200 : 4200;
    let intervalId: number | undefined;
    let finalizeId: number | undefined;
    let hideId: number | undefined;

    const render = (value: number) => {
      setProgress((current) => (value > current ? value : current));
    };

    const hide = () => {
      setPhase('hiding');
      hideId = window.setTimeout(() => {
        document.body.style.overflow = previousOverflow;
        setPhase('hidden');
      }, reducedMotion ? 220 : 1100);
    };

    const finish = () => {
      if (finished) return;
      finished = true;

      if (intervalId) window.clearInterval(intervalId);

      const remaining = Math.max(0, minDuration - (window.performance.now() - start));
      finalizeId = window.setTimeout(() => {
        let current = Math.max(90, Math.floor(progressRef.current));

        const endTimer = window.setInterval(() => {
          current += reducedMotion ? 8 : 2;

          if (current >= 100) {
            current = 100;
            window.clearInterval(endTimer);
            render(current);
            window.setTimeout(hide, reducedMotion ? 80 : 360);
            return;
          }

          render(current);
        }, reducedMotion ? 16 : 28);
      }, remaining);
    };

    if (reducedMotion) {
      render(88);
    } else {
      intervalId = window.setInterval(() => {
        setProgress((current) => {
          if (current < 74) return Math.min(current + Math.random() * 5.2, 74);
          if (current < 92) return Math.min(current + Math.random() * 1.25, 92);
          return current;
        });
      }, 140);
    }

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    const failSafeId = window.setTimeout(finish, reducedMotion ? 1800 : 6000);

    return () => {
      document.body.style.overflow = previousOverflow;
      if (intervalId) window.clearInterval(intervalId);
      if (finalizeId) window.clearTimeout(finalizeId);
      if (hideId) window.clearTimeout(hideId);
      if (failSafeId) window.clearTimeout(failSafeId);
      window.removeEventListener('load', finish);
    };
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== 'visible') return;

    const stage = stageRef.current;
    if (!stage) return;

    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      stage.style.transform = `translate(${x * 0.35}px, ${y * 0.35 - 6}px) scale(1.01)`;
    };

    const onLeave = () => {
      stage.style.transform = 'translate(0px, -6px) scale(1.01)';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [phase, reducedMotion]);

  if (phase === 'hidden') return null;

  const progressValue = Math.floor(progress);

  const loader = (
    <div
      ref={rootRef}
      className={`cl-loader${phase === 'hiding' ? ' is-hiding' : ''}`}
      aria-hidden="true"
    >
      <div className="cl-loader-inner">
        <div ref={stageRef} className="cl-loader-stage">
          <div className="cl-loader-core-glow" />
          <div className="cl-loader-scan-ring" />
          <div className="cl-loader-beam-glow" />
          <div className="cl-loader-beam" />

          <div className="cl-loader-logo-shell">
            <svg viewBox="0 0 440.245 436.811" xmlns="http://www.w3.org/2000/svg" fill="none">
              <defs>
                <linearGradient id="cl-loader-flow-main-gradient" x1="0" y1="0" x2="440" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="18%" stopColor="#ffffff" stopOpacity="0.05" />
                  <stop offset="40%" stopColor="#ffffff" stopOpacity="0.36" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="58%" stopColor="#d8e8ff" stopOpacity="0.95" />
                  <stop offset="72%" stopColor="#ffffff" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="cl-loader-flow-glow-gradient" x1="0" y1="0" x2="440" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="36%" stopColor="#8fb8ff" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.68" />
                  <stop offset="62%" stopColor="#7aa8ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="cl-loader-flow-thin-gradient" x1="0" y1="0" x2="440" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="46%" stopColor="#ffffff" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="54%" stopColor="#ffffff" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              <g>
                <path
                  className="cl-loader-base-path"
                  style={PRIMARY_PATH_VARS}
                  d="M219.623 293.938L266.623 341.948L266.623 425.948L219.623 378.948L219.623 293.938L219.623 287.551L219.623 223.499L219.623 159.448L219.623 57.4475L173.623 10.9475L173.623 115.948L219.623 159.448M219.623 159.448L266.623 114.448L266.623 68.9475M219.623 287.551L173.623 333.948L173.623 383.948M219.623 223.499L147.047 223.499L55.1226 223.499L10.6226 269.448L103.123 269.448L147.047 223.499M147.047 223.499L103.123 179.448L83.1226 179.448M219.623 223.499L119.623 322.948M219.623 223.499L317.623 126.948M219.623 223.499L288.503 223.499L385.123 223.499L429.623 269.448L334.623 269.448L288.503 223.499"
                />
                <path
                  className="cl-loader-base-path"
                  style={SECONDARY_PATH_VARS}
                  d="M312.623 223.448L341.123 174.948L372.623 223.448M121.123 125.448L219.623 223.448L319.123 323.948"
                />

                <path
                  className="cl-loader-draw-path"
                  style={PRIMARY_PATH_VARS}
                  d="M219.623 293.938L266.623 341.948L266.623 425.948L219.623 378.948L219.623 293.938L219.623 287.551L219.623 223.499L219.623 159.448L219.623 57.4475L173.623 10.9475L173.623 115.948L219.623 159.448M219.623 159.448L266.623 114.448L266.623 68.9475M219.623 287.551L173.623 333.948L173.623 383.948M219.623 223.499L147.047 223.499L55.1226 223.499L10.6226 269.448L103.123 269.448L147.047 223.499M147.047 223.499L103.123 179.448L83.1226 179.448M219.623 223.499L119.623 322.948M219.623 223.499L317.623 126.948M219.623 223.499L288.503 223.499L385.123 223.499L429.623 269.448L334.623 269.448L288.503 223.499"
                />
                <path
                  className="cl-loader-draw-path"
                  style={SECONDARY_PATH_VARS}
                  d="M312.623 223.448L341.123 174.948L372.623 223.448M121.123 125.448L219.623 223.448L319.123 323.948"
                />

                <path
                  className="cl-loader-flow-glow"
                  style={PRIMARY_PATH_VARS}
                  d="M219.623 293.938L266.623 341.948L266.623 425.948L219.623 378.948L219.623 293.938L219.623 287.551L219.623 223.499L219.623 159.448L219.623 57.4475L173.623 10.9475L173.623 115.948L219.623 159.448M219.623 159.448L266.623 114.448L266.623 68.9475M219.623 287.551L173.623 333.948L173.623 383.948M219.623 223.499L147.047 223.499L55.1226 223.499L10.6226 269.448L103.123 269.448L147.047 223.499M147.047 223.499L103.123 179.448L83.1226 179.448M219.623 223.499L119.623 322.948M219.623 223.499L317.623 126.948M219.623 223.499L288.503 223.499L385.123 223.499L429.623 269.448L334.623 269.448L288.503 223.499"
                />
                <path
                  className="cl-loader-flow-glow"
                  style={SECONDARY_PATH_VARS}
                  d="M312.623 223.448L341.123 174.948L372.623 223.448M121.123 125.448L219.623 223.448L319.123 323.948"
                />

                <path
                  className="cl-loader-flow-main"
                  style={PRIMARY_PATH_VARS}
                  d="M219.623 293.938L266.623 341.948L266.623 425.948L219.623 378.948L219.623 293.938L219.623 287.551L219.623 223.499L219.623 159.448L219.623 57.4475L173.623 10.9475L173.623 115.948L219.623 159.448M219.623 159.448L266.623 114.448L266.623 68.9475M219.623 287.551L173.623 333.948L173.623 383.948M219.623 223.499L147.047 223.499L55.1226 223.499L10.6226 269.448L103.123 269.448L147.047 223.499M147.047 223.499L103.123 179.448L83.1226 179.448M219.623 223.499L119.623 322.948M219.623 223.499L317.623 126.948M219.623 223.499L288.503 223.499L385.123 223.499L429.623 269.448L334.623 269.448L288.503 223.499"
                />
                <path
                  className="cl-loader-flow-main"
                  style={SECONDARY_PATH_VARS}
                  d="M312.623 223.448L341.123 174.948L372.623 223.448M121.123 125.448L219.623 223.448L319.123 323.948"
                />

                <path
                  className="cl-loader-flow-thin"
                  style={PRIMARY_PATH_VARS}
                  d="M219.623 293.938L266.623 341.948L266.623 425.948L219.623 378.948L219.623 293.938L219.623 287.551L219.623 223.499L219.623 159.448L219.623 57.4475L173.623 10.9475L173.623 115.948L219.623 159.448M219.623 159.448L266.623 114.448L266.623 68.9475M219.623 287.551L173.623 333.948L173.623 383.948M219.623 223.499L147.047 223.499L55.1226 223.499L10.6226 269.448L103.123 269.448L147.047 223.499M147.047 223.499L103.123 179.448L83.1226 179.448M219.623 223.499L119.623 322.948M219.623 223.499L317.623 126.948M219.623 223.499L288.503 223.499L385.123 223.499L429.623 269.448L334.623 269.448L288.503 223.499"
                />
                <path
                  className="cl-loader-flow-thin"
                  style={SECONDARY_PATH_VARS}
                  d="M312.623 223.448L341.123 174.948L372.623 223.448M121.123 125.448L219.623 223.448L319.123 323.948"
                />

                <ellipse className="cl-loader-node-glow" style={{ ['--delay' as string]: '2.22s' }} rx="21" ry="21.5" cx="328.62262" cy="115.94754" />
                <ellipse className="cl-loader-node-glow" style={{ ['--delay' as string]: '2.4s' }} rx="21" ry="21.5" cx="107.622635" cy="115.94754" />
                <ellipse className="cl-loader-node-glow" style={{ ['--delay' as string]: '2.58s' }} rx="21" ry="21.5" cx="107.622635" cy="333.94754" />
                <ellipse className="cl-loader-node-glow" style={{ ['--delay' as string]: '2.76s' }} rx="21" ry="21.5" cx="328.62262" cy="333.94754" />
                <ellipse className="cl-loader-node-glow" style={{ ['--delay' as string]: '2.94s' }} rx="21" ry="21.5" cx="173.622635" cy="399.94754" />

                <ellipse className="cl-loader-node" style={{ ['--delay' as string]: '2.26s' }} rx="16.5" ry="17" cx="328.62262" cy="115.94754" />
                <ellipse className="cl-loader-node" style={{ ['--delay' as string]: '2.44s' }} rx="16.5" ry="17" cx="107.622635" cy="115.94754" />
                <ellipse className="cl-loader-node" style={{ ['--delay' as string]: '2.62s' }} rx="16.5" ry="17" cx="107.622635" cy="333.94754" />
                <ellipse className="cl-loader-node" style={{ ['--delay' as string]: '2.8s' }} rx="16.5" ry="17" cx="328.62262" cy="333.94754" />
                <ellipse className="cl-loader-node" style={{ ['--delay' as string]: '2.98s' }} rx="16.5" ry="17" cx="173.622635" cy="399.94754" />

                <rect className="cl-loader-pixel" style={{ ['--delay' as string]: '3.08s' }} width="9" height="9" x="262.122620" y="45.447540" fill="white" />
                <rect className="cl-loader-pixel" style={{ ['--delay' as string]: '3.18s' }} width="9" height="9" x="262.122620" y="21.447540" fill="white" />
                <rect className="cl-loader-pixel" style={{ ['--delay' as string]: '3.28s' }} width="9" height="9" x="58.622635" y="174.947540" fill="white" />
                <rect className="cl-loader-pixel" style={{ ['--delay' as string]: '3.38s' }} width="9" height="9" x="34.622635" y="174.947540" fill="white" />
              </g>
            </svg>
          </div>
        </div>

        <div className="cl-loader-hud">
          <div className="cl-loader-brand">Clouisle Loading</div>
          <div className="cl-loader-progress-row">
            <div className="cl-loader-progress-bar">
              <div
                className="cl-loader-progress-fill"
                style={{ width: `${progressValue}%` }}
              />
            </div>
            <div className="cl-loader-progress-text">{progressValue}%</div>
          </div>
          <div className="cl-loader-sub">
            Neural interface <span>initializing</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isPortalReady) return loader;

  return createPortal(loader, document.body);
}
