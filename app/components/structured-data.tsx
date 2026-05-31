import type { Locale } from "@/i18n-config";
import { SITE_URL, SITE_NAME, SITE_SHORT_NAME, localeUrl } from "@/site-config";

// Server-rendered JSON-LD so search engines and AI answer engines can parse a
// structured description of the brand, site and service. Deliberately contains
// no pricing — only what the platform is and who it serves.
export function StructuredData({
  locale,
  title,
  description,
}: {
  locale: Locale;
  title: string;
  description: string;
}) {
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const serviceId = `${SITE_URL}/#service`;

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
        serviceType: "Hospitality technology platform",
        description,
        provider: { "@id": orgId },
        areaServed: "Worldwide",
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
