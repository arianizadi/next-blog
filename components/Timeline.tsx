"use client";

import React, { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { Terminal, Wifi, Shield, ShoppingBag, Car, GraduationCap, Brain, Zap, Code } from "lucide-react";
import {
  defaultViewport,
  fadeUpTransition,
  revealMotionProps,
} from "@/lib/motion";

interface TimelineItemProps {
  age: number;
  year?: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const TypewriterText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => <p className={className}>{text}</p>;

const TimelineItem: React.FC<TimelineItemProps> = ({
  age,
  year,
  title,
  description,
  icon,
  index,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div ref={itemRef} className="relative mb-16 flex items-center justify-center md:mb-32">
      <div
        className={`relative flex w-full max-w-5xl items-center ${
          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Content Card */}
        <div className="w-full flex-1 pl-16 md:pl-0">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={fadeUpTransition(reduceMotion)}
            whileHover={{
              y: reduceMotion ? 0 : -5,
              transition: { duration: reduceMotion ? 0 : 0.2 },
            }}
            className={`card-surface group relative rounded-lg p-6 transition-all duration-300 md:p-8 ${
              index % 2 === 0 ? "md:mr-12" : "md:ml-12"
            }`}
          >
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="relative shrink-0">
                  <div className="relative p-3 bg-card rounded-xl text-foreground/60 border border-border group-hover:text-foreground transition-colors">
                    {icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-display text-foreground group-hover:text-foreground/80 transition-colors">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-foreground bg-foreground/10 px-2 py-0.5 rounded">Age {age}</span>
                    {year && <span className="text-muted-foreground">/ {year}</span>}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline dot */}
        <div className="absolute left-8 md:relative md:left-0 transform -translate-x-1/2 md:translate-x-0 md:flex z-20 items-center justify-center w-12">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-foreground rounded-full border-2 md:border-4 border-background" />
        </div>

        {/* Empty space for desktop layout */}
        <div className="hidden md:block flex-1" />
      </div>
    </div>
  );
};

const Timeline = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const pathLength = scrollYProgress;

  const milestones = [
    {
      age: 12,
      title: "C# Beginnings",
      description: "My journey into coding began when my father handed me a C# programming manual from a friend. Curiosity turned into a lasting habit of building software and then digging into how it works underneath.",
      icon: <Terminal size={24} />,
    },
    {
      age: 14,
      title: "Security Labs",
      description: "I started learning security in isolated virtual machines with BackTrack Linux, using intentionally vulnerable targets to understand networking, shells, and how small configuration mistakes become system risk.",
      icon: <Shield size={24} />,
    },
      {
        age: 15,
        title: "Wireless Protocols",
        description: "Home networking problems pushed me to learn how WPA handshakes, packet capture, and password strength work. The useful lesson was not bypassing a network, but understanding why wireless security depends on protocol details and responsible authorization.",
        icon: <Wifi size={24} />,
      },
    {
      age: 17,
      title: "Privilege Boundaries",
      description: "Endpoint restrictions made me curious about process privileges, Windows internals, and why bypasses are treated seriously. That curiosity eventually moved into CTFs, lab machines, and a clearer respect for authorization and disclosure boundaries.",
      icon: <Zap size={24} />,
    },
      {
        age: 19,
        title: "Automation Systems",
        description: "High-demand ecommerce releases introduced me to queues, rate limits, anti-abuse systems, browser automation, and distributed coordination. It was a messy but formative way to learn why production systems defend against automation and how resilient workflows are designed.",
        icon: <ShoppingBag size={24} />,
      },
      {
        age: 22,
        year: 2022,
        title: "Autonomous Vehicles",
        description: "Represented the United States in Romania for an international autonomous vehicle competition hosted by Bosch. That experience introduced me to embedded systems, robotics constraints, and the engineering friendships that shaped my direction.",
        icon: <Car size={24} />,
      },
      {
        age: 24,
        year: 2024,
        title: "Academic Milestone",
        description: "Earned my B.S. in Computer Science and transitioned into my Master's degree. Around the same period, I won CyberFire CTF and ranked in the top 8% nationally in NCL CTF competitions.",
        icon: <GraduationCap size={24} />,
      },
      {
        age: 25,
        year: 2025,
        title: "The Researcher & Systems Engineer",
        description: "Now pursuing my M.S. at UNLV with research in deep learning for semantic segmentation. Work on autonomous vehicles and mentorship at Koshee AI pushed me toward systems programming, robotics perception, and applied research.",
        icon: <Brain size={24} />,
      },
      {
        age: 25,
        year: 2025,
        title: "Open Source & Industry Impact",
        description: "Contributed to open source projects including OctoMap for point-cloud file reading and CVAT for annotation tooling. I am now applying the same reliability mindset to backend systems at Credit One Bank.",
        icon: <Code size={24} />,
      },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background py-32">
      {/* Header */}
      <motion.div
        className="relative z-10 mx-auto mb-20 max-w-6xl px-6"
        {...revealMotionProps(reduceMotion)}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-4">01 / Journey</p>
        <h2 className="mb-3 font-display text-4xl md:text-5xl text-foreground">
          My Journey
        </h2>
        <TypewriterText
          text="From curiosity-driven tinkering to systems engineering, robotics perception, and security-minded software."
          className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground"
        />
      </motion.div>

      {/* Main Timeline Body */}
      <div className="relative px-4 max-w-7xl mx-auto">
        {/* The Animated Line */}
        <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-border">
          <motion.div
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute inset-0 w-full bg-foreground"
          />
        </div>

        {milestones.map((milestone, index) => (
          <TimelineItem
            key={index}
            {...milestone}
            index={index}
          />
        ))}
      </div>

      {/* Conclusion Section */}
      <motion.div
        className="relative z-10 mx-auto mb-20 mt-32 max-w-2xl px-6 text-center"
        {...revealMotionProps(reduceMotion)}
      >
        <div className="relative mb-8 inline-block">
          <div className="relative rounded-full border border-border bg-card p-6">
            <Zap className="h-10 w-10 text-foreground/60" />
          </div>
        </div>

        <h3 className="mb-6 text-3xl font-display text-foreground md:text-4xl">
          To be continued
        </h3>

        <p className="text-xl font-light leading-relaxed text-muted-foreground">
          The same curiosity that started with a C# book still drives the work:
          understand the system, respect the constraints, and build something
          reliable enough to matter.
        </p>
      </motion.div>

      {/* Bottom fade out */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default Timeline;
