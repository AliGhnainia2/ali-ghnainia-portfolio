import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  agentRules: false,
  experimental: { globalNotFound: true },
};

export default nextConfig;
