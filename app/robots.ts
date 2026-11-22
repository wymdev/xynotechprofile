import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

export const dynamic = "force-static";

// Search engines are welcome; AI-training and bulk-scraping crawlers are not.
const BLOCKED = [
  "GPTBot", "ChatGPT-User", "OAI-SearchBot", "CCBot", "ClaudeBot", "Claude-Web", "anthropic-ai",
  "Google-Extended", "Applebot-Extended", "Bytespider", "Amazonbot", "PerplexityBot",
  "meta-externalagent", "FacebookBot", "Diffbot", "ImagesiftBot", "Omgilibot", "cohere-ai",
  "AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "DataForSeoBot", "PetalBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/_next/" },
      { userAgent: BLOCKED, disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
