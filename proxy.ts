import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n-config";

// Pick the best matching locale from the Accept-Language header, falling back
// to the default. Dependency-free (no Negotiator) to keep proxy lean.
function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    // exact (e.g. "fr") or region-prefixed (e.g. "fr-fr") match
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already locale-prefixed? Let it through.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  // Otherwise redirect to the locale-prefixed equivalent. Use a permanent (308)
  // redirect so Google consolidates signals onto the locale URL instead of
  // keeping the bare path in limbo (a temporary 307 leaves it "Page with redirect").
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  // Run on everything except Next internals, API routes, and files with an
  // extension (favicon.ico, images, etc.).
  matcher: ["/((?!_next|api|nutshell|.*\\..*).*)"],
};
