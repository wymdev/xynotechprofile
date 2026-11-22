/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export: `npm run build` writes the whole site to ./out (served by nginx / cPanel).
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
