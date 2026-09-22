import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCasePage } from "@/components/project-case-page";
import { getContent, isLocale, locales } from "@/content/i18n";
import { projects } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return locales.flatMap(locale => projects.map(project => ({ locale, slug: project.slug }))); }
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getContent(locale).projects.find(item => item.slug === slug);
  if (!project) return {};
  const base = getSiteUrl();
  const alternates = base ? { canonical: `${base}/${locale}/projects/${slug}`, languages: { en: `${base}/en/projects/${slug}`, fr: `${base}/fr/projects/${slug}` } } : undefined;
  return { title: project.title, description: project.summary, alternates, openGraph: { title: project.title, description: project.summary, type: "article", locale: locale === "fr" ? "fr_FR" : "en_US", ...(base ? { url: `${base}/${locale}/projects/${slug}` } : {}) } };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const index = content.projects.findIndex(item => item.slug === slug);
  if (index < 0) notFound();
  return <ProjectCasePage locale={locale} content={content} project={content.projects[index]} next={content.projects[(index + 1) % content.projects.length]} />;
}
