import type { Dictionary } from "@/content/en";
import type { Project } from "@/content/site";

export function SystemVisual({ content, compact = false }: { content: Dictionary; compact?: boolean }) {
  const copy = content.visuals;
  return <div className={`system-visual ${compact ? "system-visual--compact" : ""}`} aria-label={copy.systemLabel} role="img">
    <div className="visual-topline"><span className="pulse-dot" /> {copy.systemTop} <span className="visual-index">01 / 03</span></div>
    <div className="system-grid">
      <div className="system-node system-node--source"><span className="node-id">{copy.sources}</span><strong>{copy.operational}</strong><small>PostgreSQL · CDC</small></div>
      <span className="system-link" aria-hidden="true"><i /></span>
      <div className="system-node system-node--core"><span className="node-id">{copy.event}</span><strong>{copy.streams}</strong><small>Connect · Debezium</small></div>
      <div className="system-node system-node--output"><span className="node-id">{copy.application}</span><strong>{copy.supervision}</strong><small>Spring Boot · Angular</small></div>
    </div>
    <div className="visual-footer"><span>{copy.systemFoot}</span><span className="visual-bars" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></span></div>
  </div>;
}

export function ProjectVisual({ slug, content }: { slug: Project["slug"]; content: Dictionary }) {
  const flow = content.visuals.flows[slug];
  const labels = content.projectUi;
  return <div className={`project-visual project-visual--${slug}`} role="img" aria-label={`${labels.projectVisualLabel}: ${flow.from} → ${flow.through} → ${flow.to}`}>
    <div className="project-visual-top"><span className="pulse-dot" /><span>{labels.architecture} / {slug.toUpperCase()}</span><span className="project-visual-mark">AG—</span></div>
    <div className="project-flow">
      <div><span>{labels.input}</span><strong>{flow.from}</strong></div><b aria-hidden="true">→</b>
      <div><span>{labels.process}</span><strong>{flow.through}</strong></div><b aria-hidden="true">→</b>
      <div><span>{labels.experience}</span><strong>{flow.to}</strong></div>
    </div>
    <div className="project-visual-bottom"><span>{flow.foot}</span><span aria-hidden="true">◉ &nbsp; ◉ &nbsp; ◉</span></div>
  </div>;
}
