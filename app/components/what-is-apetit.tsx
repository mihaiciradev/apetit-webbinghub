"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

// Estimated panel height (px) used to decide whether there's room to open
// upward. Generous so a few lines of copy always fit.
const PANEL_ESTIMATE = 260;

// Hero secondary action: a button that reveals a short, plain-language
// explanation of APETIT in a popover. Opens above the button by default and
// flips below only when there isn't enough room overhead.
export function WhatIsApetit({ label, body }: { label: string; body: string }) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("top");
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const computePlacement = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    // Prefer above; only drop below when it doesn't fit up top and there's
    // genuinely more room down below.
    setPlacement(
      spaceAbove < PANEL_ESTIMATE && spaceBelow > spaceAbove ? "bottom" : "top",
    );
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onReflow = () => computePlacement();
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("resize", onReflow);
    window.addEventListener("scroll", onReflow, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("resize", onReflow);
      window.removeEventListener("scroll", onReflow);
    };
  }, [open, computePlacement]);

  const toggle = () => {
    setOpen((wasOpen) => {
      if (!wasOpen) computePlacement();
      return !wasOpen;
    });
  };

  const top = placement === "top";

  return (
    <div ref={wrapRef} className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
        className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-cream/20 px-7 py-4 text-center text-base font-semibold text-cream transition-colors hover:bg-cream/10 sm:w-auto"
      >
        <span
          aria-hidden
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cream/40 text-xs font-bold leading-none"
        >
          ?
        </span>
        {label}
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={label}
          className={`animate-pop-in absolute left-0 z-30 w-full rounded-2xl border border-sand bg-cream p-5 text-left shadow-[0_24px_60px_-20px_rgba(16,39,30,0.55)] sm:w-[22rem] ${
            top ? "bottom-full mb-3" : "top-full mt-3"
          }`}
        >
          <span
            aria-hidden
            className={`absolute left-9 h-4 w-4 rotate-45 rounded-[3px] bg-cream ${
              top
                ? "-bottom-2 border-b border-r border-sand"
                : "-top-2 border-l border-t border-sand"
            }`}
          />
          <p className="relative text-[15px] leading-relaxed text-ink-soft hyphens-auto break-words">
            {body}
          </p>
        </div>
      )}
    </div>
  );
}
