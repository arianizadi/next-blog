import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import OpenSource from "@/components/OpenSource";
import CurrentTech from "@/components/CurrentTech";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <Education />
      <OpenSource />
      <CurrentTech />
      <ContactCTA />
    </>
  );
}
