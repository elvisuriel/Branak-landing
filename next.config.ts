import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  output: "standalone",
  // Removemos la parte experimental que está causando el error
};

export default nextConfig;