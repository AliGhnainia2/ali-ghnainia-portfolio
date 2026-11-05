import type { CSSProperties } from "react";
import { Archive, ArrowLeftRight, BadgeCheck, Box, Boxes, Braces, Cable, ChartColumn, Code2, Compass, Database, DatabaseZap, FileText, FlaskConical, GitPullRequest, Globe, Layers3, MessageSquareText, Repeat, ShieldCheck, Shuffle, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import {
  siAngular, siApachekafka, siApachemaven, siCamunda, siDocker, siGit, siGithub, siGithubactions, siGitlab, siHibernate, siJavascript, siJenkins,
  siJsonwebtokens, siJunit5, siKeycloak, siLinux, siMongodb, siMysql, siNginx, siOpenjdk, siPostgresql, siPython, siReact, siReactivex,
  siSonarqubeserver, siSpring, siSpringboot, siSpringsecurity, siStripe, siSwagger, siThymeleaf, siTypescript, type SimpleIcon,
} from "simple-icons";

// Server-only: brand paths come from simple-icons (CC0). Client components receive rendered marks as props
// so the icon data never reaches the browser bundle.
const brands: Record<string, SimpleIcon> = {
  java: siOpenjdk, "spring boot": siSpringboot, "spring boot actuator": siSpringboot, spring: siSpring, "spring cloud": siSpring,
  "spring cloud gateway": siSpring, "spring data jpa": siSpring, "spring security": siSpringsecurity,
  kafka: siApachekafka, "apache kafka": siApachekafka, "kafka connect": siApachekafka,
  angular: siAngular, react: siReact, typescript: siTypescript, javascript: siJavascript, rxjs: siReactivex,
  postgresql: siPostgresql, mysql: siMysql, mongodb: siMongodb, "hibernate / jpa": siHibernate,
  docker: siDocker, "docker compose": siDocker, "docker hub": siDocker, "github actions": siGithubactions, "gitlab ci/cd": siGitlab,
  maven: siApachemaven, nginx: siNginx, linux: siLinux, sonarqube: siSonarqubeserver, jenkins: siJenkins,
  git: siGit, github: siGithub, junit: siJunit5, jwt: siJsonwebtokens, "camunda bpmn": siCamunda, keycloak: siKeycloak,
  stripe: siStripe, thymeleaf: siThymeleaf, "openapi / swagger": siSwagger, python: siPython,
};

// Technologies without a published brand mark get a neutral glyph instead of an invented logo.
const glyphs: Record<string, LucideIcon> = {
  debezium: DatabaseZap, cdc: DatabaseZap, "cube.js": Box, apexcharts: ChartColumn, twilio: MessageSquareText, mockito: FlaskConical,
  websocket: Cable, "websocket / stomp": Cable, eureka: Compass, openfeign: ArrowLeftRight, "rest apis": Braces, "rest api": Braces,
  webclient: Globe, microservices: Boxes, nexus: Archive, "role-based access control": ShieldCheck, lombok: Wrench, mapstruct: Shuffle, validation: BadgeCheck,
  cors: Globe, "clean code": Sparkles, solid: Layers3, "code review": GitPullRequest, "agile / scrum": Repeat, data: Database, reports: FileText,
};

const normalize = (name: string) => name.toLowerCase().replace(/\s+\d+$/, "").trim();

function luminance(hex: string) {
  const channel = (offset: number) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

// Brand colors that would disappear on the dark or light page background are mixed toward the text color.
function toneClass(hex: string) {
  const light = luminance(hex);
  const onDark = (light + 0.05) / 0.056;
  if (onDark < 3) return "tech-logo--lift";
  if (onDark < 5) return "tech-logo--lift-soft";
  if (0.98 / (light + 0.05) < 2.2) return "tech-logo--deepen";
  return "";
}

export function hasTechMark(name: string) {
  const key = normalize(name);
  return key in brands || key in glyphs;
}

// Every brand path lives once in a static sprite (served by app/tech-sprite.svg); logos reference it with <use>,
// so pages stay light and the browser caches the logos across pages.
export const spriteUrl = "/tech-sprite.svg";

export function spriteMarkup() {
  const unique = [...new Map(Object.values(brands).map(icon => [icon.slug, icon])).values()];
  const symbols = unique.map(icon => `<symbol id="tl-${icon.slug}" viewBox="0 0 24 24"><path d="${icon.path}"/></symbol>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg"><defs>${symbols}</defs></svg>`;
}

export function TechLogo({ name, className = "" }: { name: string; className?: string }) {
  const key = normalize(name);
  const brand = brands[key];
  if (brand) {
    return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={`tech-logo ${toneClass(brand.hex)} ${className}`} style={{ "--brand": `#${brand.hex}` } as CSSProperties}><use href={`${spriteUrl}#tl-${brand.slug}`} /></svg>;
  }
  const Glyph = glyphs[key] ?? Code2;
  return <Glyph aria-hidden="true" className={`tech-logo tech-logo--glyph ${className}`} />;
}

export function TechChips({ items, className = "tech-chips" }: { items: string[]; className?: string }) {
  return <ul className={className}>{items.map(item => <li key={item} className="tech-chip"><TechLogo name={item} />{item}</li>)}</ul>;
}
