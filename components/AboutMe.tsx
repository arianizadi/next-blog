"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Link2Icon } from 'lucide-react';

const AboutMe = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-24 md:px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Section with Glowing Animation */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-glow">
            <span className="inline-flex items-center gap-2">
              Beyond The Code
              <span className="animate-pulse">✨</span>
            </span>
          </h1>
          <style jsx>{`
            @keyframes glow {
              0%, 100% {
                text-shadow: 0 0 0px #646cff;
              }
              50% {
                text-shadow: 0 0 20px #646cff;
              }
            }
            .animate-glow {
              animation: glow 3s ease-in-out infinite;
            }
          `}</style>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Passionate about security and autonomous systems
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Cybersecurity Section */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-3">
              <span className="text-3xl md:text-4xl">🛡️</span>
              Cybersecurity
            </h2>
            <div className="pl-12 space-y-3">
              <p className="text-lg md:text-xl text-muted-foreground">
                Member of UNLV CTF Hacking Team 💻
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Participating in Capture The Flag competitions</li>
                <li>Exploring offensive and defensive security techniques</li>
                <li>Constantly learning new exploitation methods</li>
                <li>Developing custom security tools and scripts</li>
                <li>Analyzing system vulnerabilities</li>
              </ul>
            </div>
          </div>

          {/* Autonomous Vehicles Section */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-3">
              <span className="text-3xl md:text-4xl">🚗</span>
              Autonomous Vehicles
            </h2>
            <div className="pl-12 space-y-3">
              <p className="text-lg md:text-xl text-muted-foreground">
                Building the future of transportation 🤖
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Developing self-driving systems</li>
                <li>Working on perception and control algorithms</li>
                <li>Implementing sensor fusion techniques</li>
                <li>Testing autonomous navigation systems</li>
                <li>Optimizing real-time decision making</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Links - Now with GitHub link */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <a
            href="https://github.com/arianizadi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="gap-2 hover:scale-105 transition-transform">
              <Link2Icon size={20} />
              View Projects
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;