import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Listing photos are uploaded to Cloudinary by the backend
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
