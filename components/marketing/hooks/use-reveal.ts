import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useRevealAnimation(scopeRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const targets = Array.from(scope.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [scopeRef]);
}
