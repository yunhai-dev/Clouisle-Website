import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
  getAlternateLang,
  getContactCopy,
  getLocale,
  getSiteName,
  isZh,
  serializeJsonLd,
} from "@/lib/seo";
import { getConsultationEnv } from "@/lib/consultation-env";
import { ConsultationForm } from "@/components/contact/consultation-form";

// Force a build-time env check. If the env vars are missing this throws,
// failing the static export loudly rather than shipping a broken bundle.
getConsultationEnv();

interface ContactPageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  const altLang = getAlternateLang(lang);
  const { title, description, keywords } = getContactCopy(lang);
  const siteName = getSiteName(lang);
  const canonicalPath = `/${lang}/contact`;
  const alternatePath = `/${altLang}/contact`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        [lang]: canonicalPath,
        [altLang]: alternatePath,
        "x-default": "/en/contact",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
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
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const zh = isZh(lang);
  const copy = getContactCopy(lang);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: copy.jsonLd.name,
    description: copy.jsonLd.description,
    url: `${SITE_URL}/${lang}/contact`,
    inLanguage: zh ? "zh-CN" : "en-US",
  };

  return (
    <>
      <section className="cl-contact-section">
        <div className="cl-contact-grid" aria-hidden="true" />
        <div className="cl-contact-vignette" aria-hidden="true" />

        <div className="cl-contact-shell">
          <div className="cl-contact-card">
            <span className="cl-contact-orb cl-contact-orb-one" aria-hidden="true" />
            <span className="cl-contact-orb cl-contact-orb-two" aria-hidden="true" />
            <span className="cl-contact-sweep" aria-hidden="true" />

            <header className="cl-contact-heading">
              <p className="cl-contact-eyebrow">
                <span className="cl-contact-eyebrow-dot" aria-hidden="true" />
                {zh ? "联系云屿" : "Contact"}
              </p>
              <h1 className="cl-contact-title">{copy.title}</h1>
              <p className="cl-contact-body">{copy.description}</p>
            </header>

            <div className="cl-contact-divider" aria-hidden="true" />

            <div className="cl-contact-divider" aria-hidden="true" />

            <ConsultationForm
              copy={copy.form}
              lang={zh ? "zh" : "en"}
            />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(contactPageSchema) }}
      />
    </>
  );
}
