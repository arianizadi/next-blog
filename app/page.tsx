import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import OpenSource from "@/components/OpenSource";
import CurrentTech from "@/components/CurrentTech";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryFilter />
      <Experience />
      <Education />
      <OpenSource />
      <CurrentTech />
      <ContactCTA />
    </main>
  );
}
