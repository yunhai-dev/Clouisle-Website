import { useEffect, useRef } from 'react';

export function useCounter(
  targetValue: string,
  reducedMotion: boolean
): React.RefObject<HTMLSpanElement | null> {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const match = targetValue.match(/^([\d.]+)(.*)$/);
    if (!match) return;

    const numericPart = parseFloat(match[1]);
    const suffix = match[2];
    if (isNaN(numericPart)) return;

    const isDecimal = match[1].includes('.');
    const decimalPlaces = isDecimal ? match[1].split('.')[1].length : 0;

    let cancelled = false;

    const init = async () => {
      const [{ gsap: g }, { ScrollTrigger: ST }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      g.registerPlugin(ST);

      const obj = { val: 0 };
      g.to(obj, {
        val: numericPart,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          if (el) {
            el.textContent = isDecimal
              ? obj.val.toFixed(decimalPlaces) + suffix
              : Math.round(obj.val) + suffix;
          }
        },
      });
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [targetValue, reducedMotion]);

  return ref;
}
