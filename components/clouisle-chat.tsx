'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    Clouisle?: {
      init: (config: Record<string, unknown>) => void;
    };
  }
}

export function ClouisleChat() {
  const pathname = usePathname();
  if (pathname?.includes('/slides')) return null;

  return (
    <Script
      src="https://app.clouisle.asia/embed.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.Clouisle?.init({
          type: 'agent',
          id: '0fad399b-ebc6-423a-a79e-3f880db9b02b',
          token: 'clou_abcb9c260c803a1ee5225660ece43b64bc988b91eb9b69598be1400d67d96e9f',
          mode: 'bubble',
          position: 'bottom-right',
        });
      }}
    />
  );
}
