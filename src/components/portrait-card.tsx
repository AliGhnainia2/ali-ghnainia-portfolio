import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Dictionary } from "@/content/en";

const imageDirectory = join(process.cwd(), "public", "images");

export function PortraitCard({ content }: { content: Dictionary }) {
  const photoPath = existsSync(join(imageDirectory, "ali-profile.png"))
    ? "/images/ali-profile.png"
    : existsSync(join(imageDirectory, "ali-profile.jpg"))
      ? "/images/ali-profile.jpg"
      : null;

  if (!photoPath) return null;

  return (
    <figure className="portrait-card">
      <div className="portrait-stage portrait-stage--photo">
        <Image src={photoPath} alt={content.portrait.photoAlt} width={1122} height={1402} quality={100} sizes="(max-width: 560px) min(calc(100vw - 52px), 350px), (max-width: 800px) 420px, (max-width: 1180px) 36vw, 400px" unoptimized priority className="portrait-image" />
        <span className="portrait-corners" aria-hidden="true" />
      </div>
      <figcaption className="portrait-caption"><span><MapPin aria-hidden="true" className="icon" />{content.locationName}</span></figcaption>
    </figure>
  );
}
