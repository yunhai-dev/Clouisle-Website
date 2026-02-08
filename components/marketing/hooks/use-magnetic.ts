import { useEffect, useRef } from 'react';

export function useMagnetic(
  reducedMotion: boolean,
  strength = 0.3
): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    let cancelled = false;

    const init = async () => {
      const { gsap: g } = await import('gsap');
      if (cancelled) return;

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        g.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power3.out' });
      };

      const onLeave = () => {
        g.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);

      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reducedMotion, strength]);

  return ref;
}
