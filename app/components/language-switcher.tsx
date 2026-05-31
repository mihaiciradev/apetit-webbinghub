"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, localeLabels, type Locale } from "@/i18n-config";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

// Build the equivalent path under a different locale by swapping the first
// path segment (e.g. /en/... -> /fr/...).
function withLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  const next = segments.join("/");
  return next || `/${locale}`;
}

export function LanguageSwitcher({
  current,
  light = false,
}: {
  current: Locale;
  light?: boolean;
}) {
  const pathname = usePathname() || `/${current}`;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
          light
            ? "border-cream/25 text-cream/90 hover:bg-cream/10"
            : "border-forest-900/10 text-forest-900 hover:bg-forest-900/5"
        }`}
      >
        <GlobeIcon className="h-4 w-4" />
        {localeLabels[current]}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 min-w-[10rem] overflow-hidden rounded-2xl border border-forest-900/10 bg-cream/95 p-1.5 shadow-[0_18px_40px_-12px_rgba(16,39,30,0.3)] backdrop-blur-xl"
        >
          {locales.map((locale) => (
            <Link
              key={locale}
              href={withLocale(pathname, locale)}
              hrefLang={locale}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                locale === current
                  ? "bg-forest-800 font-semibold text-cream"
                  : "text-forest-900 hover:bg-forest-900/5"
              }`}
            >
              {localeNames[locale]}
              <span className="text-xs uppercase tracking-wide opacity-60">
                {localeLabels[locale]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
