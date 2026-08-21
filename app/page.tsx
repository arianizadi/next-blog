import type { Metadata } from "next";
import { CinemaReel } from "@/components/cinema/CinemaReel";
import { slides } from "@/lib/reel";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arian Izadi | Embedded & Systems Software Engineer",
    description:
      "A cinematic reel of selected work: C/C++, Linux, real-time systems, robotics, LiDAR, bare-metal RISC-V, Rust, and networking.",
  },
};

export default function Home() {
  return <CinemaReel slides={slides} />;
}
