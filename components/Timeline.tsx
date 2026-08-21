"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { easeOutExpo } from "@/lib/motion";

interface Milestone {
  stamp: string;
  title: string;
  description: string;
}

const MILESTONES: Milestone[] = [
  {
    stamp: "AGE 12",
    title: "C# Beginnings",
    description:
      "My journey into coding began when my father handed me a C# programming manual from a friend. Curiosity turned into a lasting habit of building software and then digging into how it works underneath.",
  },
  {
    stamp: "AGE 14",
    title: "Security Labs",
    description:
      "I started learning security in isolated virtual machines with BackTrack Linux, using intentionally vulnerable targets to understand networking, shells, and how small configuration mistakes become system risk.",
  },
  {
    stamp: "AGE 15",
    title: "Wireless Protocols",
    description:
      "Home networking problems pushed me to learn how WPA handshakes, packet capture, and password strength work. The useful lesson was not bypassing a network, but understanding why wireless security depends on protocol details and responsible authorization.",
  },
  {
    stamp: "AGE 17",
    title: "Privilege Boundaries",
    description:
      "Endpoint restrictions made me curious about process privileges, Windows internals, and why bypasses are treated seriously. That curiosity eventually moved into CTFs, lab machines, and a clearer respect for authorization and disclosure boundaries.",
  },
  {
    stamp: "AGE 19",
    title: "Automation Systems",
    description:
      "High-demand ecommerce releases introduced me to queues, rate limits, anti-abuse systems, browser automation, and distributed coordination. It was a messy but formative way to learn why production systems defend against automation and how resilient workflows are designed.",
  },
  {
    stamp: "2022 · AGE 22",
    title: "Autonomous Vehicles",
    description:
      "Represented the United States in Romania for an international autonomous vehicle competition hosted by Bosch. That experience introduced me to embedded systems, robotics constraints, and the engineering friendships that shaped my direction.",
  },
  {
    stamp: "2024 · AGE 24",
    title: "Academic Milestone",
    description:
      "Earned my B.S. in Computer Science and transitioned into my Master's degree. Around the same period, I won CyberFire CTF and ranked in the top 8% nationally in NCL CTF competitions.",
  },
  {
    stamp: "2025 · AGE 25",
    title: "The Researcher & Systems Engineer",
    description:
      "Now pursuing my M.S. at UNLV with research in deep learning for semantic segmentation. Work on autonomous vehicles and mentorship at Koshee AI pushed me toward systems programming, robotics perception, and applied research.",
  },
  {
    stamp: "2025 · AGE 25",
    title: "Open Source & Industry Impact",
    description:
      "Contributed to open source projects including OctoMap for point-cloud file reading and MasterDnsVPN mobile networking, then carried the same reliability mindset into event-driven banking systems at Credit One Bank.",
  },
  {
    stamp: "2026 · AGE 26",
    title: "Embedded R&D at Konami",
    description:
      "Joined Konami Gaming as an Embedded Software Engineer II, building production C/C++ components integrated with embedded hardware and manufacturing systems.",
  },
];

const LogEntry = ({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: easeOutExpo }}
      className="relative pl-12 md:pl-24"
    >
      {/* Gauge mark on the spine */}
      <span
        aria-hidden
        className="absolute left-0 top-[7px] h-px w-6 bg-signal/80 md:left-2 md:w-8"
      />

      <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
        <span className="mr-3 text-signal">
          {String(index + 1).padStart(2, "0")}
        </span>
        {milestone.stamp}
      </p>
      <div className="mt-4">
        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {milestone.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {milestone.description}
        </p>
      </div>
      <div aria-hidden className="mt-8 h-px max-w-2xl bg-border" />
    </motion.li>
  );
};

const Timeline = () => {
  const traceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: traceRef,
    offset: ["start 0.7", "end 0.65"],
  });

  return (
    <div className="relative min-h-screen bg-background pb-32 pt-32 md:pt-40">
      <div className="lab-container">
        <SectionHeader
          index="J"
          label="Running log"
          title="Journey"
          level="h1"
          description="From a borrowed C# manual to robotics perception research — the record, in order."
        />

        <div ref={traceRef} className="relative">
          {/* Measurement spine */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-border md:left-2">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 origin-top bg-signal"
            />
          </div>

          <ul className="space-y-12 md:space-y-16">
            {MILESTONES.map((milestone, index) => (
              <LogEntry
                key={milestone.title}
                milestone={milestone}
                index={index}
              />
            ))}

            {/* Still running */}
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative pl-12 md:pl-24"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[7px] h-px w-6 bg-signal md:left-2 md:w-8"
              />
              <p className="font-mono text-[11px] tracking-[0.14em] text-signal">
                Now
              </p>
              <p className="mt-4 max-w-xl font-serif text-lg italic leading-8 text-muted-foreground">
                The same curiosity that started with a C# book still drives the
                work: understand the system, respect the constraints, and build
                something reliable enough to matter.
              </p>
            </motion.li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
