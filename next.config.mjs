/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig = {
  // Fully static site — deployable to GitHub Pages / any static host.
  output: "export",
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
  reactStrictMode: true,
  transpilePackages: ["three"],
};

export default nextConfig;
