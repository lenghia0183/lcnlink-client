import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  typescript: {
    // ignoreBuildErrors: true,
  },
  images: {
    domains: ["jsonplaceholder.org", "chart.googleapis.com"],
  },
  // Fix cross-origin requests in development
  allowedDevOrigins: ["127.0.0.1"],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: "@svgr/webpack" }],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
