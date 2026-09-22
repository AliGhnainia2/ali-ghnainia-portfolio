export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow-icon">{diagonal ? "↗" : "→"}</span>;
}
