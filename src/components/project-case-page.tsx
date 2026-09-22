import Link from "next/link";
import type { Dictionary } from "@/content/en";
import type { Locale } from "@/content/i18n";
import type { Project } from "@/content/site";
import { ArrowIcon } from "./visuals";
import { ProjectVisual } from "./locale-visuals";

export function ProjectCasePage({ locale, content, project, next }: { locale: Locale; content: Dictionary; project: Project; next: Project }) {
  const ui = content.projectUi;
  return <main id="main" className={`project-page project-page--${project.slug}`}><div className="container">
    <nav className="breadcrumbs" aria-label={content.a11y.breadcrumbs}><Link href={`/${locale}`}>{content.nav.homeShort}</Link><span>/</span><Link href={`/${locale}/#projects`}>{content.nav.projects}</Link><span>/</span><strong>{project.shortTitle}</strong></nav>
    <section className="project-hero"><div><p className="eyebrow"><span className="eyebrow-line" /> {ui.caseStudy} {project.number} / {project.category.toUpperCase()}</p><h1>{project.title}</h1><p className="project-lead">{project.summary}</p><div className="project-hero-actions"><Link className="button button-outline" href={`/${locale}/#projects`}>← {ui.allProjects}</Link>{project.github && <a className="button button-primary" href={project.github} target="_blank" rel="noopener noreferrer">{ui.github} <ArrowIcon diagonal /></a>}</div></div><span className="project-number">{project.number}</span></section>
    <ProjectVisual slug={project.slug} content={content} />
    {project.facts.length > 0 && <div className="project-facts">{project.facts.map(fact => <div key={fact.value}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div>}
    {project.slug === "saeiv" && <div className="case-focus-strip"><div className="case-focus-title"><span className="pulse-dot" /><span>{ui.focus}</span><strong>~42</strong></div><div className="case-focus-steps">{ui.focusItems.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div></div>}
    {project.slug === "statlink" && <nav className="case-area-grid" aria-label={ui.exploreAreas}><p>{ui.exploreAreas}</p>{[3, 4, 5].map(index => <a key={index} href={`#section-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{project.sections[index].heading}</strong><ArrowIcon diagonal /></a>)}</nav>}
    <div className="case-layout"><aside className="case-sidebar"><p>{ui.inThis}</p><nav aria-label={content.a11y.caseNav}>{project.sections.map((section, index) => <a key={section.heading} href={`#section-${index}`}>{String(index + 1).padStart(2, "0")} <span>{section.heading}</span></a>)}<a href="#tech-stack">{String(project.sections.length + 1).padStart(2, "0")} <span>{ui.techStack}</span></a></nav></aside><div className="case-content">{project.sections.map((section, index) => {
      const highlighted = (project.slug === "saeiv" && (index === 2 || index === 4)) || (project.slug === "statlink" && index >= 3);
      return <section id={`section-${index}`} className={`case-section ${highlighted ? "case-section--highlight" : ""}`} key={section.heading}><div className="case-section-label">{String(index + 1).padStart(2, "0")} / {project.shortTitle.toUpperCase()}</div><h2>{section.heading}</h2><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}</section>;
    })}<section id="tech-stack" className="case-section"><div className="case-section-label">{String(project.sections.length + 1).padStart(2, "0")} / {project.shortTitle.toUpperCase()}</div><h2>{ui.techStack}</h2><div className="case-tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div></section></div></div>
    <div className="next-project"><div><p className="eyebrow"><span className="eyebrow-line" /> {ui.next}</p><h2>{next.shortTitle}</h2><p>{next.summary}</p></div><Link className="round-arrow" href={`/${locale}/projects/${next.slug}`} aria-label={`${content.a11y.viewProject} ${next.shortTitle}`}><ArrowIcon diagonal /></Link></div>
  </div></main>;
}
