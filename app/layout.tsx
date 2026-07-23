import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { siteConfig } from "@/app/config/site";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/NavBar";
import { MotionProvider } from "@/components/MotionProvider";
import { SmoothScroll } from "@/components/SmoothScroll";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Arian Izadi | Systems Engineer",
    template: "%s | Arian Izadi",
  },
  description: siteConfig.description,
  keywords: [
    "Arian Izadi",
    "systems engineer",
    "software engineer",
    "robotics perception",
    "backend engineer",
    "computer vision",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    title: "Arian Izadi | Systems Engineer",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Arian Izadi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Arian Izadi | Systems Engineer",
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.url,
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
      className={cn("dark", archivo.variable, jetbrainsMono.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <noscript>
          <style>{`[style]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>
          <SmoothScroll>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <NavBar />
              <main className="flex-1">{children}</main>
            </div>
          </SmoothScroll>
        </MotionProvider>
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
