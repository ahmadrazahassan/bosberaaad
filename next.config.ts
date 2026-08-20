import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "www.google.com", pathname: "/s2/favicons/**" },
      ...(supabaseHost
        ? ([{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }] as const)
        : []),
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "radix-ui"],
  },
};

export default nextConfig;
