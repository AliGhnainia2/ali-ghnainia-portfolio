import { en } from "./en";
import { fr } from "./fr";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr";
}

export function getContent(locale: Locale) {
  return locale === "fr" ? fr : en;
}
