"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Sales contact details — single source of truth for the contact popover.
const SALES_EMAIL = "sales@webbinghub.io";
const SALES_PHONE_DISPLAY = "+40 736 394 784";
const SALES_PHONE_TEL = "+40736394784"; // tel: / wa.me want no spaces
const SALES_PHONE_WA = "40736394784"; // wa.me wants digits only, no "+"

// Estimated panel height (px) used to decide whether there's room to open
// upward. Generous so all three options always fit.
const PANEL_ESTIMATE = 280;
const GAP = 12; // px between button and panel

type ReachDict = {
  heading: string;
  email: string;
  call: string;
  whatsapp: string;
};

type Coords = { top: number; left: number; placement: "top" | "bottom" };

// Contact primary action: a button that reveals how to reach us (email, phone
// call, WhatsApp) in a popover. The panel is rendered in a portal so it isn't
// clipped by the contact card's `overflow-hidden`. Opens above the button by
// default and flips below only when there isn't enough room overhead.
export function ContactCta({
  label,
  reach,
}: {
  label: string;
  reach: ReachDict;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => setMounted(true), []);

  const compute = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    const placement: "top" | "bottom" =
      spaceAbove < PANEL_ESTIMATE && spaceBelow > spaceAbove ? "bottom" : "top";
    setCoords({
      placement,
      left: rect.left + rect.width / 2,
      top: placement === "top" ? rect.top - GAP : rect.bottom + GAP,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !btnRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const onReflow = () => compute();
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
  }, [open, compute]);

  const toggle = () => {
    setOpen((wasOpen) => {
      if (!wasOpen) compute();
      return !wasOpen;
    });
  };

  const top = coords?.placement === "top";

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-center text-base font-semibold text-forest-950 shadow-[0_18px_40px_-12px_rgba(184,151,90,0.7)] transition-all hover:bg-gold-400 sm:w-auto"
      >
        {label}
        <ChevronIcon
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {mounted &&
        open &&
        coords &&
        createPortal(
          // Outer wrapper owns the fixed positioning + centering transform.
          // The inner panel runs the pop-in animation — keeping them separate
          // avoids the animation's `transform` clobbering the centering offset
          // (which caused the open-then-jump glitch).
          <div
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: top
                ? "translate(-50%, -100%)"
                : "translate(-50%, 0)",
            }}
            className="z-50"
          >
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-label={label}
              className="animate-pop-in relative w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-sand bg-cream p-4 text-left shadow-[0_24px_60px_-20px_rgba(16,39,30,0.55)]"
            >
              <span
                aria-hidden
                className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-[3px] bg-cream ${
                  top
                    ? "-bottom-2 border-b border-r border-sand"
                    : "-top-2 border-l border-t border-sand"
                }`}
              />

              <p className="relative mb-3 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft/70">
                {reach.heading}
              </p>

              <div className="relative flex flex-col gap-1.5">
              <a
                href={`mailto:${SALES_EMAIL}`}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-forest-900/5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-900/8 text-forest-700">
                  <MailIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-forest-950">
                    {reach.email}
                  </span>
                  <span className="block truncate text-xs text-ink-soft">
                    {SALES_EMAIL}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${SALES_PHONE_TEL}`}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-forest-900/5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-900/8 text-forest-700">
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-forest-950">
                    {reach.call}
                  </span>
                  <span className="block truncate text-xs text-ink-soft">
                    {SALES_PHONE_DISPLAY}
                  </span>
                </span>
              </a>

              <a
                href={`https://wa.me/${SALES_PHONE_WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-forest-900/5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-900/8 text-forest-700">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-forest-950">
                    {reach.whatsapp}
                  </span>
                  <span className="block truncate text-xs text-ink-soft">
                    {SALES_PHONE_DISPLAY}
                  </span>
                </span>
              </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.27-1.38a9.86 9.86 0 0 0 4.77 1.22h.01c5.46 0 9.9-4.44 9.9-9.9a9.84 9.84 0 0 0-2.9-7A9.84 9.84 0 0 0 12.04 2Zm0 1.8a8.06 8.06 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1a8.05 8.05 0 0 1-4.1-1.12l-.3-.18-3.05.8.82-2.97-.2-.31a8.06 8.06 0 0 1-1.27-4.32c0-4.47 3.63-8.1 8.1-8.1Zm-3.2 4.38c-.15 0-.4.06-.6.28-.2.22-.78.76-.78 1.86 0 1.1.8 2.16.9 2.31.12.15 1.57 2.4 3.8 3.36.53.23.95.37 1.27.47.53.17 1.02.15 1.4.09.43-.06 1.32-.54 1.5-1.06.19-.52.19-.96.13-1.06-.06-.09-.2-.15-.43-.27-.22-.11-1.32-.65-1.52-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.17-.48.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.1-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.21-.69-1.66-.18-.43-.36-.37-.5-.38-.13-.01-.28-.01-.43-.01Z" />
    </svg>
  );
}
