// Single source of truth for site-wide SEO constants.
// Imported by metadata routes (robots/sitemap/manifest), the locale layout,
// the OG image and the JSON-LD structured data so URLs never drift apart.

import type { Locale } from "@/i18n-config";

export const SITE_URL = "https://apetit.webbinghub.io";
export const SITE_NAME = "APETIT by WebbingHUB";
export const SITE_SHORT_NAME = "APETIT";
export const TWITTER_HANDLE = "@webbinghub";

// Build an absolute, locale-prefixed URL (e.g. "/en", "/fr/...").
export function localeUrl(locale: Locale, path = ""): string {
  const suffix = path && !path.startsWith("/") ? `/${path}` : path;
  return `${SITE_URL}/${locale}${suffix}`;
}

// Open Graph locale codes (language_TERRITORY) per UI locale.
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  de: "de_DE",
  ro: "ro_RO",
};
