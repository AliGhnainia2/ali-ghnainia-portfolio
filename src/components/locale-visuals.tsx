import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/en";
import type { Project } from "@/content/site";
import { projectIcons, stageIcons } from "./project-icons";
import { TechLogo } from "./tech-logo";

export { projectIcons };

// The technology behind each stage, when it has a mark; `null` keeps the generic stage icon.
const stageTech: Record<Project["slug"], (string | null)[]> = {
  saeiv: ["PostgreSQL", "Debezium", "Kafka", "Spring Boot", "Angular"],
  statlink: [null, "Spring Boot", "React", null],
  "technical-chat": ["Angular", "Spring Boot", "MongoDB"],
  "university-sso": ["Angular", "Keycloak", "Eureka", "Spring Boot", "PostgreSQL"],
  "e-story": ["Spring Cloud Gateway", "Keycloak", "Eureka", "Spring Boot", "PostgreSQL"],
  "devops-pipeline": ["GitHub", "Jenkins", "Maven", "Nexus", "Docker Hub", "Docker Compose"],
};

export function StageMark({ slug, index }: { slug: Project["slug"]; index: number }) {
  const tech = stageTech[slug][index];
  if (tech) return <TechLogo name={tech} className="icon" />;
  const Icon = stageIcons[slug][index];
  return <Icon aria-hidden="true" className="icon" />;
}

export function ProjectVisual({ slug, content, variant = "card" }: { slug: Project["slug"]; content: Dictionary; variant?: "card" | "full" }) {
  const flow = content.visuals.flows[slug];
  const labels = content.projectUi;
  return <div className={`project-visual project-visual--${slug} project-visual--${variant}`} data-diagram data-reveal={variant === "full" ? true : undefined} role="img" aria-label={`${labels.projectVisualLabel}: ${flow.stages.map(stage => stage.name).join(" → ")}`}>
    <div className="project-visual-top"><span className="pulse-dot" /><span>{labels.architecture} / {slug.toUpperCase()}</span></div>
    <ol className={`flow ${flow.stages.length > 5 ? "flow--dense" : ""}`} style={{ "--stages": flow.stages.length } as CSSProperties}>
      {flow.stages.map((stage, index) => <li className="flow-node" key={stage.name} style={{ "--flow-stage": index } as CSSProperties}>
        <span className="flow-icon"><StageMark slug={slug} index={index} /></span>
        {variant === "full"
          ? <span className="flow-text"><span className="flow-role">{stage.role}</span><strong className="flow-name">{stage.name}</strong><span className="flow-detail">{stage.detail}</span></span>
          : <span className="flow-name">{stage.short}</span>}
        {index < flow.stages.length - 1 && <span className="flow-link flow-line" aria-hidden="true" />}
      </li>)}
    </ol>
    <div className="project-visual-bottom"><span>{flow.foot}</span></div>
  </div>;
}
