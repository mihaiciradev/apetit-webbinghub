import { notFound } from "next/navigation";
import { isLocale } from "@/i18n-config";
import { getDictionary } from "./dictionaries";
import { Nav } from "../components/nav";
import { Reveal } from "../components/reveal";
// TEMPORARILY DISABLED — restore in the future (3D experience section).
// import { DinnerSection } from "../components/dinner-section";
import { Logo } from "../components/logo";
import { StructuredData } from "../components/structured-data";
import { AnchorScroll } from "../components/anchor-scroll";
import { WhatIsApetit } from "../components/what-is-apetit";
import { ContactCta } from "../components/contact-cta";
import {
  QrIcon,
  CalendarIcon,
  PulseIcon,
  SparkleIcon,
  ChartIcon,
  ShieldIcon,
  ArrowIcon,
  PhoneIcon,
  WandIcon,
} from "../components/icons";

const serviceIcons = {
  qr: QrIcon,
  calendar: CalendarIcon,
  pulse: PulseIcon,
  sparkle: SparkleIcon,
  chart: ChartIcon,
  shield: ShieldIcon,
} as const;

const trustIcons = [ShieldIcon, PhoneIcon, ShieldIcon];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict;

  return (
    <div id="top" className="relative overflow-x-clip">
      <StructuredData
        locale={locale}
        title={t.meta.title}
        description={t.meta.description}
      />
      <AnchorScroll />
      <Nav locale={locale} dict={t.nav} />

      {/* ===================== HERO ===================== */}
      <section className="relative isolate overflow-hidden bg-forest-950 text-cream">
        {/* aurora blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-forest-600/40 blur-[120px] animate-aurora" />
          <div className="absolute right-[-12%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-gold-500/25 blur-[120px] animate-aurora [animation-delay:-6s]" />
          <div className="absolute bottom-[-20%] left-[20%] h-[36rem] w-[36rem] rounded-full bg-forest-400/25 blur-[140px] animate-aurora [animation-delay:-3s]" />
        </div>
        <div className="grain absolute inset-0 -z-10" />

        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:pb-32 lg:pt-44">
          <div className="min-w-0">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-gold-300 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                <span className="min-w-0 break-words">APETIT · {t.hero.badge}</span>
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance hyphens-auto break-words sm:text-6xl lg:text-7xl">
                {t.hero.title}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/75 hyphens-auto break-words">
                {t.hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-4 text-center text-base font-semibold text-forest-950 shadow-[0_18px_40px_-12px_rgba(184,151,90,0.7)] transition-all hover:bg-gold-400 hover:shadow-[0_22px_48px_-12px_rgba(184,151,90,0.8)] sm:w-auto"
                >
                  {t.hero.ctaPrimary}
                  <ArrowIcon className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
                <WhatIsApetit label={t.hero.ctaSecondary} body={t.hero.about} />
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream/55">
                {t.hero.trust.map((label, i) => {
                  const Icon = trustIcons[i] ?? ShieldIcon;
                  return (
                    <span key={label} className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-gold-400" /> {label}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* device mockup */}
          <Reveal delay={200} className="relative mx-auto w-full min-w-0 max-w-sm">
            <div className="absolute inset-0 -z-10 translate-y-6 scale-95 rounded-[3rem] bg-gold-500/20 blur-3xl" />
            <div className="animate-float rounded-[2.6rem] border border-cream/15 bg-gradient-to-b from-forest-900 to-forest-950 p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
              <div className="overflow-hidden rounded-[2.1rem] bg-cream">
                <div className="flex items-center justify-between bg-forest-800 px-5 py-4 text-cream">
                  <div className="flex items-center gap-2">
                    <Logo className="h-6 w-6 text-gold-400" />
                    <span className="font-display text-base font-semibold">APETIT</span>
                  </div>
                  <span className="rounded-full bg-cream/15 px-2.5 py-1 text-[10px] font-medium tracking-wide">
                    {t.hero.device.table}
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-600">
                    {t.hero.device.menu}
                  </p>
                  {t.hero.device.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-2xl border border-sand bg-white p-3 shadow-sm"
                    >
                      <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-forest-400/30 to-gold-400/30" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                        <span className="text-[10px] font-medium uppercase tracking-wide text-gold-600">
                          {item.tag}
                        </span>
                      </div>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-700 text-sm font-bold text-cream">
                        +
                      </div>
                    </div>
                  ))}
                  <button className="mt-1 w-full rounded-2xl bg-gold-500 py-3 text-sm font-semibold text-forest-950">
                    {t.hero.device.add}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* curved divider */}
        <div className="relative">
          <svg
            className="block w-full text-cream"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 80V40C240 70 480 80 720 64 960 48 1200 8 1440 24V80Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <section className="border-y border-sand bg-cream py-7">
        <div className="mx-auto mb-5 max-w-6xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft/60">
            {t.marquee.label}
          </p>
        </div>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
            {[...t.marquee.items, ...t.marquee.items].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-12 font-display text-2xl font-medium text-forest-800/70"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PLATFORM / SERVICES ===================== */}
      <section id="platform" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-600">
              {t.platform.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-forest-950 text-balance hyphens-auto break-words sm:text-5xl">
              {t.platform.title}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft hyphens-auto break-words">{t.platform.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.platform.services.map((service, i) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? QrIcon;
            return (
              <Reveal
                key={service.title}
                delay={(i % 3) * 90}
                className="group relative overflow-hidden rounded-card border border-sand bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_24px_50px_-24px_rgba(16,39,30,0.35)]"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold-400/0 transition-colors duration-300 group-hover:bg-gold-400/10" />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50/0 ring-1 ring-forest-700/15 [background:radial-gradient(circle_at_30%_30%,rgba(61,107,79,0.14),transparent)]">
                  <Icon className="h-6 w-6 text-forest-700" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-forest-950 hyphens-auto break-words">
                  {service.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft hyphens-auto break-words">{service.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how" className="relative scroll-mt-28 overflow-hidden bg-forest-950 text-cream">
        <div className="grain absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gold-500/15 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-400">
                {t.how.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-balance hyphens-auto break-words sm:text-5xl">
                {t.how.title}
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-cream/10 bg-cream/10 md:grid-cols-3">
            {t.how.steps.map((step, i) => (
              <Reveal
                key={step.n}
                delay={i * 120}
                className="bg-forest-950/80 p-8 backdrop-blur-sm transition-colors hover:bg-forest-900/80 lg:p-10"
              >
                <span className="font-display text-5xl font-semibold text-gold-400/90">
                  {step.n}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold hyphens-auto break-words">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-cream/65 hyphens-auto break-words">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHY APETIT ===================== */}
      <section id="why" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-600">
              {t.why.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-forest-950 text-balance hyphens-auto break-words sm:text-5xl">
              {t.why.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft hyphens-auto break-words">{t.why.intro}</p>
          </div>

          <div className="space-y-5">
            {t.why.props.map((vp, i) => (
              <div
                key={vp.title}
                className="rounded-card border border-sand bg-gradient-to-br from-white to-cream-deep p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-800 font-display text-lg font-semibold text-gold-300">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-semibold text-forest-950 hyphens-auto break-words">
                      {vp.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft hyphens-auto break-words">{vp.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 3D EXPERIENCE ===================== */}
      {/* TEMPORARILY DISABLED — restore in the future.
      <DinnerSection dict={t.experience} />
      */}

      {/* ===================== CTA / CONTACT ===================== */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24 lg:py-32">
        <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] bg-forest-900 px-8 py-16 text-center text-cream sm:px-16 lg:py-24">
          <div className="grain absolute inset-0 -z-10 opacity-30" />
          <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-gold-500/25 blur-[110px]" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-forest-400/30 blur-[110px]" />

          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-gold-300">
            <WandIcon className="h-4 w-4" />
            {t.contact.eyebrow}
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-balance hyphens-auto break-words sm:text-5xl lg:text-6xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/75 hyphens-auto break-words">
            {t.contact.body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ContactCta label={t.contact.ctaPrimary} reach={t.contact.reach} />
            <a
              href="https://www.webbinghub.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-cream/25 px-8 py-4 text-center text-base font-semibold text-cream transition-colors hover:bg-cream/10 sm:w-auto"
            >
              {t.contact.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-sand bg-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8 text-forest-700" />
            <div>
              <p className="font-display text-lg font-semibold text-forest-950">APETIT</p>
              <p className="text-xs uppercase tracking-[0.18em] text-ink-soft/70">
                {t.footer.tagline}
              </p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">{t.footer.blurb}</p>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://www.webbinghub.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-forest-700 hover:text-forest-600"
            >
              webbinghub.io
            </a>
            <a
              href="https://travel.webbinghub.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft hover:text-forest-700"
            >
              travel.webbinghub.io
            </a>
          </div>
        </div>
        <div className="border-t border-sand">
          <div className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-ink-soft/60">
            © {new Date().getFullYear()} APETIT by WebbingHUB. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
