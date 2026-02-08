import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: "English",
    },
    zh: {
      displayName: "中文",
      search: "搜索文档",
      searchNoResult: "没有找到结果",
      toc: "目录",
      tocNoHeadings: "没有标题",
      lastUpdate: "最后更新",
      chooseLanguage: "选择语言",
      nextPage: "下一页",
      previousPage: "上一页",
      chooseTheme: "选择主题",
      editOnGithub: "在 GitHub 上编辑",
    },
  },
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === 'zh';
  const altLang = isZh ? 'en' : 'zh';
  const title = isZh ? '云屿 - 企业级 AI 平台' : 'Clouisle - Enterprise AI Platform';
  const description = isZh
    ? '云屿将 AI Agent、工作流编排与企业级知识检索整合到同一平台'
    : 'Clouisle combines AI agents, workflow orchestration, and enterprise-grade knowledge retrieval into one platform';

  return {
    metadataBase: new URL('https://clouisle.asia'),
    title: {
      default: title,
      template: isZh ? '%s | 云屿' : '%s | Clouisle',
    },
    description,
    icons: {
      icon: '/clouisle-light.png',
      apple: '/clouisle-light.png',
    },
    openGraph: {
      title,
      description,
      siteName: isZh ? '云屿' : 'Clouisle',
      locale: isZh ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        [lang]: `/${lang}`,
        [altLang]: `/${altLang}`,
      },
    },
  };
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <RootProvider i18n={provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
