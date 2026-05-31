// Shared, dependency-free i18n config.
// Kept separate from the server-only dictionary loader so it can be imported
// from both Server Components and `proxy.ts` (which runs outside the app bundle).

export const locales = ["en", "fr", "es", "de", "ro"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Human-readable names for the language switcher.
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  ro: "Română",
};

// Short labels shown in the compact switcher chip.
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
  de: "DE",
  ro: "RO",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
