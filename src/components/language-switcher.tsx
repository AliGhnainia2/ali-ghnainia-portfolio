"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/i18n";

export function LanguageSwitcher({ locale, label, switchTo }: { locale: Locale; label: string; switchTo: string }) {
  const pathname = usePathname() || `/${locale}`;
  const suffix = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");

  return <nav className="language-switcher" aria-label={label}>
    {(["en", "fr"] as const).map((target, index) => <span key={target}>
      {index > 0 && <span className="language-divider" aria-hidden="true">/</span>}
      <Link href={`/${target}${suffix}`} hrefLang={target} lang={target} aria-label={`${switchTo} ${target === "fr" ? "français" : "English"}`} aria-current={locale === target ? "page" : undefined}>{target.toUpperCase()}</Link>
    </span>)}
  </nav>;
}
