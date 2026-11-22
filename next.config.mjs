/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export: `npm run build` writes the whole site to ./out for cPanel hosting.
  output: "export",
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
};

export default nextConfig;
