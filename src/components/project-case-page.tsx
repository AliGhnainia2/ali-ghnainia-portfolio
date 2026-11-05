import Link from "next/link";
import type { CSSProperties } from "react";
import { Activity, ArrowDown, ArrowLeft, Boxes, CalendarClock, ChartColumn, FileJson, FileSpreadsheet, GraduationCap, Globe, LockKeyhole, Plug, RotateCcw, ShieldCheck, TrendingUp, UserCog, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/content/en";
import type { Locale } from "@/content/i18n";
import type { Project } from "@/content/site";
import { GithubIcon } from "./icons";
import { ProjectVisual, projectIcons } from "./locale-visuals";
import { SectionNav } from "./section-nav";
import { TechChips, TechLogo } from "./tech-logo";
import { ArrowIcon } from "./visuals";

const pad = (value: number) => String(value).padStart(2, "0");
// Same order as `projectUi.focusItems`: CSV rules, connector JSON, REST API, RUNNING/lag checks, recovery.
const orchestrationIcons: LucideIcon[] = [FileSpreadsheet, FileJson, Plug, Activity, RotateCcw];
// STATLINK sections 4–6: reporting & analytics, scheduled reporting, predictive module.
const areaIcons: LucideIcon[] = [ChartColumn, CalendarClock, TrendingUp];
// Same order as each project's `journey.steps`; a string is a technology rendered with its logo.
const journeyMarks: Partial<Record<Project["slug"], (string | LucideIcon)[]>> = {
  "university-sso": ["Keycloak", Boxes, UserCog, ShieldCheck, LockKeyhole],
  "e-story": [Globe, "Spring Cloud Gateway", "Keycloak", "Eureka", "PostgreSQL"],
  "devops-pipeline": ["GitHub", "Maven", "JUnit", "Nexus", "Docker Hub", "Docker Compose"],
};

function JourneyMark({ mark }: { mark: string | LucideIcon }) {
  if (typeof mark === "string") return <TechLogo name={mark} className="icon" />;
  const Icon = mark;
  return <Icon aria-hidden="true" className="icon" />;
}

export function ProjectCasePage({ locale, content, project, next }: { locale: Locale; content: Dictionary; project: Project; next: Project }) {
  const ui = content.projectUi;
  const [titleMain, titleSub] = project.title.split(" — ");
  const connectors = project.facts.find(fact => fact.value === "~42");
  const previewStack = project.stack.slice(0, 8);
  const ProjectIcon = projectIcons[project.slug];
  const sidebar = [
    ...project.sections.map((section, index) => ({ key: `section-${index}`, target: `section-${index}`, href: `#section-${index}`, prefix: pad(index + 1), label: section.heading })),
    { key: "tech-stack", target: "tech-stack", href: "#tech-stack", prefix: pad(project.sections.length + 1), label: ui.techStack },
  ];
  return <main id="main" className={`project-page project-page--${project.slug}`}><div className="container">
    <nav className="breadcrumbs" aria-label={content.a11y.breadcrumbs}><Link href={`/${locale}`}>{content.nav.homeShort}</Link><span aria-hidden="true">/</span><Link href={`/${locale}/#projects`}>{content.nav.projects}</Link><span aria-hidden="true">/</span><span aria-current="page">{project.shortTitle}</span></nav>

    <section className="project-hero" data-reveal>
      <div>
        <p className="eyebrow"><span className="project-hero-icon"><ProjectIcon aria-hidden="true" className="icon" /></span>{ui.caseStudy} {project.number} / {project.category.toUpperCase()}</p>
        <h1><span className="project-title-main">{titleMain}</span>{titleSub && <><span className="sr-only"> — </span><span className="project-title-sub">{titleSub}</span></>}</h1>
        {project.context && <p className="project-context"><GraduationCap aria-hidden="true" className="icon" />{project.context}</p>}
        <p className="project-lead">{project.summary}</p>
        <div className="project-hero-actions"><Link className="button button-outline" href={`/${locale}/#projects`}><ArrowLeft aria-hidden="true" className="icon arrow-icon arrow-icon--back" />{ui.allProjects}</Link>{project.github && <a className="button button-primary" href={project.github} target="_blank" rel="noopener noreferrer"><GithubIcon />{ui.github} <ArrowIcon diagonal /></a>}</div>
      </div>
      <aside className="project-hero-stack" aria-label={ui.techStack}>
        <p>{ui.techStack}</p>
        <TechChips items={previewStack} className="project-hero-chips" />
        {project.stack.length > previewStack.length && <a href="#tech-stack" aria-label={`${ui.techStack} (+${project.stack.length - previewStack.length})`}>+{project.stack.length - previewStack.length}<ArrowDown aria-hidden="true" className="icon" /></a>}
      </aside>
    </section>

    <ProjectVisual slug={project.slug} content={content} variant="full" />
    {project.facts.length > 0 && <dl className="project-facts" data-reveal style={{ "--facts": project.facts.length } as CSSProperties}>{project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd data-countup>{fact.value}</dd></div>)}</dl>}

    {project.journey && <section className="orchestration journey" data-reveal aria-labelledby="journey-title">
      <div className="orchestration-head"><h2 id="journey-title" className="orchestration-label"><span className="pulse-dot" />{project.journey.title}</h2></div>
      <ol className="orchestration-steps" style={{ "--steps": project.journey.steps.length } as CSSProperties}>{project.journey.steps.map((step, index) => {
        const mark = journeyMarks[project.slug]?.[index];
        return <li key={step}><span className="orchestration-step-icon">{mark ? <JourneyMark mark={mark} /> : pad(index + 1)}</span><span className="orchestration-step-number">{pad(index + 1)}</span><strong>{step}</strong></li>;
      })}</ol>
    </section>}

    {project.slug === "saeiv" && <section className="orchestration" data-reveal aria-labelledby="orchestration-title">
      <div className="orchestration-head">
        <h2 id="orchestration-title" className="orchestration-label"><span className="pulse-dot" />{ui.focus}</h2>
        {connectors && <p className="orchestration-count"><strong data-countup>{connectors.value}</strong><span>{connectors.label}</span></p>}
      </div>
      <ol className="orchestration-steps">{ui.focusItems.map((item, index) => { const Icon = orchestrationIcons[index]; return <li key={item}><span className="orchestration-step-icon"><Icon aria-hidden="true" className="icon" /></span><span className="orchestration-step-number">{pad(index + 1)}</span><strong>{item}</strong></li>; })}</ol>
    </section>}

    {project.slug === "statlink" && <nav className="case-area-grid" data-reveal aria-label={ui.exploreAreas}><p>{ui.exploreAreas}</p>{[3, 4, 5].map((index, position) => { const Icon = areaIcons[position]; return <a key={index} href={`#section-${index}`}><span className="case-area-head"><span className="case-area-icon"><Icon aria-hidden="true" className="icon" /></span><span className="case-area-number">{pad(index + 1)}</span></span><strong>{project.sections[index].heading}</strong><span className="case-area-jump">{ui.jumpTo}<ArrowDown aria-hidden="true" className="icon" /></span></a>; })}</nav>}

    <div className="case-layout">
      <aside className="case-sidebar"><p>{ui.inThis}</p><SectionNav label={content.a11y.caseNav} items={sidebar} /></aside>
      <div className="case-content">
        {project.sections.map((section, index) => {
          const highlighted = (project.slug === "saeiv" && (index === 2 || index === 4)) || (project.slug === "statlink" && index >= 3) || (project.kind === "academic" && index === 2);
          return <section id={`section-${index}`} className={`case-section ${highlighted ? "case-section--highlight" : ""}`} key={section.heading} data-reveal aria-labelledby={`section-${index}-title`}>
            <div className="case-section-label">{pad(index + 1)}</div>
            <div><h2 id={`section-${index}-title`}>{section.heading}</h2><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}</div>
          </section>;
        })}
        <section id="tech-stack" className="case-section" data-reveal aria-labelledby="tech-stack-title">
          <div className="case-section-label">{pad(project.sections.length + 1)}</div>
          <div><h2 id="tech-stack-title">{ui.techStack}</h2><TechChips items={project.stack} className="case-tags" /></div>
        </section>
        {project.github && <div className="source-panel" data-reveal><span className="source-panel-icon"><GithubIcon /></span><div><p className="eyebrow">{ui.sourceTitle}</p><p>{ui.sourceNote}</p></div><a className="button button-primary" href={project.github} target="_blank" rel="noopener noreferrer">{ui.github} <ArrowIcon diagonal /></a></div>}
      </div>
    </div>

    <Link className="next-project" data-reveal href={`/${locale}/projects/${next.slug}`}><div><p className="eyebrow"><span className="eyebrow-line" />{ui.next}</p><h2>{next.shortTitle}</h2><p>{next.summary}</p></div><span className="round-arrow" aria-hidden="true"><ArrowIcon /></span></Link>
  </div></main>;
}
