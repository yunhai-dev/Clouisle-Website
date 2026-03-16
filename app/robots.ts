import type { MetadataRoute } from 'next';
import { SITE_DOMAIN, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const explicitBotAllowList = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      ...explicitBotAllowList.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_DOMAIN,
  };
}
