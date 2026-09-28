import { ArrowRight, ArrowUpRight } from "lucide-react";

export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return <Icon aria-hidden="true" className={`icon arrow-icon ${diagonal ? "arrow-icon--diagonal" : ""}`} />;
}
