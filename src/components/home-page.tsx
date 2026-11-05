import Link from "next/link";
import { CalendarDays, Container, Database, Download, FlaskConical, GraduationCap, Layers3, Mail, MapPin, Monitor, Network, Server, Workflow, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/content/en";
import type { Locale } from "@/content/i18n";
import { marqueeStack, profile, type Project } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./icons";
import { PortraitCard } from "./portrait-card";
import { ArrowIcon } from "./visuals";
import { ProjectVisual, StageMark, projectIcons } from "./locale-visuals";
import { EngineeringWorkbench } from "./engineering-workbench";
import { TechChips, TechLogo } from "./tech-logo";

// Icons follow content order: hero focus areas, then `skills` groups (Backend, Event-driven, Frontend, Data, DevOps, Testing).
const focusIcons: LucideIcon[] = [Server, Network, Workflow, Layers3];
const skillIcons: LucideIcon[] = [Server, Workflow, Monitor, Database, Container, FlaskConical];

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p><h2>{title}</h2></div>{note && <p className="section-note">{note}</p>}</div>;
}

function ProjectCard({ project, index, locale, content }: { project: Project; index: number; locale: Locale; content: Dictionary }) {
  const Icon = projectIcons[project.slug];
  const ui = content.projectUi;
  return <article className={`project-card project-card--${project.slug} project-card--${project.kind}`} data-reveal data-reveal-delay={index * 80} data-spotlight>
    <span className="card-glow" aria-hidden="true" />
    <div className="project-card-top"><span className="project-card-icon"><Icon aria-hidden="true" className="icon" /></span><span className="project-card-number">{project.number}</span><span className="project-card-category">{project.category}</span></div>
    <ProjectVisual slug={project.slug} content={content} />
    <div className="project-card-body">
      <h3><span className="project-short-title">{project.shortTitle}</span><span className="project-descriptor">{project.title.split(" — ")[1]}</span></h3>
      <p>{project.cardDescription}</p>
      <TechChips items={project.stack.slice(0, 5)} className="card-stack" />
      <div className="project-card-links"><Link className="case-study-link" href={`/${locale}/projects/${project.slug}`}>{ui.explore}<span className="sr-only"> — {project.shortTitle}</span><span className="case-study-arrow"><ArrowIcon diagonal /></span></Link>{project.github && <a className="github-card-link" href={project.github} target="_blank" rel="noopener noreferrer"><GithubIcon />{ui.github}<span className="sr-only"> — {project.shortTitle}</span></a>}</div>
    </div>
  </article>;
}

