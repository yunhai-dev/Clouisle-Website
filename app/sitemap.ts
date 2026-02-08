import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';

const baseUrl = 'https://clouisle.asia';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage for each language
  for (const lang of i18n.languages) {
    entries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          i18n.languages.map((l) => [l, `${baseUrl}/${l}`]),
        ),
      },
    });
  }

  // Documentation pages for each language
  for (const lang of i18n.languages) {
    const pages = source.getPages(lang);
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${lang}${page.url}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            i18n.languages.map((l) => [l, `${baseUrl}/${l}${page.url}`]),
          ),
        },
      });
    }
  }

  return entries;
}
