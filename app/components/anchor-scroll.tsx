"use client";

import { useEffect } from "react";
import { snapLock } from "./scroll-snap-lock";

// Intercepts in-page anchor clicks (href="#section"). The hero sits above a
// 300vh scroll-snapping 3D section; a native jump to a target below it lets the
// snap "grab" the scroll mid-flight and strand you on a beat. We suspend the
// snap (via the shared lock + clearing scroll-snap-type) for the duration of the
// programmatic scroll, then release it once the page has settled.
export function AnchorScroll() {
  useEffect(() => {
    const html = document.documentElement;
    let raf = 0;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = decodeURIComponent(href.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();

      snapLock.set(true);
      html.style.scrollSnapType = "none";
      history.replaceState(null, "", href);

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });

      // Release the lock once the scroll has come to rest, then nudge the
      // dinner-section to re-evaluate whether it should snap.
      let last = window.scrollY;
      let stableFrames = 0;
      cancelAnimationFrame(raf);
      const watch = () => {
        const y = window.scrollY;
        if (Math.abs(y - last) < 1.5) {
          if (++stableFrames > 6) {
            snapLock.set(false);
            window.dispatchEvent(new Event("scroll"));
            return;
          }
        } else {
          stableFrames = 0;
        }
        last = y;
        raf = requestAnimationFrame(watch);
      };
      raf = requestAnimationFrame(watch);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
