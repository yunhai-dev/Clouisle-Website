import { MarketingHomePage } from '@/components/marketing/home-page';
import type { Metadata } from 'next';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
  getAlternateLang,
  getHomeSeoCopy,
  getLocale,
  getSiteName,
  isZh,
  serializeJsonLd,
} from '@/lib/seo';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const altLang = getAlternateLang(lang);
  const { title, description, keywords } = getHomeSeoCopy(lang);
  const canonicalPath = `/${lang}`;
  const alternatePath = `/${altLang}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: getLocale(lang),
      siteName: getSiteName(lang),
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
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        [lang]: canonicalPath,
        [altLang]: alternatePath,
        'x-default': '/en',
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const zh = isZh(lang);
  const siteName = getSiteName(lang);
  const homeUrl = `${SITE_URL}/${lang}`;

  const faq = zh
    ? [
        {
          question: '云屿是什么？',
          answer:
            '云屿是企业级 AI 平台，把 AI Agent、工作流编排与企业知识检索整合到统一控制平面，支持生产环境治理。',
        },
        {
          question: 'Traditional RAG 和 Agentic RAG 有什么区别？',
          answer:
            'Traditional RAG 适合低延迟、可预测检索场景；Agentic RAG 适合多步推理、工具调用和跨源综合的复杂任务。',
        },
        {
          question: '云屿支持私有化部署吗？',
          answer:
            '支持。你可以在 VPC 或本地基础设施部署完整栈，结合 SSO、RBAC、审计日志和数据隔离策略。',
        },
        {
          question: '试点上线通常需要多久？',
          answer: '典型试点窗口小于 2 周，具体取决于数据准备、权限配置和业务流程复杂度。',
        },
      ]
    : [
        {
          question: 'What is Clouisle?',
          answer:
            'Clouisle is an enterprise AI platform that unifies AI agents, workflow orchestration, and enterprise knowledge retrieval in one control plane.',
        },
        {
          question: 'What is the difference between traditional RAG and agentic RAG?',
          answer:
            'Traditional RAG fits low-latency and predictable retrieval use cases. Agentic RAG fits complex, multi-step tasks that require tool calling and iterative reasoning.',
        },
        {
          question: 'Does Clouisle support private deployment?',
          answer:
            'Yes. Clouisle can run in your own VPC or on-premises environment with SSO, RBAC, audit logs, and data isolation controls.',
        },
        {
          question: 'How quickly can a pilot launch?',
          answer:
            'Most teams can launch a pilot in under 2 weeks, depending on data readiness, access policy setup, and workflow complexity.',
        },
      ];

  const jsonLdSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: SITE_URL,
      logo: `${SITE_URL}/clouisle-light.png`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: SITE_URL,
      inLanguage: zh ? 'zh-CN' : 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: siteName,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: homeUrl,
      description: getHomeSeoCopy(lang).description,
      softwareVersion: zh ? '封闭测试版' : 'Closed Beta',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      <MarketingHomePage lang={lang} />
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={`home-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
    </>
  );
}
