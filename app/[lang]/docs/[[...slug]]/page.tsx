import { source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
  getAlternateLang,
  getDocKeywords,
  getLanguageTag,
  getLocale,
  getSiteName,
  serializeJsonLd,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ lang: string; slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);

  if (!page) notFound();

  const MDX = page.data.body;
  const siteName = getSiteName(lang);
  const pageUrl = `${SITE_URL}/${lang}${page.url}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.data.title,
    description: page.data.description,
    inLanguage: getLanguageTag(lang),
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: SITE_URL,
      logo: `${SITE_URL}/clouisle-light.png`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }}
      />
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) return {};

  const altLang = getAlternateLang(lang);
  const canonicalPath = `/${lang}${page.url}`;
  const alternatePath = `/${altLang}${page.url}`;
  const siteName = getSiteName(lang);
  const keywords = getDocKeywords(lang, page.url, page.data.title);

  return {
    title: page.data.title,
    description: page.data.description,
    keywords,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      locale: getLocale(lang),
      siteName,
      url: canonicalPath,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        [lang]: canonicalPath,
        [altLang]: alternatePath,
        'x-default': `/en${page.url}`,
      },
    },
  };
}
