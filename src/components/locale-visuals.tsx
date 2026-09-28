import { BusFront, Cable, ChartColumn, Database, FileText, LayoutDashboard, MessagesSquare, Monitor, Server, Workflow, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/en";
import type { Project } from "@/content/site";

export const projectIcons: Record<Project["slug"], LucideIcon> = { saeiv: BusFront, statlink: ChartColumn, "technical-chat": MessagesSquare };

// One icon per architecture stage, in the same order as `visuals.flows[slug].stages`.
const stageIcons: Record<Project["slug"], LucideIcon[]> = {
  saeiv: [Database, Cable, Workflow, Server, Monitor],
  statlink: [Database, Server, LayoutDashboard, FileText],
  "technical-chat": [Monitor, Server, Database],
};

export function SystemVisual({ content, compact = false }: { content: Dictionary; compact?: boolean }) {
  const copy = content.visuals;
  return <div className={`system-visual ${compact ? "system-visual--compact" : ""}`} aria-label={copy.systemLabel} role="img">
    <div className="visual-topline"><span className="pulse-dot" /> {copy.systemTop}</div>
    <div className="system-grid">
      <div className="system-node system-node--source"><span className="node-id"><Database aria-hidden="true" className="icon" />{copy.sources}</span><strong>{copy.operational}</strong><small>PostgreSQL · CDC</small></div>
      <span className="system-link flow-line" aria-hidden="true" />
      <div className="system-node system-node--core"><span className="node-id"><Workflow aria-hidden="true" className="icon" />{copy.event}</span><strong>{copy.streams}</strong><small>Connect · Debezium</small></div>
      <div className="system-node system-node--output"><span className="system-drop flow-line flow-line--vertical" aria-hidden="true" /><span className="node-id"><Monitor aria-hidden="true" className="icon" />{copy.application}</span><strong>{copy.supervision}</strong><small>Spring Boot · Angular</small></div>
    </div>
    <div className="visual-footer"><span>{copy.systemFoot}</span></div>
  </div>;
}

export function ProjectVisual({ slug, content, variant = "card" }: { slug: Project["slug"]; content: Dictionary; variant?: "card" | "full" }) {
  const flow = content.visuals.flows[slug];
  const icons = stageIcons[slug];
  const labels = content.projectUi;
  return <div className={`project-visual project-visual--${slug} project-visual--${variant}`} role="img" aria-label={`${labels.projectVisualLabel}: ${flow.stages.map(stage => stage.name).join(" → ")}`}>
    <div className="project-visual-top"><span className="pulse-dot" /><span>{labels.architecture} / {slug.toUpperCase()}</span></div>
    <ol className="flow" style={{ "--stages": flow.stages.length } as CSSProperties}>
      {flow.stages.map((stage, index) => {
        const Icon = icons[index];
        return <li className="flow-node" key={stage.name}>
          <span className="flow-icon"><Icon aria-hidden="true" className="icon" /></span>
          {variant === "full"
            ? <span className="flow-text"><span className="flow-role">{stage.role}</span><strong className="flow-name">{stage.name}</strong><span className="flow-detail">{stage.detail}</span></span>
            : <span className="flow-name">{stage.short}</span>}
          {index < flow.stages.length - 1 && <span className="flow-link flow-line" aria-hidden="true" />}
        </li>;
      })}
    </ol>
    <div className="project-visual-bottom"><span>{flow.foot}</span></div>
  </div>;
}
