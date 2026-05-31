import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, defaultLocale, isLocale } from "@/i18n-config";
import { SITE_URL, SITE_NAME, TWITTER_HANDLE, localeUrl, ogLocale } from "@/site-config";
import { getDictionary } from "./dictionaries";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    colorScheme: "light dark",
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#f3ece0" },
      { media: "(prefers-color-scheme: dark)", color: "#0f271e" },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = await getDictionary(locale);

  // hreflang alternates: every locale + an x-default for unmatched languages.
  const languages: Record<string, string> = {
    "x-default": localeUrl(defaultLocale),
  };
  for (const l of locales) languages[l] = localeUrl(l);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s · ${SITE_NAME}`,
    },
    description: meta.description,
    applicationName: SITE_NAME,
    keywords: meta.keywords,
    authors: [{ name: "WebbingHUB", url: "https://webbinghub.io" }],
    creator: "WebbingHUB",
    publisher: "WebbingHUB",
    category: "technology",
    alternates: {
      canonical: localeUrl(locale),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      url: localeUrl(locale),
      locale: ogLocale[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale[l]),
      images: [
        {
          url: "/metadata-social.png",
          width: 1200,
          height: 630,
          alt: meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      images: [{ url: "/metadata-social.png", alt: meta.ogAlt }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/icon.svg" }],
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
