import { Archive, BookOpenText, BusFront, Cable, ChartColumn, Compass, Container, Database, FileText, GitBranch, Infinity as InfinityIcon, KeyRound, LayoutDashboard, MessagesSquare, Monitor, Network, Package, Rocket, Server, Workflow, type LucideIcon } from "lucide-react";
import type { Project } from "@/content/site";

// Kept apart from the brand logos so client components can import these icons without pulling in simple-icons.
export const projectIcons: Record<Project["slug"], LucideIcon> = {
  saeiv: BusFront, statlink: ChartColumn, "technical-chat": MessagesSquare,
  "university-sso": KeyRound, "e-story": BookOpenText, "devops-pipeline": InfinityIcon,
};

// One icon per architecture stage, in the same order as `visuals.flows[slug].stages`.
export const stageIcons: Record<Project["slug"], LucideIcon[]> = {
  saeiv: [Database, Cable, Workflow, Server, Monitor],
  statlink: [Database, Server, LayoutDashboard, FileText],
  "technical-chat": [Monitor, Server, Database],
  "university-sso": [Monitor, KeyRound, Compass, Server, Database],
  "e-story": [Network, KeyRound, Compass, Server, Database],
  "devops-pipeline": [GitBranch, Workflow, Package, Archive, Container, Rocket],
};
