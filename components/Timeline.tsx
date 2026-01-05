"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Terminal, Wifi, Shield, ShoppingBag, Car, GraduationCap, Brain, Zap } from "lucide-react";

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30); // Typing speed

      return () => clearTimeout(timeout);
    }
  }, [isInView, currentIndex, text]);

  return (
    <p ref={ref} className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-5 bg-purple-500 ml-1 animate-pulse" />
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
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.8, 1, 1]);
  const x = useTransform(
    scrollYProgress, 
    [0, 0.4], 
    index % 2 === 0 ? [-50, 0] : [50, 0]
  );

  return (
    <div ref={itemRef} className="relative flex items-center justify-center mb-16 md:mb-32">
      <motion.div 
        style={{ opacity, scale, x }}
        className={`relative flex items-center w-full max-w-5xl ${
          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Content Card */}
        <div className="flex-1 w-full pl-16 md:pl-0">
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`relative group bg-zinc-900/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-2xl ${
              index % 2 === 0 ? "md:mr-12" : "md:ml-12"
            }`}
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                  <div className="relative p-3 bg-zinc-800/80 rounded-xl text-purple-400 border border-white/5 group-hover:text-purple-300 transition-colors">
                    {icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-100 transition-colors">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">Age {age}</span>
                    {year && <span className="text-zinc-500">• {year}</span>}
                  </div>
                </div>
              </div>
              <p className="text-zinc-400 leading-relaxed text-base md:text-lg">
                {description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline dot with pulse */}
        <div className="absolute left-8 md:relative md:left-0 transform -translate-x-1/2 md:translate-x-0 md:flex z-20 items-center justify-center w-12">
          <motion.div 
            style={{ scale: useTransform(scrollYProgress, [0, 0.5], [0.5, 1.2]) }}
            className="w-4 h-4 md:w-5 md:h-5 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] border-2 md:border-4 border-black"
          >
            <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-40" />
          </motion.div>
        </div>

        {/* Empty space for desktop layout */}
        <div className="hidden md:block flex-1" />
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      description: "Diving into the world of offensive security, I spent my nights configuring VMS to attack on BackTrack Linux. I successfully executed my first reverse shells, learning how systems talk and how they can be made to listen.",
      icon: <Shield size={24} />,
    },
      {
        age: 15,
        title: "WiFi Cracking",
        description: "When my father changed the WiFi password, I taught myself to capture the 4 way handshake (using a few deauth packets) and use a dictionary to crack it - just so my brother and I could play games again.",
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
        description: "Capitalized on high-demand releases by building automation tools for the sneaker and streetwear world. I developed techniques to boost the human score of Gmail accounts, reducing the likelihood of encountering captchas and increasing success rates for limited edition drops.",
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
        description: "Earned my B.S. in Computer Science and transitioned into my Master's degree. I began focusing my technical depth on semantic segmentation, training machines to perceive and understand the world through computer vision.",
        icon: <GraduationCap size={24} />,
      },
      {
        age: 25,
        year: 2025,
        title: "The Researcher & Systems Engineer",
        description: "Currently pursuing my M.S. at UNLV, specializing in deep learning for semantic segmentation. My work on autonomous vehicles and invaluable mentorship at Koshee.ai sparked my passion for systems programming and applying cutting edge research to real world problems.",
        icon: <Brain size={24} />,
      },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black py-32 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-32 relative z-10"
      >
        <h2 className="text-purple-500 font-mono text-sm tracking-widest uppercase mb-4">Evolution</h2>
        <h1 className="text-5xl md:text-7xl font-extrabold pb-2 mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          My Journey
        </h1>
        <TypewriterText 
          text="From a naive kid to a passionate systems engineer and researcher"
          className="text-xl text-zinc-400 max-w-2xl mx-auto px-4 font-light leading-relaxed"
        />
      </motion.div>

      {/* Main Timeline Body */}
      <div className="relative px-4 max-w-7xl mx-auto">
        {/* The Animated Line */}
        <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-zinc-800">
          <motion.div 
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute inset-0 w-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent"
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mt-32 mb-20 relative z-10"
      >
        <div className="inline-block relative mb-8">
          <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full" />
          <div className="relative p-6 bg-zinc-900/50 rounded-full border border-purple-500/30 backdrop-blur-xl">
            <Zap className="text-purple-400 w-10 h-10 animate-pulse" />
          </div>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          To be continued...
        </h3>
        
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto px-6 font-light leading-relaxed">
          The same naive curiosity that started with a C# book still drives me today. 
          Whether it's deep learning research or systems engineering, I'm still that 
          kid who just wants to see how things work—and make them work better.
        </p>
      </motion.div>

      {/* Bottom fade out */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default Timeline;