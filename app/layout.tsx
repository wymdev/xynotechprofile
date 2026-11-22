import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/site";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--ff-display" });
const body = Inter({ subsets: ["latin"], variable: "--ff-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono" });

const description =
  "XynoTech IT Solutions — custom software, web platforms, mobile apps, data analytics, AI and cloud. 9+ years of engineering excellence from Yangon, Myanmar.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "XynoTech — IT Solutions & Software Engineering",
  description,
  keywords: [
    "IT Solutions",
    "Software Development",
    "Web Development",
    "Mobile Apps",
    "Cloud Solutions",
    "Cybersecurity",
    "AI ML",
    "Data Analytics",
    "Power BI",
    "Myanmar",
    "XynoTech",
  ],
  alternates: { canonical: "/" },
  // Search engines may index; AI crawlers are asked not to train on the content.
  robots: "index, follow, noai, noimageai, max-image-preview:large",
  // Link previews (Facebook, Messenger, Telegram, Viber, WhatsApp, LinkedIn, X).
  // Without og:image, apps grab the largest photo on the page instead.
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    title: "XynoTech — Software that defies gravity",
    description: "Web platforms, mobile apps, data dashboards and AI systems — designed, engineered and supported by one focused team.",
    images: [{ ...OG_IMAGE, type: "image/jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "XynoTech — Software that defies gravity",
    description,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = { themeColor: "#05070d", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XynoTech IT Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  description: "Custom software, web platforms, mobile apps, data analytics, AI, cloud and cybersecurity.",
  address: { "@type": "PostalAddress", addressLocality: "Yangon", addressCountry: "MM" },
  sameAs: ["https://linkedin.com/company/xynotech-mm"],
  foundingDate: "2015",
  numberOfEmployees: "1-10",
  areaServed: "Worldwide",
};

/** JSON for an inline <script>: escape "<" so a value can never close the tag (e.g. "</script>"). */
const safeJson = (v: unknown) => JSON.stringify(v).replace(/</g, "\\u003c");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(jsonLd) }} />
      </head>
      <body className="is-loading">{children}</body>
    </html>
  );
}
