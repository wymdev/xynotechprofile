import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--ff-display" });
const body = Inter({ subsets: ["latin"], variable: "--ff-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono" });

const description =
  "XynoTech IT Solutions — custom software, web platforms, mobile apps, data analytics, AI and cloud. 9+ years of engineering excellence from Yangon, Myanmar.";

export const metadata: Metadata = {
  metadataBase: new URL("https://xynotechmm.com"),
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
  openGraph: {
    type: "website",
    url: "https://xynotechmm.com",
    title: "XynoTech — Software that defies gravity",
    description: "Web platforms, mobile apps, data dashboards and AI systems — designed, engineered and supported by one focused team.",
  },
  twitter: { card: "summary", title: "XynoTech — Software that defies gravity", description },
};

export const viewport: Viewport = { themeColor: "#05070d", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XynoTech IT Solutions",
  url: "https://xynotechmm.com",
  logo: "https://xynotechmm.com/icon.svg",
  description: "Custom software, web platforms, mobile apps, data analytics, AI, cloud and cybersecurity.",
  email: "support@xynotechmm.com",
  telephone: "+959454375116",
  address: { "@type": "PostalAddress", addressLocality: "Yangon", addressCountry: "MM" },
  sameAs: ["https://linkedin.com/company/xynotech-mm"],
  foundingDate: "2015",
  numberOfEmployees: "1-10",
  areaServed: "Worldwide",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="is-loading">{children}</body>
    </html>
  );
}
