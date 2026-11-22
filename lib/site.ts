// Public address of the site. Used for share previews (Open Graph), canonical URL,
// sitemap and robots.txt. Override at build time with NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://xynotechmm.online").replace(/\/+$/, "");

export const SITE_NAME = "XynoTech";
export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "XynoTech — We build software that defies gravity." };
