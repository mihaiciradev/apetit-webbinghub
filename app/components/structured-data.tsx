import type { Locale } from "@/i18n-config";
import { SITE_URL, SITE_NAME, SITE_SHORT_NAME, localeUrl } from "@/site-config";

type FaqItem = { q: string; a: string };

// Server-rendered JSON-LD so search engines and AI answer engines can parse a
// structured description of the brand, site, service and FAQ. Deliberately
// contains no pricing — only what the platform is, who it serves, and where.
export function StructuredData({
  locale,
  title,
  description,
  faq,
}: {
  locale: Locale;
  title: string;
  description: string;
  faq: readonly FaqItem[];
}) {
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const serviceId = `${SITE_URL}/#service`;

  // Geo focus: we start in Timișoara / Timiș, Romania and serve the rest of
  // Europe. Kept in the schema (locale-independent) so local intent resolves
  // regardless of the UI language the visitor browses in.
  const areaServed = [
    { "@type": "City", name: "Timișoara" },
    { "@type": "AdministrativeArea", name: "Timiș" },
    { "@type": "Country", name: "Romania" },
    { "@type": "Place", name: "Europe" },
  ];

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        description,
        sameAs: ["https://webbinghub.io"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Timișoara",
          addressRegion: "Timiș",
          addressCountry: "RO",
        },
        areaServed,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description,
        inLanguage: locale,
        publisher: { "@id": orgId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: SITE_SHORT_NAME,
        serviceType: "QR ordering and reservation platform for hospitality",
        description,
        provider: { "@id": orgId },
        areaServed,
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Restaurants, cafés and hotels",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${localeUrl(locale)}#webpage`,
        url: localeUrl(locale),
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": serviceId },
      },
      {
        "@type": "FAQPage",
        "@id": `${localeUrl(locale)}#faq`,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
