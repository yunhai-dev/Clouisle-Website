import { source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';

interface PageProps {
  params: Promise<{ lang: string; slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
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
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) return {};

  const altLang = lang === 'zh' ? 'en' : 'zh';

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `/${lang}${page.url}`,
      languages: {
        [lang]: `/${lang}${page.url}`,
        [altLang]: `/${altLang}${page.url}`,
      },
    },
  };
}
