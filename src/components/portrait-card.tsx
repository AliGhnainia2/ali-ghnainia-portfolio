import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/en";
import { orbitStack } from "@/content/site";
import { TechLogo } from "./tech-logo";

// The portrait sits inside an orbit of the main stack; the two badges repeat documented metrics.
export function PortraitCard({ content }: { content: Dictionary }) {
  const [services, records] = content.metrics;
  return (
    <figure className="portrait">
      <div className="portrait-orbit" aria-hidden="true">
        <span className="orbit-track" />
        <span className="orbit-track orbit-track--inner" />
        <ul className="orbit-ring" style={{ "--n": orbitStack.length } as CSSProperties}>
          {orbitStack.map((name, index) => <li key={name} className="orbit-item" style={{ "--i": index } as CSSProperties}><span title={name}><TechLogo name={name} /></span></li>)}
        </ul>
      </div>
      <div className="portrait-halo" aria-hidden="true" />
      <div className="portrait-photo">
        <Image src="/images/ali-profile.png" alt={content.portrait.photoAlt} width={1254} height={1254} quality={100} sizes="(max-width: 560px) 70vw, (max-width: 1180px) 32vw, 330px" unoptimized priority className="portrait-image" />
      </div>
      <p className="portrait-badge portrait-badge--top" aria-hidden="true"><strong>{services.value}</strong><span>{services.label}</span></p>
      <p className="portrait-badge portrait-badge--bottom" aria-hidden="true"><strong>{records.value}</strong><span>{records.label}</span></p>
    </figure>
  );
}
