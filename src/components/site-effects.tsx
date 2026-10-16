"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Pause, Play } from "lucide-react";
import type { Dictionary } from "@/content/en";

type Motion = "running" | "paused" | "system";
const preferenceKey = "ali:motion-paused";
const preferenceEvent = "portfolio:motion-preference";
let sessionPreference: boolean | undefined;

function getMotion(): Motion {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "system";
  if (sessionPreference !== undefined) return sessionPreference ? "paused" : "running";
  try { return localStorage.getItem(preferenceKey) === "true" ? "paused" : "running"; }
  catch { return "running"; }
}

function subscribeMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storageChanged = (event: StorageEvent) => {
    if (event.key === preferenceKey || event.key === null) { sessionPreference = undefined; onChange(); }
  };
  media.addEventListener("change", onChange);
  window.addEventListener(preferenceEvent, onChange);
  window.addEventListener("storage", storageChanged);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(preferenceEvent, onChange);
    window.removeEventListener("storage", storageChanged);
  };
}
const getServerMotion = (): Motion => "running";
const useMotion = () => useSyncExternalStore(subscribeMotion, getMotion, getServerMotion);

export function SiteEffects() {
  const pathname = usePathname();
  const motion = useMotion();

  useEffect(() => {
    document.documentElement.dataset.motion = motion;
    return () => { delete document.documentElement.dataset.motion; };
  }, [motion]);

  useEffect(() => {
    let frame = 0;
    let active = true;
    const update = () => {
      frame = 0;
      if (!active) return;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const value = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
      document.documentElement.style.setProperty("--page-progress", String(value));
    };
    const schedule = () => { if (active && !frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    resize?.observe(document.body);
    document.fonts?.ready.then(schedule);
    schedule();
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      resize?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    if (motion !== "running" || typeof IntersectionObserver === "undefined") return;
    const reveals = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const diagrams = [...document.querySelectorAll<HTMLElement>("[data-diagram]")];
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.revealState = "visible";
        revealObserver.unobserve(entry.target);
      }
    }, { threshold: 0.07, rootMargin: "0px 0px -24px 0px" });
    reveals.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight - 24) return;
      const delay = Math.max(0, Math.min(240, Number(element.dataset.revealDelay) || 0));
      element.style.setProperty("--reveal-delay", `${delay}ms`);
      element.dataset.revealState = "pending";
      revealObserver.observe(element);
    });
    const diagramObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { (entry.target as HTMLElement).dataset.inView = String(entry.isIntersecting); });
    }, { rootMargin: "80px 0px" });
    diagrams.forEach(element => diagramObserver.observe(element));
    return () => {
      revealObserver.disconnect();
      diagramObserver.disconnect();
      reveals.forEach(element => { delete element.dataset.revealState; });
      diagrams.forEach(element => { delete element.dataset.inView; });
    };
  }, [pathname, motion]);

  return <div className="site-progress" aria-hidden="true" />;
}

export function MotionControl({ labels }: { labels: Dictionary["engineering"] }) {
  const motion = useMotion();
  const label = motion === "system" ? labels.reducedMotion : motion === "paused" ? labels.resumeMotion : labels.pauseMotion;
  function toggle() {
    sessionPreference = motion === "running";
    try { localStorage.setItem(preferenceKey, String(sessionPreference)); } catch { /* The session preference still applies. */ }
    window.dispatchEvent(new Event(preferenceEvent));
  }
  const Icon = motion === "running" ? Pause : Play;
  return <button type="button" className="motion-control" aria-label={label} aria-pressed={motion !== "running"} disabled={motion === "system"} onClick={toggle}>
    <Icon aria-hidden="true" className="icon" /><span>{label}</span>
  </button>;
}
