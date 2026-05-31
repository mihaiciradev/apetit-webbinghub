import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_SHORT_NAME } from "@/site-config";
import { defaultLocale } from "@/i18n-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description:
      "The digital platform for modern hospitality — QR ordering, reservations and a real-time command center for restaurants, cafés and hotels.",
    start_url: `/${defaultLocale}`,
    scope: "/",
    display: "standalone",
    background_color: "#0f271e",
    theme_color: "#0f271e",
    categories: ["business", "food", "productivity"],
    lang: defaultLocale,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    screenshots: [
      {
        src: "/screenshot_desktop.png",
        sizes: "2560x1600",
        type: "image/png",
        form_factor: "wide",
        label: `${SITE_NAME} — desktop`,
      },
      {
        src: "/screenshot_mobile.png",
        sizes: "740x1466",
        type: "image/png",
        form_factor: "narrow",
        label: `${SITE_NAME} — mobile`,
      },
    ],
  };
}
