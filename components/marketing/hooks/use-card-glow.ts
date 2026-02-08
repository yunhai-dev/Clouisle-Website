import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useCardGlow(scopeRef: RefObject<HTMLDivElement | null>, disabled: boolean) {
  useEffect(() => {
    if (disabled) return;

    const scope = scopeRef.current;
    if (!scope) return;

    const cards = Array.from(scope.querySelectorAll<HTMLElement>('[data-glow="interactive"]'));
    if (cards.length === 0) return;

    const rafMap = new WeakMap<HTMLElement, number>();
    const pendingMap = new WeakMap<HTMLElement, { x: number; y: number }>();

    const commitGlow = (card: HTMLElement) => {
      rafMap.delete(card);
      const pos = pendingMap.get(card);
      if (!pos) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${pos.x - rect.left}px`);
      card.style.setProperty('--glow-y', `${pos.y - rect.top}px`);
      card.style.setProperty('--glow-a', '1');
      card.classList.add('is-glow-active');
    };

    const queueGlow = (card: HTMLElement, clientX: number, clientY: number) => {
      pendingMap.set(card, { x: clientX, y: clientY });
      if (!rafMap.has(card)) {
        rafMap.set(card, requestAnimationFrame(() => commitGlow(card)));
      }
    };

    const onEnter = (event: PointerEvent) => {
      queueGlow(event.currentTarget as HTMLElement, event.clientX, event.clientY);
    };

    const onMove = (event: PointerEvent) => {
      queueGlow(event.currentTarget as HTMLElement, event.clientX, event.clientY);
    };

    const onLeave = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      const raf = rafMap.get(card);
      if (raf) { cancelAnimationFrame(raf); rafMap.delete(card); }
      card.style.setProperty('--glow-a', '0');
      card.classList.remove('is-glow-active');
    };

    for (const card of cards) {
      card.style.setProperty('--glow-x', '50%');
      card.style.setProperty('--glow-y', '50%');
      card.style.setProperty('--glow-a', '0');
      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
    }

    return () => {
      for (const card of cards) {
        const raf = rafMap.get(card);
        if (raf) cancelAnimationFrame(raf);
        card.removeEventListener('pointerenter', onEnter);
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
      }
    };
  }, [disabled, scopeRef]);
}
