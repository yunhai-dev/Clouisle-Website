import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";
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
} from "@/lib/seo";
import "../globals.css";
import { ClouisleChat } from "@/components/clouisle-chat";

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
  const zh = isZh(lang);
  const altLang = getAlternateLang(lang);
  const { title, description, keywords } = getHomeSeoCopy(lang);
  const siteName = getSiteName(lang);
  const canonicalPath = `/${lang}`;
  const alternatePath = `/${altLang}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: zh ? '%s | 云屿' : '%s | Clouisle',
    },
    description,
    keywords,
    applicationName: siteName,
    category: zh ? '企业级 AI 平台' : 'Enterprise AI Platform',
    authors: [{ name: 'Clouisle' }],
    creator: 'Clouisle',
    publisher: 'Clouisle',
    icons: {
      icon: '/clouisle-light.png',
      apple: '/clouisle-light.png',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      siteName,
      locale: getLocale(lang),
      type: 'website',
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
      <body className="antialiased flex flex-col min-h-screen">
        <ClouisleChat />
        <RootProvider
          i18n={provider(lang)}
          search={{
            options: {
              type: 'static',
              api: '/api/search',
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
