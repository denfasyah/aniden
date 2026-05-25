import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "otakudesu.blog",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
