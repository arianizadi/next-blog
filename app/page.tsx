import type { Metadata } from "next";
import PosterHome from "@/components/poster/PosterHome";

export const metadata: Metadata = {
  title: "Arian Izadi | Embedded & Systems Software Engineer",
  description:
    "Arian Izadi — Embedded Software Engineer II at Konami Gaming. C/C++, Linux, real-time systems, robotics, and low-level software, presented as an iridescent systems poster.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <PosterHome />;
}
