import type { Metadata } from "next";
import { Hero } from "@/components/monograph/Hero";
import { ProjectGallery, WorkAppendix } from "@/components/monograph/ProjectGallery";
import { ExperienceColophon } from "@/components/monograph/ExperienceColophon";
import { MaterialsSpread } from "@/components/monograph/MaterialsSpread";
import { Colophon } from "@/components/monograph/Colophon";
import { ContactSpread } from "@/components/monograph/ContactSpread";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectGallery />
      <WorkAppendix />
      <ExperienceColophon />
      <MaterialsSpread />
      <Colophon />
      <ContactSpread />
    </>
  );
}
