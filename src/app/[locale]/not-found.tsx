"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getContent } from "@/content/i18n";

export default function NotFound() {
  const pathname = usePathname();
  const selected = pathname?.startsWith("/fr") ? "fr" : "en";
  const content = getContent(selected).notFound;
  return <main id="main" className="not-found container"><p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.body}</p><Link className="button button-primary" href={`/${selected}`}>{content.action} →</Link></main>;
}
