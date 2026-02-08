import { useEffect, useState } from 'react';

export function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(media.matches);
    onChange();
    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  return reducedMotion;
}
