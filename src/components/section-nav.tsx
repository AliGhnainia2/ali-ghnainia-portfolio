"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

export type SectionNavItem = { key: string; href: string; target: string; label: string; icon?: ReactNode; prefix?: string };

// Marks the link whose section sits in the reading band of the viewport. Pure enhancement:
// without JavaScript the links still work and simply show no active state.
export function SectionNav({ items, label, className }: { items: SectionNavItem[]; label: string; className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items.map(item => document.getElementById(item.target)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      setActive(targets.find(el => visible.has(el.id))?.id ?? null);
    }, { rootMargin: "-38% 0px -55% 0px" });
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return <nav className={className} aria-label={label}>
    {items.map(item => <Link key={item.key} href={item.href} data-nav={item.key} data-active={active === item.target ? "true" : undefined}>
      {item.icon}{item.prefix && <span className="nav-prefix">{item.prefix}</span>}<span className="nav-label">{item.label}</span>
    </Link>)}
  </nav>;
}
