"use client";

import Link from "next/link";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { Layers3, Network } from "lucide-react";
import type { Dictionary } from "@/content/en";
import type { Locale } from "@/content/i18n";
import type { Project } from "@/content/site";
import { projectIcons } from "./project-icons";

type ArchitectureProject = {
  slug: Project["slug"];
  title: string;
  category: string;
  stages: { role: string; name: string; short: string; detail: string }[];
  /** One rendered logo or icon per stage, prepared on the server. */
  marks: ReactNode[];
  foot: string;
};

export function EngineeringWorkbench({ locale, projects, labels }: {
  locale: Locale;
  projects: ArchitectureProject[];
  labels: Dictionary["engineering"];
}) {
  const id = useId();
  const [projectIndex, setProjectIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const projectTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[projectIndex];
  const selectedStage = project.stages[stageIndex];
  const ProjectIcon = projectIcons[project.slug];
  const panelId = `${id}-architecture`;

  function selectProject(index: number) {
    setProjectIndex(index);
    setStageIndex(0);
  }

  function navigateProjects(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowRight") next = (index + 1) % projects.length;
    if (event.key === "ArrowLeft") next = (index - 1 + projects.length) % projects.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = projects.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectProject(next);
    projectTabs.current[next]?.focus();
  }

  return <section className="engineering-workbench" aria-label={labels.workbenchLabel} data-diagram>
    <div className="workbench-heading">
      <span className="workbench-heading-icon"><Network aria-hidden="true" className="icon" /></span>
      <div><p>{labels.eyebrow}</p><h2>{labels.title}</h2></div>
      <span className="workbench-heading-lines" aria-hidden="true"><i /><i /><i /></span>
    </div>
    <div className="workbench-tabs" role="tablist" aria-label={labels.projectTabs}>
      {projects.map((item, index) => <button type="button" role="tab" key={item.slug}
        id={`${id}-tab-${item.slug}`} aria-controls={panelId} aria-selected={projectIndex === index}
        tabIndex={projectIndex === index ? 0 : -1}
        ref={element => { projectTabs.current[index] = element; }}
        onClick={() => selectProject(index)} onKeyDown={event => navigateProjects(event, index)}>
        <span className="workbench-tab-index" aria-hidden="true">0{index + 1}</span>{item.title}
      </button>)}
    </div>
    <div id={panelId} role="tabpanel" aria-labelledby={`${id}-tab-${project.slug}`} className="workbench-panel">
      <div className="workbench-project"><ProjectIcon aria-hidden="true" className="icon" /><span>{project.category}</span><span aria-hidden="true">{String(project.stages.length).padStart(2, "0")} <Layers3 className="icon" /></span></div>
      <ol className="workbench-flow" aria-label={labels.layerNavigation} style={{ "--workbench-stages": project.stages.length } as CSSProperties}>
        {project.stages.map((stage, index) => {
          return <li key={`${project.slug}-${stage.name}`} className="workbench-stage" style={{ "--stage-index": index } as CSSProperties}>
            <span className="workbench-wire" aria-hidden="true" />
            <button type="button" className="workbench-node" aria-pressed={index === stageIndex}
              aria-controls={`${id}-inspector`} onClick={() => setStageIndex(index)}>
              <span className="workbench-node-icon">{project.marks[index]}</span>
              <span className="workbench-node-copy"><span>{stage.role}</span><strong>{stage.name}</strong></span>
              <span className="workbench-node-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </button>
          </li>;
        })}
      </ol>
      <div className="workbench-inspector" id={`${id}-inspector`} aria-live="polite" aria-atomic="true">
        <p className="workbench-inspector-label">{labels.selectedLayer}<span>{selectedStage.role}</span></p>
        <h3>{selectedStage.detail}</h3><p>{project.foot}</p>
      </div>
      <div className="workbench-footer"><span>{labels.diagramNote}</span><Link href={`/${locale}/projects/${project.slug}`}>{labels.explore}<span aria-hidden="true">+</span></Link></div>
    </div>
  </section>;
}
