import Link from "next/link";
import { BriefcaseBusiness, Code2, Layers3, Mail, UserRound } from "lucide-react";
import { profile } from "@/content/site";
import type { Dictionary } from "@/content/en";
import type { Locale } from "@/content/i18n";
import { GithubIcon, LinkedinIcon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";
import { SectionNav } from "./section-nav";
import { ArrowIcon } from "./visuals";
import { MotionControl } from "./site-effects";
import { ThemeToggle } from "./theme-toggle";

export function Header({ locale, content }: { locale: Locale; content: Dictionary }) {
  const nav = [
    { key: "about", target: "about", href: `/${locale}/#about`, label: content.nav.about, icon: <UserRound aria-hidden="true" className="icon" /> },
    { key: "projects", target: "projects", href: `/${locale}/#projects`, label: content.nav.projects, icon: <Layers3 aria-hidden="true" className="icon" /> },
    { key: "experience", target: "experience", href: `/${locale}/#experience`, label: content.nav.experience, icon: <BriefcaseBusiness aria-hidden="true" className="icon" /> },
    { key: "skills", target: "skills", href: `/${locale}/#skills`, label: content.nav.skills, icon: <Code2 aria-hidden="true" className="icon" /> },
  ];
  return <header className="site-header"><div className="container header-inner">
    <Link href={`/${locale}`} className="brand" aria-label={content.nav.home}><span className="brand-mark">AG<span>.</span></span><span className="brand-name">ALI GHNAINIA</span></Link>
    <SectionNav className="main-nav" label={content.nav.main} items={nav} />
    <div className="header-tools"><ThemeToggle labels={content.theme} /><LanguageSwitcher locale={locale} label={content.nav.language} switchTo={content.a11y.switchTo} /><a className="header-contact" href={`mailto:${profile.email}`}><Mail aria-hidden="true" className="icon" />{content.nav.talk}</a></div>
  </div></header>;
}

export function Footer({ locale, content }: { locale: Locale; content: Dictionary }) {
  return <footer className="footer"><div className="container footer-inner">
    <div><Link href={`/${locale}`} className="footer-brand">AG<span>.</span></Link><p>{content.role}<br />{content.locationName}</p></div>
    <div className="footer-links"><a href={profile.github} target="_blank" rel="noopener noreferrer"><GithubIcon />GitHub<ArrowIcon diagonal /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon />LinkedIn<ArrowIcon diagonal /></a><a href={`mailto:${profile.email}`}><Mail aria-hidden="true" className="icon" />{content.footer.email}</a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {content.footer.copyright}</span><span>{content.footer.tagline}</span><MotionControl labels={content.engineering} /><a href="#top">{content.footer.backToTop} ↑</a></div>
  </div></footer>;
}
