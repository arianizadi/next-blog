"use client";

import React, { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
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
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className="relative pl-10 md:pl-20"
    >
      {/* Node */}
      <span
        aria-hidden
        className="absolute left-[-4.5px] top-3 h-[7px] w-[7px] rounded-full bg-accent md:left-[-4.5px]"
      />

      <p className="font-serif text-base italic text-muted-foreground md:text-lg">
        {milestone.stamp}
      </p>
      <div className="mt-2 grid gap-3 md:grid-cols-[auto_1fr] md:gap-10">
        <span className="hidden font-serif text-base italic tabular-nums text-muted-foreground/70 md:block">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="max-w-3xl">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-tight tracking-tight text-foreground">
            {milestone.title}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-muted-foreground md:text-base md:leading-8">
            {milestone.description}
          </p>
        </div>
      </div>
    </motion.li>
  );
};

const Timeline = () => {
  const traceRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: traceRef,
    offset: ["start 0.7", "end 0.65"],
  });

  return (
    <div className="relative min-h-dvh bg-background pb-32 pt-32 md:pt-44">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <header>
          <p className="font-serif text-lg italic text-muted-foreground md:text-xl">
            Journey
          </p>
          <h1 className="mt-6 max-w-4xl text-statement font-light text-foreground">
            From a borrowed C# manual to robotics perception research
            <span className="text-accent">.</span>
          </h1>
        </header>

        <div ref={traceRef} className="relative mt-16 md:mt-24">
          {/* Reading trace */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-px bg-border"
          >
            <motion.div
              style={reduceMotion ? undefined : { scaleY: scrollYProgress }}
              className="absolute inset-0 origin-top bg-accent"
            />
          </div>

          <ul className="space-y-14 md:space-y-20">
            {MILESTONES.map((milestone, index) => (
              <LogEntry
                key={`${milestone.stamp}-${milestone.title}`}
                milestone={milestone}
                index={index}
              />
            ))}

            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative pl-10 md:pl-20"
            >
              <span
                aria-hidden
                className="absolute left-[-4.5px] top-3 h-[7px] w-[7px] rounded-full bg-accent"
              />
              <p className="font-serif text-base italic text-accent md:text-lg">
                Now
              </p>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-foreground/80 md:text-base md:leading-8">
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
