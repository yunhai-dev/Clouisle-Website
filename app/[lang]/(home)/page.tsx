import { MarketingHomePage } from '@/components/marketing/home-page';
import type { Metadata } from 'next';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === 'zh';

  return {
    title: isZh ? '云屿 - 企业级 AI 平台' : 'Clouisle - Enterprise AI Platform',
    description: isZh
      ? '云屿将 AI Agent、工作流编排与企业级知识检索整合到同一平台，助力企业智能化转型'
      : 'Clouisle combines AI agents, workflow orchestration, and enterprise-grade knowledge retrieval into one platform',
    openGraph: {
      title: isZh ? '云屿 - 企业级 AI 平台' : 'Clouisle - Enterprise AI Platform',
      description: isZh
        ? '云屿将 AI Agent、工作流编排与企业级知识检索整合到同一平台，助力企业智能化转型'
        : 'Clouisle combines AI agents, workflow orchestration, and enterprise-grade knowledge retrieval into one platform',
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  return <MarketingHomePage lang={lang} />;
}
