"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import type { Locale } from "@/i18n-config";

type NavDict = {
  links: {
    platform: string;
    how: string;
    why: string;
    experience: string;
  };
  tagline: string;
  cta: string;
  menu: string;
  language: string;
};

export function Nav({ locale, dict }: { locale: Locale; dict: NavDict }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: dict.links.platform, href: "#platform" },
    { label: dict.links.how, href: "#how" },
    { label: dict.links.why, href: "#why" },
    { label: dict.links.experience, href: "#experience" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Light tones while sitting on top of the dark hero (nav transparent),
  // dark tones once the cream nav background kicks in or the mobile menu opens.
  const light = !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between gap-6 rounded-full border px-5 py-3 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "border-forest-900/10 bg-cream/80 shadow-[0_8px_30px_rgba(16,39,30,0.08)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="APETIT home">
          <Logo className={`h-8 w-8 transition-colors ${light ? "text-gold-400" : "text-forest-700"}`} />
          <span
            className={`font-display text-xl font-semibold tracking-tight transition-colors ${
              light ? "text-cream" : "text-forest-900"
            }`}
          >
            APETIT
          </span>
          <span
            className={`hidden text-[11px] font-medium uppercase tracking-[0.18em] transition-colors sm:inline ${
              light ? "text-cream/65" : "text-ink-soft/70"
            }`}
          >
            {dict.tagline}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                light ? "text-cream/80 hover:text-cream" : "text-ink-soft hover:text-forest-700"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher current={locale} light={light} />
          </div>
          <a
            href="#contact"
            className="hidden rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-cream shadow-[0_8px_24px_-8px_rgba(16,39,30,0.6)] transition-all hover:bg-forest-700 hover:shadow-[0_10px_30px_-6px_rgba(16,39,30,0.65)] sm:inline-block"
          >
            {dict.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden ${
              light ? "border-cream/25 text-cream" : "border-forest-900/10 text-forest-900"
            }`}
            aria-label={dict.menu}
            aria-expanded={open}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-0 z-[-1] flex flex-col bg-cream/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-forest-900/10 py-4 font-display text-2xl font-medium text-forest-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-ink-soft/70">
              {dict.language}
            </span>
            <LanguageSwitcher current={locale} />
          </div>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 rounded-full bg-forest-800 px-6 py-4 text-center text-base font-semibold text-cream"
          >
            {dict.cta}
          </a>
        </div>
      )}
    </header>
  );
}
