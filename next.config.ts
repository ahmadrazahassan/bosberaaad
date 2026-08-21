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

  /**
   * Sage renamed Sage Business Cloud Payroll to Sage Payroll, so our slug
   * followed. These keep the old URLs alive rather than letting them 404 and
   * lose whatever they had ranked for.
   *
   * The redirects table in Supabase would normally carry this, but it is only
   * consulted when a database is configured, and the site runs without one.
   */
  async redirects() {
    return [
      {
        source: "/software/sage-business-cloud-payroll",
        destination: "/software/sage-payroll",
        permanent: true,
      },
      {
        source: "/software/sage-business-cloud-payroll/:path*",
        destination: "/software/sage-payroll/:path*",
        permanent: true,
      },
      // Comparison URLs carry both product slugs, in either order.
      {
        source: "/compare/:before-vs-sage-business-cloud-payroll",
        destination: "/compare/:before-vs-sage-payroll",
        permanent: true,
      },
      {
        source: "/compare/sage-business-cloud-payroll-vs-:after",
        destination: "/compare/sage-payroll-vs-:after",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
