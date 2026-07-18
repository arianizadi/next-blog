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
      "Contributed to open source projects including OctoMap for point-cloud file reading and MasterDnsVPN mobile networking. I am now applying the same reliability mindset to backend systems at Credit One Bank.",
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className="relative pl-14 md:pl-24"
    >
      {/* Node */}
      <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center border border-phosphor/60 bg-background md:left-4">
        <span className="h-1.5 w-1.5 bg-phosphor" />
      </span>

      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/55">
        [{milestone.stamp}]
      </p>
      <div className="mt-3 grid gap-4 border border-border bg-card p-6 transition-colors hover:border-phosphor/30 md:grid-cols-[auto_1fr] md:gap-10 md:p-8">
        <span className="hidden font-mono text-[10px] tracking-[0.2em] text-foreground/40 md:block">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
            {milestone.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {milestone.description}
          </p>
        </div>
      </div>
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
      <div className="px-6 md:px-12">
        <SectionHeader
          index="02"
          label="System Boot Log"
          title="Journey"
          description="From a borrowed C# manual to robotics perception research — the log, unedited."
        />

        <div ref={traceRef} className="relative">
          {/* Signal trace */}
          <div className="absolute bottom-0 left-3 top-0 w-px bg-border md:left-[27px]">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 origin-top bg-phosphor"
            />
          </div>

          <ul className="space-y-10 md:space-y-14">
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
              className="relative pl-14 md:pl-24"
            >
              <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center border border-phosphor bg-background md:left-4">
                <span className="h-1.5 w-1.5 bg-phosphor" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-phosphor">
                [NOW]
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-foreground/60">
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
