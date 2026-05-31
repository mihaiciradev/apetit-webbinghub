import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n-config";
import { localeUrl } from "@/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // hreflang map shared by every entry: one alternate per locale plus an
  // x-default pointing at the default locale so Google picks the right page.
  const languages: Record<string, string> = {
    "x-default": localeUrl(defaultLocale),
  };
  for (const locale of locales) {
    languages[locale] = localeUrl(locale);
  }

  return locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
