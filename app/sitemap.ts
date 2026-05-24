import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const baseUrl = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const homeAlternates = Object.fromEntries(
    i18n.languages.map((lang) => [lang, `${baseUrl}/${lang}`]),
  );
  const homeAlternatesWithDefault = {
    ...homeAlternates,
    'x-default': `${baseUrl}/${i18n.defaultLanguage}`,
  };

  // Root entry for language redirect/discovery
  entries.push({
    url: baseUrl,
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: {
      languages: homeAlternatesWithDefault,
    },
  });

  // Homepage for each language
  for (const lang of i18n.languages) {
    entries.push({
      url: `${baseUrl}/${lang}`,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: homeAlternatesWithDefault,
      },
    });
  }

  // Documentation pages for each language
  for (const lang of i18n.languages) {
    const pages = source.getPages(lang);
    for (const page of pages) {
      const pageAlternates = Object.fromEntries(
        i18n.languages
          .map((locale) => {
            const alternatePage = source.getPage(page.slugs, locale);
            if (!alternatePage) return null;

            return [locale, `${baseUrl}${alternatePage.url}`];
          })
          .filter((entry): entry is [string, string] => entry !== null),
      );

      entries.push({
        url: `${baseUrl}${page.url}`,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            ...pageAlternates,
            'x-default': pageAlternates[i18n.defaultLanguage] ?? `${baseUrl}${page.url}`,
          },
        },
      });
    }
  }

  return entries;
}
