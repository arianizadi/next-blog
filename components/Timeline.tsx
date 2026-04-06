"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useInView, useReducedMotion } from "framer-motion";
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
  isLast?: boolean;
}

const TypewriterText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || !isInView) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [isInView, currentIndex, text, reduceMotion]);

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-foreground" />
      )}
    </p>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  age,
  year,
  title,
  description,
  icon,
  index,
  isLast = false
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
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={fadeUpTransition(reduceMotion)}
            whileHover={
              reduceMotion ? undefined : { y: -5, transition: { duration: 0.2 } }
            }
            className={`card-surface group relative rounded-2xl p-6 transition-all duration-300 md:p-8 ${
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
                    {year && <span className="text-muted-foreground">• {year}</span>}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = scrollYProgress;

  const milestones = [
    {
      age: 12,
      title: "C# Beginnings",
      description: "My journey into coding began when my father handed me a C# programming manual from a friend. What started as simple curiosity quickly transformed into a lifelong obsession with building and understanding software at its core.",
      icon: <Terminal size={24} />,
    },
    {
      age: 14,
      title: "Reverse Shells",
      description: "Diving into the world of offensive security, I spent my nights configuring VMs to attack on BackTrack Linux. I successfully executed my first reverse shells, learning how systems talk and how they can be made to listen.",
      icon: <Shield size={24} />,
    },
      {
        age: 15,
        title: "WiFi Cracking",
        description: "When my father changed the WiFi password, I taught myself to capture the 4 way handshake (using a few deauth packets) and use a dictionary to crack it, just so my brother and I could play games again.",
        icon: <Wifi size={24} />,
      },
    {
      age: 17,
      title: "Plz Don't Watch Me",
      description: "Back in high school, I got so tired of the school's monitoring software watching everything I did. So, I built my own little program that used a UAC bypass to kill the monitoring app whenever I wanted to play games with friends. When I was done, I'd just restart it like nothing ever happened.",
      icon: <Zap size={24} />,
    },
      {
        age: 19,
        title: "I Am Not a Robot",
        description: "Capitalized on high demand releases by building automation tools for the sneaker and streetwear world. I developed techniques to boost the human score of Gmail accounts, reducing the likelihood of encountering captchas and increasing success rates for limited edition drops.",
        icon: <ShoppingBag size={24} />,
      },
      {
        age: 22,
        year: 2022,
        title: "Autonomous Vehicles",
        description: "Represented the United States in Romania for an international autonomous vehicle competition hosted by Bosch. It was here that I got introduced to embedded systems, and I went with four guys who became some of my closest computer science friends.",
        icon: <Car size={24} />,
      },
      {
        age: 24,
        year: 2024,
        title: "Academic Milestone",
        description: "Earned my B.S. in Computer Science and transitioned into my Master's degree. Won CyberFire CTF (1st Place) and ranked Top 8% nationally in NCL CTF competitions.",
        icon: <GraduationCap size={24} />,
      },
      {
        age: 25,
        year: 2025,
        title: "The Researcher & Systems Engineer",
        description: "Currently pursuing my M.S. at UNLV, specializing in deep learning for semantic segmentation. Serving as President of Layer Zero, UNLV's hacking/CTF club. My work on autonomous vehicles and invaluable mentorship at Koshee.ai sparked my passion for systems programming and applying cutting edge research to real world problems.",
        icon: <Brain size={24} />,
      },
      {
        age: 25,
        year: 2025,
        title: "Open Source & Industry Impact",
        description: "Made meaningful contributions to open source projects including Octomap (PCD file reading) and CVAT (Z layer controls, point cloud slider). Building tools that help the broader robotics and computer vision community.",
        icon: <Code size={24} />,
      },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-background py-32">
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
          text="From a naive kid to a passionate systems engineer and researcher"
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
            isLast={index === milestones.length - 1}
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
          To be continued...
        </h3>

        <p className="text-xl font-light leading-relaxed text-muted-foreground">
          The same naive curiosity that started with a C# book still drives me today.
          Whether it&apos;s deep learning research or systems engineering, I&apos;m still that
          kid who just wants to see how things work, and make them work better.
        </p>
      </motion.div>

      {/* Bottom fade out */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default Timeline;
