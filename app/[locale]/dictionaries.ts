import "server-only";
import type { Locale } from "@/i18n-config";
import en from "@/app/dictionaries/en.json";

// The English dictionary is the source of truth for the shape of all
// translations. Components consume `Dictionary` via `import type` only, so the
// `server-only` guard above never leaks into the client bundle.
export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => Promise.resolve(en),
  fr: () => import("@/app/dictionaries/fr.json").then((m) => m.default),
  es: () => import("@/app/dictionaries/es.json").then((m) => m.default),
  de: () => import("@/app/dictionaries/de.json").then((m) => m.default),
  ro: () => import("@/app/dictionaries/ro.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
