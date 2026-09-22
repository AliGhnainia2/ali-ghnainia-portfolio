import Link from "next/link";
import { profile } from "@/content/site";
import type { Dictionary } from "@/content/en";
import type { Locale } from "@/content/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { ArrowIcon } from "./visuals";

export function Header({ locale, content }: { locale: Locale; content: Dictionary }) {
  const nav = [
    { href: `/${locale}/#about`, label: content.nav.about, key: "about" },
    { href: `/${locale}/#projects`, label: content.nav.projects, key: "projects" },
    { href: `/${locale}/#experience`, label: content.nav.experience, key: "experience" },
    { href: `/${locale}/#skills`, label: content.nav.skills, key: "skills" },
  ];
  return <header className="site-header"><div className="container header-inner">
    <Link href={`/${locale}`} className="brand" aria-label={content.nav.home}><span className="brand-mark">AG<span>.</span></span><span className="brand-name">ALI GHNAINIA</span></Link>
    <nav className="main-nav" aria-label={content.nav.main}>{nav.map(item => <Link href={item.href} data-nav={item.key} key={item.key}>{item.label}</Link>)}</nav>
    <div className="header-tools"><LanguageSwitcher locale={locale} label={content.nav.language} switchTo={content.a11y.switchTo} /><a className="header-contact" href={`mailto:${profile.email}`}>{content.nav.talk} <ArrowIcon diagonal /></a></div>
  </div></header>;
}

export function Footer({ locale, content }: { locale: Locale; content: Dictionary }) {
  return <footer className="footer"><div className="container footer-inner">
    <div><Link href={`/${locale}`} className="footer-brand">AG<span>.</span></Link><p>{content.role}<br />{content.locationName}</p></div>
    <div className="footer-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon diagonal /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon diagonal /></a><a href={`mailto:${profile.email}`}>{content.contact.email} <ArrowIcon diagonal /></a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {content.footer.copyright}</span><span>{content.footer.tagline}</span><a href="#top">{content.footer.backToTop} ↑</a></div>
  </div></footer>;
}
