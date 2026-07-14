import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/career",
        destination: "https://bforc-career.vercel.app",
      },
      {
        source: "/career/:path*",
        destination: "https://bforc-career.vercel.app/:path*",
      },
      {
        source: "/career-assets/:path*",
        destination: "https://bforc-career.vercel.app/career-assets/:path*",
      },
    ];
  },
};

export default nextConfig;
