"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-cream-deep">
      <div className="flex items-center gap-3 text-ink-soft/60">
        <span className="h-2 w-2 animate-ping rounded-full bg-gold-500" />
        <span className="text-sm font-medium tracking-wide">Setting the table…</span>
      </div>
    </div>
  );
}

const DinnerScene = dynamic(() => import("./dinner-scene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export function DinnerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const titleARef = useRef<HTMLDivElement>(null);
  const titleBRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Only run the render loop while the scene is near the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "300px 0px 300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let snapOn = false;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      progress.current = p;

      // Only force scroll-snapping while the scene is pinned and filling the
      // viewport — elsewhere the page scrolls freely.
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 2;
      if (pinned !== snapOn) {
        snapOn = pinned;
        document.documentElement.style.scrollSnapType = pinned ? "y mandatory" : "";
      }

      // responsive overlay: headline crossfades, progress bar fills
      if (titleARef.current) titleARef.current.style.opacity = String(clamp01(1 - (p - 0.4) / 0.12));
      if (titleBRef.current) titleBRef.current.style.opacity = String(clamp01((p - 0.46) / 0.12));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.style.scrollSnapType = "";
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative h-[300vh] bg-cream-deep text-forest-950"
    >
      {/* scroll-snap beats — the scene only comes to rest at these framings */}
      {[0, 1 / 3, 2 / 3, 1].map((f) => (
        <div
          key={f}
          aria-hidden
          className="pointer-events-none absolute left-0 h-px w-full"
          style={{ top: `${f * 200}vh`, scrollSnapAlign: "start" }}
        />
      ))}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <DinnerScene progress={progress} reduced={reduced} active={active} />
        </div>

        {/* legibility masks (light, to match the airy scene) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-cream-deep to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream-deep to-transparent" />

        {/* overlay copy */}
        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-6xl flex-col justify-between px-6 py-14 sm:py-20">
          <div className="relative max-w-xl">
            <div ref={titleARef}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-600">
                The APETIT experience
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Pull up a chair.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                A scan opens the table. The seat slides out. The welcome begins — before a
                single word is spoken.
              </p>
            </div>

            <div ref={titleBRef} className="absolute inset-0" style={{ opacity: 0 }}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-600">
                And the rest? Handled.
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
                You just host.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                Orders, bookings, the lights, the little details — APETIT runs quietly in the
                background so every guest feels expected.
              </p>
            </div>
          </div>

          {/* responsive scroll progress */}
          <div className="flex items-center gap-4">
            <div className="relative h-1 w-44 overflow-hidden rounded-full bg-forest-950/10">
              <div
                ref={barRef}
                className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gold-500"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-soft/60">
              Take your seat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
