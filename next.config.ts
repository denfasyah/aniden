import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Konfigurasi Proxy untuk mengatasi masalah CORS
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },

  // 2. Konfigurasi Image untuk mengizinkan gambar dari sumber luar
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.HOST_NAME}`,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;