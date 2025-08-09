import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  typescript: {
    // ignoreBuildErrors: true,
  },
  images: {
    domains: ["jsonplaceholder.org"],
  },

  experimental: {
    allowedDevOrigins: [
      "81332061-acdb-4022-882c-bacf5daf8c5c-00-3rzykuotvhem5.pike.replit.dev"
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://jsonplaceholder.org/:path*",
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: "@svgr/webpack" }],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
