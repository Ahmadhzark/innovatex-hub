import type { NextConfig } from "next";

/**
 * GitHub Pages project sites are served from https://<user>.github.io/<repo>/
 * so we need a basePath. CI sets NEXT_PUBLIC_BASE_PATH="/innovatex-hub".
 * Locally it stays empty so `npm run dev` works at http://localhost:3000.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Fully static HTML export -> /out, which GitHub Pages serves directly.
  output: "export",
  basePath,
  // Emit /about/index.html instead of /about.html so Pages resolves clean URLs.
  trailingSlash: true,
  images: {
    // next/image's optimizer needs a running server; static export requires this.
    unoptimized: true,
  },
};

export default nextConfig;
