"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/i18n";

export function LanguageSwitcher({ locale, label, switchTo }: { locale: Locale; label: string; switchTo: string }) {
  const pathname = usePathname() || `/${locale}`;
  const suffix = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");

  // The indicator slides between the two options when the locale changes (CSS transition).
  return <nav className="language-switcher" aria-label={label} data-locale={locale}>
    <span className="language-indicator" aria-hidden="true" />
    {(["en", "fr"] as const).map(target => <Link key={target} href={`/${target}${suffix}`} hrefLang={target} lang={target} aria-label={`${switchTo} ${target === "fr" ? "français" : "English"}`} aria-current={locale === target ? "page" : undefined}>{target.toUpperCase()}</Link>)}
  </nav>;
}
