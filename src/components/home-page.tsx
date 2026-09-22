import Link from "next/link";
import type { Dictionary } from "@/content/en";
import type { Locale } from "@/content/i18n";
import { profile } from "@/content/site";
import { PortraitCard } from "./portrait-card";
import { ArrowIcon } from "./visuals";
import { ProjectVisual, SystemVisual } from "./locale-visuals";

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p><h2>{title}</h2></div>{note && <p className="section-note">{note}</p>}</div>;
}

export function HomePage({ locale, content }: { locale: Locale; content: Dictionary }) {
  const c = content;
  return <main id="main">
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy"><div className="availability"><span className="pulse-dot" /> {c.hero.availability} <span className="availability-sep">/</span> {c.locationName.toUpperCase()}</div>
        <p className="hero-kicker">{c.hero.greeting}</p>
        <h1 id="hero-title">{c.hero.line1}<br /><em>{c.hero.line2}</em></h1>
        <p className="hero-role">{c.role}</p>
        <p className="hero-description">{c.hero.intro}</p>
        <div className="hero-actions"><Link className="button button-primary" href={`/${locale}/#projects`}>{c.hero.viewProjects} <ArrowIcon /></Link><a className="button button-outline" href={c.cv} download>{c.hero.downloadCv} <span aria-hidden="true">↓</span></a></div>
        <div className="hero-social"><span>{c.hero.findMe}</span><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon diagonal /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon diagonal /></a></div>
      </div>
      <div className="hero-aside"><div className="hero-aside-label"><span>{c.hero.asideLabel}</span><span>001 — 003</span></div><div className="hero-media"><PortraitCard content={c} /><div className="hero-technical"><div className="hero-technical-head"><span className="pulse-dot" /> {c.hero.asideNote}</div><SystemVisual content={c} compact /></div></div></div>
    </section>

    <section className="intro-band" id="about"><div className="container intro-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> {c.about.eyebrow}</p><h2>{c.about.line1}<br /><em>{c.about.line2}</em></h2></div><div className="intro-copy"><p>{c.about.body}</p><div className="intro-tags">{c.about.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></div></section>

    <section className="section container" id="projects"><SectionHeading {...c.projectsSection} /><div className="projects-grid">{c.projects.map(project => <article className="project-card" key={project.slug}><div className="project-card-top"><span>{project.number} / {project.category}</span><span className="project-card-dot" /></div><ProjectVisual slug={project.slug} content={c} /><div className="project-card-body"><h3><span className="project-short-title">{project.shortTitle}</span><span className="project-descriptor">{project.title.split(" — ")[1]}</span></h3><p>{project.cardDescription}</p><div className="card-stack">{project.stack.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div><div className="project-card-links"><Link className="case-study-link" href={`/${locale}/projects/${project.slug}`}>{c.projectUi.explore} <ArrowIcon diagonal /></Link>{project.github && <a className="github-card-link" href={project.github} target="_blank" rel="noopener noreferrer">{c.projectUi.github} <ArrowIcon diagonal /></a>}</div></div></article>)}</div></section>

    <section className="section experience-section" id="experience"><div className="container"><SectionHeading {...c.experienceSection} /><div className="experience-list">{c.experience.map((job, index) => <article className="experience-item" key={job.company}><div className="experience-meta"><span className="experience-index">{String(index + 1).padStart(2, "0")}</span><span>{job.dates}<br />{job.location}</span></div><div><h3>{job.company}</h3><p className="experience-role">{job.role}</p><p>{job.body}</p>{job.projects.length > 0 && <div className="experience-projects">{job.projects.map(slug => <Link key={slug} href={`/${locale}/projects/${slug}`}>{slug.toUpperCase()} <ArrowIcon diagonal /></Link>)}</div>}{job.tech.length > 0 && <div className="experience-tech">{job.tech.map(tech => <span key={tech}>{tech}</span>)}</div>}</div></article>)}</div></div></section>

    <section className="section container" id="skills"><SectionHeading {...c.skillsSection} /><div className="skills-grid">{c.skills.map(group => <div className="skill-group" key={group.label}><h3>{group.label}</h3><div>{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div></section>

    <section className="metrics-section" id="highlights"><div className="container"><SectionHeading {...c.metricsSection} /><div className="metrics-grid">{c.metrics.map(metric => <div className="metric" key={metric.value}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></div></section>

    <section className="section container education-section" id="education"><SectionHeading eyebrow={c.education.eyebrow} title={c.education.title} /><div className="education-card"><div className="education-mark">E<span>.</span></div><div><p className="education-date">{c.education.date}</p><h3>{c.education.line1}<br />{c.education.line2}</h3><p>{c.education.school}</p></div><span className="education-corner" aria-hidden="true">↗</span></div></section>

    <section className="contact-section" id="contact"><div className="container contact-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> {c.contact.eyebrow}</p><h2>{c.contact.line1}<br /><em>{c.contact.line2}</em></h2><p>{c.contact.intro}</p><a className="button button-primary" href={`mailto:${profile.email}`}>{c.contact.action} <ArrowIcon diagonal /></a></div><div className="contact-details"><div><span>{c.contact.email}</span><a href={`mailto:${profile.email}`}>{profile.email} <ArrowIcon diagonal /></a></div><div><span>{c.contact.linkedin}</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{c.contact.linkedinAction} <ArrowIcon diagonal /></a></div><div><span>{c.contact.github}</span><a href={profile.github} target="_blank" rel="noopener noreferrer">{c.contact.githubAction} <ArrowIcon diagonal /></a></div><div><span>{c.contact.location}</span><strong>{c.locationName}</strong></div></div></div></section>
  </main>;
}
