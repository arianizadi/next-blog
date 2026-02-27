"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Terminal, ArrowUpRight, Code2, FileText } from "lucide-react";
import { siteConfig } from "@/app/config/site";

const ContactCTA = () => {
  return (
    <section className="relative w-full overflow-hidden py-32 bg-zinc-950">
      {/* Background Grid & Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="relative group">
          {/* Industrial Corner Brackets */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-500/30" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-500/30" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-500/30" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-500/30" />

          <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-8 md:p-16 backdrop-blur-sm overflow-hidden">
            {/* Inner Glow Effect */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            
            <div className="flex flex-col lg:flex-row gap-12 items-start justify-between relative z-10">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-[10px] uppercase tracking-widest font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Status: Optimized & Available
                </div>

                <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight leading-tight">
                  Let&apos;s build <br />
                  <span className="text-zinc-500 italic font-light">something cool</span> together.
                </h2>

                <p className="text-zinc-400 text-lg max-w-lg leading-relaxed font-light">
                  I&apos;m seeking opportunities in systems engineering, robotics perception, and high-performance development. If you need someone who speaks low level, reach out.
                </p>
              </div>

              <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-4 min-w-[280px]">
                <motion.a
                  href="mailto:izadi2000@gmail.com"
                  className="group relative flex items-center justify-between p-4 bg-emerald-500 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span>Send Message</span>
                  </div>
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>

                <motion.a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Linkedin size={18} className="text-zinc-500 group-hover:text-emerald-400" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>

                <motion.a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Github size={18} className="text-zinc-500 group-hover:text-emerald-400" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>

                <motion.a
                  href={siteConfig.links.gitroll}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Code2 size={18} className="text-zinc-500 group-hover:text-emerald-400" />
                    <span>GitRoll</span>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>

                <motion.a
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-zinc-500 group-hover:text-emerald-400" />
                    <span>Resume</span>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              </div>
            </div>

            {/* Decorative Terminal Line */}
            <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Terminal size={12} /> protocol: encrypted</span>
                <span className="hidden sm:inline">|</span>
                <span>location: las vegas, nv</span>
              </div>
              <div className="text-zinc-700 font-mono text-[10px]">
                &copy; 2026 SYSTEM_INIT_COMPLETE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