export function HomePage({ locale, content }: { locale: Locale; content: Dictionary }) {
  const c = content;
  const featured = c.projects.filter(project => project.kind === "featured");
  const academic = c.projects.filter(project => project.kind === "academic");
  return <main id="main">
    <div className="hero-shell">
      <div className="hero-backdrop" aria-hidden="true"><span /><span /><span /></div>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="availability"><span className="status-dot" aria-hidden="true" />{c.hero.availability}<span className="availability-sep" aria-hidden="true" /><MapPin aria-hidden="true" className="icon" />{c.locationName}</p>
          <h1 id="hero-title" className="hero-identity"><span className="hero-name">{profile.name}</span><span className="hero-role">{c.role}</span></h1>
          <p className="hero-tagline">{c.hero.line1} <em>{c.hero.line2}</em></p>
          <p className="hero-description">{c.hero.intro}</p>
          <ul className="hero-focus" aria-label={c.hero.focusLabel}>{c.hero.focus.map((area, index) => { const Icon = focusIcons[index]; return <li key={area}><Icon aria-hidden="true" className="icon" />{area}</li>; })}</ul>
          <div className="hero-actions"><Link className="button button-primary" href={`/${locale}/#projects`}>{c.hero.viewProjects} <ArrowIcon /></Link><a className="button button-outline" href={c.cv} download><Download aria-hidden="true" className="icon button-icon-download" />{c.hero.downloadCv}<span className="button-meta">{c.hero.cvFormat}</span></a></div>
          <div className="hero-social"><span>{c.hero.findMe}</span><a href={profile.github} target="_blank" rel="noopener noreferrer"><GithubIcon />GitHub</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon />LinkedIn</a><a href={`mailto:${profile.email}`}><Mail aria-hidden="true" className="icon" />{c.footer.email}</a></div>
        </div>
        <div className="hero-aside"><PortraitCard content={c} /></div>
      </section>
    </div>

    <section className="stack-band" aria-label={c.hero.stackLabel}>
      <div className="container stack-band-inner">
        <p className="stack-band-label">{c.hero.stackLabel}</p>
        <div className="marquee">{[0, 1].map(copy => <ul key={copy} className="marquee-track" aria-hidden={copy === 1 ? true : undefined}>{marqueeStack.map(name => <li key={name}><TechLogo name={name} />{name}</li>)}</ul>)}</div>
      </div>
    </section>

    <div className="engineering-section container" data-reveal>
      <EngineeringWorkbench locale={locale} labels={c.engineering} projects={featured.map(project => ({
        slug: project.slug, title: project.shortTitle, category: project.category,
        stages: c.visuals.flows[project.slug].stages, foot: c.visuals.flows[project.slug].foot,
        marks: c.visuals.flows[project.slug].stages.map((stage, index) => <StageMark key={stage.name} slug={project.slug} index={index} />),
      }))} />
    </div>

    <section className="intro-band" id="about"><div className="container intro-grid" data-reveal><div><p className="eyebrow"><span className="eyebrow-line" />{c.about.eyebrow}</p><h2>{c.about.line1} <em>{c.about.line2}</em></h2></div><div className="intro-copy"><p>{c.about.body}</p><ul className="intro-tags">{c.about.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div></div></section>

    <section className="section container" id="projects"><SectionHeading {...c.projectsSection} />
      <div className="projects-grid">{featured.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} locale={locale} content={c} />)}</div>
    </section>

    <section className="section container academic-section" id="academic"><SectionHeading {...c.academicSection} />
      <div className="projects-grid">{academic.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} locale={locale} content={c} />)}</div>
    </section>

    <section className="section experience-section" id="experience"><div className="container"><SectionHeading {...c.experienceSection} />
      <div className="experience-list">{c.experience.map((job, index) => <article className="experience-item" key={job.company} data-reveal data-reveal-delay={index * 80}>
        <div className="experience-meta"><span className="experience-index">{String(index + 1).padStart(2, "0")}</span><span className="experience-when"><span className="experience-dates"><CalendarDays aria-hidden="true" className="icon" />{job.dates}</span><span className="experience-location"><MapPin aria-hidden="true" className="icon" />{job.location}</span></span></div>
        <div><h3>{job.company}</h3><p className="experience-role">{job.role}</p><p>{job.body}</p>{job.projects.length > 0 && <div className="experience-projects">{job.projects.map(slug => <Link key={slug} href={`/${locale}/projects/${slug}`}>{slug.toUpperCase()} <ArrowIcon /></Link>)}</div>}{job.tech.length > 0 && <TechChips items={job.tech} className="experience-tech" />}</div>
      </article>)}</div>
    </div></section>

    <section className="section container" id="skills"><SectionHeading {...c.skillsSection} />
      <div className="skills-grid">{c.skills.map((group, index) => { const Icon = skillIcons[index]; return <div className="skill-card" key={group.label} data-reveal data-reveal-delay={index * 60} data-spotlight>
        <span className="card-glow" aria-hidden="true" />
        <h3><span className="skill-icon"><Icon aria-hidden="true" className="icon" /></span>{group.label}<span className="skill-count" aria-hidden="true">{String(group.items.length).padStart(2, "0")}</span></h3>
        <TechChips items={group.items} className="skill-chips" />
      </div>; })}</div>
    </section>

    <section className="metrics-section" id="highlights"><div className="container"><SectionHeading {...c.metricsSection} /><dl className="metrics-grid">{c.metrics.map((metric, index) => <div className="metric" key={metric.value} data-reveal data-reveal-delay={index * 60}><dt>{metric.label}</dt><dd data-countup>{metric.value}</dd></div>)}</dl></div></section>

    <section className="section container education-section" id="education"><SectionHeading eyebrow={c.education.eyebrow} title={c.education.title} />
      <div className="education-card" data-reveal><p className="education-date">{c.education.date}</p><div className="education-body"><span className="education-icon"><GraduationCap aria-hidden="true" className="icon" /></span><div>
        <h3>{c.education.line1} {c.education.line2}</h3><p>{c.education.school}</p>
        <div className="education-projects"><p className="education-projects-label">{c.education.projectsLabel}</p><ul>{academic.map(project => { const Icon = projectIcons[project.slug]; return <li key={project.slug}><Link href={`/${locale}/projects/${project.slug}`}><Icon aria-hidden="true" className="icon" />{project.shortTitle}<ArrowIcon diagonal /></Link></li>; })}</ul></div>
      </div></div></div>
    </section>

    <section className="contact-section" id="contact"><div className="container"><div className="contact-card" data-reveal><span className="contact-card-glow" aria-hidden="true" /><div className="contact-grid"><div><p className="eyebrow"><span className="eyebrow-line" />{c.contact.eyebrow}</p><h2>{c.contact.line1} <em>{c.contact.line2}</em></h2><p>{c.contact.intro}</p><a className="button button-primary" href={`mailto:${profile.email}`}><Mail aria-hidden="true" className="icon" />{c.contact.action}</a></div><div className="contact-details">
      <div><span><Mail aria-hidden="true" className="icon" />{c.contact.email}</span><a href={`mailto:${profile.email}`}>{profile.email} <ArrowIcon diagonal /></a></div>
      <div><span><LinkedinIcon />{c.contact.linkedin}</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{c.contact.linkedinAction} <ArrowIcon diagonal /></a></div>
      <div><span><GithubIcon />{c.contact.github}</span><a href={profile.github} target="_blank" rel="noopener noreferrer">{c.contact.githubAction} <ArrowIcon diagonal /></a></div>
      <div><span><MapPin aria-hidden="true" className="icon" />{c.contact.location}</span><strong>{c.locationName}</strong></div>
    </div></div></div></div></section>
  </main>;
}
