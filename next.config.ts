import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Image optimization for the "Stunning" photos
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Allow Sanity CDN
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  
};

export default nextConfig;
