import type { MetadataRoute } from "next";
import { SITE_URL } from "@/site-config";

// AI assistants and crawlers we explicitly welcome so the brand is discoverable
// inside answer engines (ChatGPT, Claude, Perplexity, Gemini, etc.).
const aiAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everyone — including Googlebot, Bingbot and standard crawlers.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // AI answer engines — full access, no crawl delay.
      {
        userAgent: aiAgents,
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
