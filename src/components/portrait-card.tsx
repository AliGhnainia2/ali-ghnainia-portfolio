import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { Dictionary } from "@/content/en";

const imageDirectory = join(process.cwd(), "public", "images");

export function PortraitCard({ content }: { content: Dictionary }) {
  const photoPath = existsSync(join(imageDirectory, "ali-profile.png"))
    ? "/images/ali-profile.png"
    : existsSync(join(imageDirectory, "ali-profile.jpg"))
      ? "/images/ali-profile.jpg"
      : null;

  return (
    <div className="portrait-card">
      <div className="portrait-topline"><span>ALI GHNAINIA</span><span>SFAX · TN</span></div>
      <div className={`portrait-stage ${photoPath ? "portrait-stage--photo" : "portrait-stage--empty"}`}>
        {photoPath ? (
          <Image src={photoPath} alt={content.portrait.photoAlt} width={1122} height={1402} quality={100} sizes="(max-width: 560px) calc(100vw - 32px), (max-width: 800px) min(40vw, 275px), (max-width: 1100px) 40vw, 240px" unoptimized priority className="portrait-image" />
        ) : (
          <div className="portrait-placeholder" role="img" aria-label={content.portrait.placeholderAlt}>
            <span className="portrait-placeholder-grid" aria-hidden="true" />
            <span className="portrait-monogram" aria-hidden="true">AG<span>.</span></span>
            <span className="portrait-placeholder-note">{content.portrait.placeholder}</span>
          </div>
        )}
      </div>
      <div className="portrait-caption"><span className="pulse-dot" /> JAVA / SPRING BOOT / KAFKA <span>↗</span></div>
    </div>
  );
}
