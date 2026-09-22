import type { MetadataRoute } from "next";
import { projects } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import { locales } from "@/content/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  if (!base) return [];
  return locales.flatMap(locale => [
    { url: `${base}/${locale}`, priority: 1, alternates: { languages: { en: `${base}/en`, fr: `${base}/fr` } } },
    ...projects.map(project => ({
      url: `${base}/${locale}/projects/${project.slug}`,
      priority: 0.7,
      alternates: { languages: { en: `${base}/en/projects/${project.slug}`, fr: `${base}/fr/projects/${project.slug}` } },
    })),
  ]);
}
