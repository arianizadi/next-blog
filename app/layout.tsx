import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { siteConfig } from "@/app/config/site";
import { cn } from "@/lib/utils";
import { Masthead } from "@/components/monograph/Masthead";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Arian Izadi | Embedded & Systems Software Engineer",
    template: "%s | Arian Izadi",
  },
  description: siteConfig.description,
  keywords: [
    "Arian Izadi",
    "embedded software engineer",
    "systems software engineer",
    "C",
    "C++",
    "Linux",
    "real-time systems",
    "robotics",
    "low-level software",
    "RISC-V",
    "Rust",
    "hardware integration",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    title: "Arian Izadi | Embedded & Systems Software Engineer",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Arian Izadi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Arian Izadi | Embedded & Systems Software Engineer",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(manrope.variable, instrumentSerif.variable, jetbrainsMono.variable)}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-200 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Masthead />
        <main id="main" className="relative">
          {children}
        </main>
        <SpeedInsights />
        <Analytics />
        <Script
          src="https://umami.arianizadi.com/script.js"
          strategy="afterInteractive"
          data-website-id="55e8a407-c2db-4928-a81e-cc207eb1bc47"
        />
      </body>
    </html>
  );
}
