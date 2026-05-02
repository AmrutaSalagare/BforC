import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow mobile testing on the local network
  // @ts-ignore: This option exists in newer Next.js versions for dev environments
  allowedDevOrigins: ["10.136.158.247"],
};

export default nextConfig;
