import type { NextConfig } from "next";

import { fetchRedirects } from "@/sanity/lib/fetch-redirects";
import { resolve } from "node:path";

// Get workspace root (two levels up from this config file)
const workspaceRoot = resolve(__dirname, "../..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    qualities: [100, 75, 80],
  },

  devIndicators: false,

  async redirects() {
    return await fetchRedirects();
  },

  // Turbopack configuration (only used in dev mode with --turbopack flag)
  // Production builds use webpack which handles the workspace structure correctly
  turbopack: {
    root: workspaceRoot,
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.ts",
      },
    },
  },
};

export default nextConfig;
