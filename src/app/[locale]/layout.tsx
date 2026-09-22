import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/locale-chrome";
import { getContent, isLocale } from "@/content/i18n";
import { profile } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);
  const siteUrl = getSiteUrl();
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: { default: content.seo.title, template: `%s | Ali Ghnainia` },
    description: content.seo.description,
    openGraph: { title: content.seo.title, description: content.seo.ogDescription, type: "website", locale: locale === "fr" ? "fr_FR" : "en_US", siteName: content.seo.siteName },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const siteUrl = getSiteUrl();
  const person = {
    "@context": "https://schema.org", "@type": "Person", name: "Ali Ghnainia",
    jobTitle: content.role, email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Sfax", addressCountry: "TN" },
    sameAs: [profile.linkedin, profile.github],
    ...(siteUrl ? { url: `${siteUrl}/${locale}` } : {}),
  };
  return <html lang={locale} data-scroll-behavior="smooth"><body id="top"><a className="skip-link" href="#main">{content.a11y.skip}</a><Header locale={locale} content={content} />{children}<Footer locale={locale} content={content} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /></body></html>;
}
