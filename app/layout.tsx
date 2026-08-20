import type { Metadata, Viewport } from "next";
import { Google_Sans, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

import { Providers } from "@/components/providers";
import {
  OG_LOCALE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

import "./globals.css";

/**
 * Google Sans carries headings, the wordmark, statistics, prices and ratings.
 * Inter carries body copy, labels, table cells and long form article text,
 * because it stays legible small and has proper tabular figures.
 */
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: OG_LOCALE,
    siteName: SITE_NAME,
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT
    ? { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={SITE_LOCALE}
      className={`${googleSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "font-sans",
              style: {
                borderRadius: "1rem",
                background: "var(--popover)",
                color: "var(--popover-foreground)",
                border: "1px solid var(--border)",
              },
            }}
          />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
