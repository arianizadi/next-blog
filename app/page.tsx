import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Work, { AdditionalWork } from "@/components/Work";
import About from "@/components/About";
import CapabilityMatrix from "@/components/CapabilityMatrix";
import Contact from "@/components/Contact";
import { contributions, experiences, projects } from "@/lib/portfolio";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const INDEX_CELLS: [string, string][] = [
  [String(experiences.length).padStart(2, "0"), "Roles"],
  [String(projects.length).padStart(2, "0"), "Projects"],
  [String(contributions.length).padStart(2, "0"), "OSS patches"],
  ["M.S. + B.S.", "UNLV Computer Science"],
];

const DocIndexStrip = () => (
  <section aria-label="Portfolio index" className="border-y border-border">
    <dl className="grid grid-cols-2 gap-px border-border bg-border md:grid-cols-4">
      {INDEX_CELLS.map(([value, label]) => (
        <div key={label} className="bg-background px-6 py-5 md:px-8">
          <dt className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {label}
          </dt>
          <dd className="mt-2 font-display text-2xl leading-none text-foreground md:text-3xl">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <DocIndexStrip />
      <Experience />
      <Work />
      <CapabilityMatrix />
      <AdditionalWork />
      <About />
      <Contact />
    </>
  );
}
