import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Work, { AdditionalWork } from "@/components/Work";
import About from "@/components/About";
import CapabilityMatrix from "@/components/CapabilityMatrix";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Work />
      <CapabilityMatrix />
      <AdditionalWork />
      <About />
      <Contact />
    </>
  );
}
