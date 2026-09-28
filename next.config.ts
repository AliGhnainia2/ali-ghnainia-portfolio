import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  agentRules: false,
  experimental: { globalNotFound: true },
  // The portrait is served unoptimized at its declared quality; list it so Next accepts quality={100}.
  images: { qualities: [100] },
};

export default nextConfig;
