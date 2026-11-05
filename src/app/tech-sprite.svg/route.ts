import { spriteMarkup } from "@/components/tech-logo";

export const dynamic = "force-static";

export function GET() {
  return new Response(spriteMarkup(), { headers: { "Content-Type": "image/svg+xml; charset=utf-8" } });
}
