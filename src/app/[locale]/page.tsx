import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { getContent, isLocale, locales } from "@/content/i18n";
import { getSiteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);
  const base = getSiteUrl();
  const alternates = base ? { canonical: `${base}/${locale}`, languages: { en: `${base}/en`, fr: `${base}/fr`, "x-default": `${base}/en` } } : undefined;
  return { title: content.seo.title, description: content.seo.description, alternates, openGraph: { title: content.seo.title, description: content.seo.ogDescription, type: "website", locale: locale === "fr" ? "fr_FR" : "en_US", ...(base ? { url: `${base}/${locale}` } : {}) } };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} content={getContent(locale)} />;
}
