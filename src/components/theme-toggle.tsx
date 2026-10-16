"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { themeStorageKey, type Theme } from "@/lib/theme";

const themeEvent = "portfolio:theme-change";
let sessionTheme: Theme | null = null;

function readPreference(): Theme | null {
  if (sessionTheme) return sessionTheme;
  try {
    const saved = localStorage.getItem(themeStorageKey);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch { return null; }
}

function getTheme(): Theme {
  const applied = document.documentElement.dataset.theme;
  if (applied === "light" || applied === "dark") return applied;
  return readPreference() ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function subscribeTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const refresh = () => {
    document.documentElement.dataset.theme = readPreference() ?? (media.matches ? "dark" : "light");
    onChange();
  };
  const storageChanged = (event: StorageEvent) => {
    if (event.key === themeStorageKey || event.key === null) {
      sessionTheme = null;
      refresh();
    }
  };
  media.addEventListener("change", refresh);
  window.addEventListener(themeEvent, refresh);
  window.addEventListener("storage", storageChanged);
  refresh();
  return () => {
    media.removeEventListener("change", refresh);
    window.removeEventListener(themeEvent, refresh);
    window.removeEventListener("storage", storageChanged);
  };
}

const getServerTheme = (): null => null;

export function ThemeToggle({ labels }: { labels: Dictionary["theme"] }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const label = theme === null ? labels.toggle : theme === "dark" ? labels.toLight : labels.toDark;

  function toggle() {
    sessionTheme = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = sessionTheme;
    try { localStorage.setItem(themeStorageKey, sessionTheme); } catch { /* Keep the choice for this session. */ }
    window.dispatchEvent(new Event(themeEvent));
  }

  return <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
    <Sun className="icon theme-for-dark" aria-hidden="true" />
    <Moon className="icon theme-for-light" aria-hidden="true" />
    <span className="theme-toggle-label" aria-hidden="true"><span className="theme-for-dark">{labels.light}</span><span className="theme-for-light">{labels.dark}</span></span>
  </button>;
}
