import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // GitHub Pages serves this project from /AI-Text-to-Video-Generator.
  output: "export",
  basePath: "/AI-Text-to-Video-Generator",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
