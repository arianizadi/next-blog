import type { Metadata } from "next";
import { JetBrains_Mono, Nunito, Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/NavBar";
import { CategoryProvider } from "@/contexts/CategoryContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Arian Izadi | Systems Engineer",
  description: "Systems engineer specializing in real time embedded systems, robotics, and distributed data infrastructure. M.S. Computer Science @ UNLV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          plusJakartaSans.variable,
          nunito.variable,
          jetbrainsMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col bg-background">
            <NavBar />
            <main className="flex-1">
              <CategoryProvider>{children}</CategoryProvider>
            </main>
            <SpeedInsights />
            <Analytics />
          </div>
        </ThemeProvider>
        <script defer src="https://umami.arianizadi.com/script.js" data-website-id="55e8a407-c2db-4928-a81e-cc207eb1bc47"></script>
      </body>
    </html>
  );
}
