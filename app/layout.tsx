import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://apetit.webbinghub.io"),
  title: "APETIT by WebbingHUB — The digital platform for modern hospitality",
  description:
    "APETIT turns every table into a seamless guest experience. QR-powered ordering, reservations, and a real-time command center for restaurants, cafés and hotels — built and maintained by WebbingHUB.",
  keywords: [
    "HORECA platform",
    "QR ordering",
    "restaurant technology",
    "digital menu",
    "reservations",
    "WebbingHUB",
  ],
  openGraph: {
    title: "APETIT by WebbingHUB",
    description:
      "The digital backbone for restaurants, cafés and hotels. QR ordering, reservations and a real-time command center — built and maintained for you.",
    url: "https://apetit.webbinghub.io",
    siteName: "APETIT by WebbingHUB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
