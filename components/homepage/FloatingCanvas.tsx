/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { projects, experiences, techGroups, education, type Project } from "@/lib/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, ArrowUpRight, Menu } from "lucide-react";
import { siteConfig } from "@/app/config/site";

const EMAIL = "izadi2000@gmail.com";

export function FloatingCanvas() {
  const [activeTab, setActiveTab] = useState("Works");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectSelected, setProjectSelected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const galleryProjects = projects.filter(
    (p) => p.featured || p.title === "Segmentary" || p.title === "VpnDad"
  );
  const uniqueGalleryProjects = Array.from(new Set(galleryProjects.map(a => a.id)))
    .map(id => galleryProjects.find(a => a.id === id)!);

  const handleNext = useCallback(() => {
    setActiveProjectIndex((prev) => (prev + 1) % uniqueGalleryProjects.length);
  }, [uniqueGalleryProjects.length]);

  const handlePrev = useCallback(() => {
    setActiveProjectIndex((prev) => (prev - 1 + uniqueGalleryProjects.length) % uniqueGalleryProjects.length);
  }, [uniqueGalleryProjects.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab === "Works") {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape" && projectSelected) setProjectSelected(false);
      }
      if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, projectSelected, mobileMenuOpen, handleNext, handlePrev]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    const scrollLeft = e.currentTarget.scrollLeft;
    const itemWidth = carouselRef.current.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeProjectIndex && newIndex >= 0 && newIndex < uniqueGalleryProjects.length) {
      setActiveProjectIndex(newIndex);
    }
  };

  const activeProject = uniqueGalleryProjects[activeProjectIndex];
  const tabs = ["Works", "Experience", "Capabilities", "Education", "Journey", "Contact"];

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#0a0a0a] text-white selection:bg-black selection:text-white font-sans">
      <h1 className="sr-only">Arian Izadi — Embedded &amp; Systems Software Engineer</h1>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black">
        Skip to main content
      </a>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale mix-blend-screen"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGZpbHRlciBpZD0ibiI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNSIgbnVtT2N0YXZlcz0iMSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjI1Ii8+PC9zdmc+')] mix-blend-overlay" />
      </div>

      {/* Top Navigation - Desktop */}
      <nav className="absolute top-6 left-0 right-0 z-50 hidden md:flex justify-center">
        <ul className="flex items-center gap-6 px-6 py-2 text-xs tracking-wider uppercase text-neutral-400 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => { setActiveTab(tab); setProjectSelected(false); }}
                className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors hover:text-white p-2 ${activeTab === tab ? "text-white font-medium" : ""}`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Top Navigation - Mobile */}
      <nav className="absolute top-4 left-4 right-4 z-50 flex md:hidden justify-between items-center pointer-events-none">
        <span className="text-xs uppercase tracking-widest bg-black/80 px-3 py-2 rounded-full backdrop-blur-md border border-white/20 pointer-events-auto">
          {activeTab}
        </span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3 bg-black/40 rounded-full backdrop-blur-md border border-white/10 pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-exhibition-menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-exhibition-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 md:hidden pointer-events-auto"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setProjectSelected(false); setMobileMenuOpen(false); }}
                className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white text-2xl uppercase tracking-widest text-left p-2 ${activeTab === tab ? "text-white" : "text-neutral-500"}`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Identity Label */}
      <div className="absolute bottom-6 left-6 z-30 text-xs leading-relaxed tracking-wide text-neutral-400 max-w-[200px] uppercase hidden lg:block bg-black/20 p-4 backdrop-blur-md rounded-lg border border-white/5 pointer-events-none">
        <p className="text-white font-semibold mb-1">Arian Izadi</p>
        <p>Embedded & Systems Software Engineer</p>
        <p className="mt-2 text-neutral-300">Konami Gaming, Inc.</p>
        <p className="mt-1">C/C++ · Linux</p>
        <p>Real-time · Robotics</p>
      </div>

      {/* Main Canvas Area */}
      <div id="main-content" role="main" className="absolute inset-0 z-20 flex items-center justify-center p-2 md:p-12 lg:p-16 pointer-events-none">
        <div className="relative w-full h-[95vh] mt-4 md:mt-0 md:h-[72vh] lg:h-[68vh] md:max-w-[88vw] lg:max-w-[84vw] bg-white text-black md:shadow-2xl overflow-hidden flex flex-col pointer-events-auto rounded-xl md:rounded-none">
          <AnimatePresence mode="wait">
            {activeTab === "Works" ? (
              <motion.div
                key="works"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative flex flex-col"
              >
                {/* Title */}
                <h2 className="absolute top-4 left-4 md:top-8 md:left-8 lg:top-10 lg:left-10 text-[3.5rem] md:text-8xl font-medium tracking-tighter leading-none z-20 mix-blend-difference text-white pointer-events-none select-none">
                  Works,
                </h2>

                {/* Content: Gallery vs Detail */}
                <AnimatePresence mode="wait">
                  {!projectSelected ? (
                    <motion.div 
                      key="gallery"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="w-full h-full relative"
                    >
                      {/* Desktop Scatter Thumbnails Container */}
                      <div className="hidden md:flex absolute inset-0 p-12 lg:p-24 flex-col justify-between">
                        <div className="flex justify-end gap-8 lg:gap-16 items-start h-[35%] mt-12 pr-8">
                          {uniqueGalleryProjects.slice(0, 3).map((p, idx) => (
                            <Thumbnail 
                              key={p.id} project={p} 
                              isActive={activeProjectIndex === idx} 
                              onClick={() => { setActiveProjectIndex(idx); setProjectSelected(true); }}
                              size={idx === 1 ? "large" : "small"}
                            />
                          ))}
                        </div>

                        <div className="flex-1 flex items-center justify-center relative">
                          <div className="absolute flex items-center gap-4 text-xs font-mono uppercase tracking-widest bg-white/90 backdrop-blur px-4 py-2 border border-black/5 z-30">
                            <button onClick={handlePrev} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black hover:opacity-50 transition-opacity p-3 -ml-3"><ChevronLeft size={16} /></button>
                            <div className="w-16 text-center">
                              {String(activeProjectIndex + 1).padStart(2, '0')} / {String(uniqueGalleryProjects.length).padStart(2, '0')}
                            </div>
                            <button onClick={handleNext} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black hover:opacity-50 transition-opacity p-3 -mr-3"><ChevronRight size={16} /></button>
                          </div>
                        </div>

                        <div className="flex justify-start gap-12 lg:gap-24 items-end h-[35%] pl-8 lg:pl-24 mb-8">
                          {uniqueGalleryProjects.slice(3, 7).map((p, idx) => (
                            <Thumbnail 
                              key={p.id} project={p} 
                              isActive={activeProjectIndex === idx + 3} 
                              onClick={() => { setActiveProjectIndex(idx + 3); setProjectSelected(true); }}
                              size={idx === 0 ? "medium" : "small"}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Mobile Carousel - showing primary + peek */}
                      <div className="flex md:hidden w-full h-full flex-col pt-24 pb-8">
                        <div 
                          ref={carouselRef}
                          className="flex-1 w-full overflow-x-auto snap-x snap-mandatory flex gap-4 px-6 hide-scrollbar items-center pb-4"
                          onScroll={handleScroll}
                        >
                          {uniqueGalleryProjects.map((p, idx) => (
                            <div 
                              key={p.id} 
                              className="w-[85%] shrink-0 snap-center h-full flex flex-col justify-center"
                            >
                              <button 
                                onClick={() => { setActiveProjectIndex(idx); setProjectSelected(true); }}
                                className="w-full flex flex-col gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 rounded-xl"
                              >
                                <div className={`w-full aspect-[4/5] bg-neutral-100 overflow-hidden border border-neutral-200 transition-all rounded-xl ${activeProjectIndex === idx ? 'opacity-100 scale-100 shadow-xl' : 'opacity-60 scale-95 grayscale'}`}>
                                  {p.image ? (
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                      <span className="font-mono text-4xl opacity-20">{p.title.substring(0, 2).toUpperCase()}</span>
                                    </div>
                                  )}
                                </div>
                                <div className={`transition-opacity duration-300 ${activeProjectIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
                                  <h3 className="text-xl font-medium mb-1 leading-tight">{p.title}</h3>
                                  <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono">{p.eyebrow}</p>
                                </div>
                              </button>
                            </div>
                          ))}
                          <div className="w-[10%] shrink-0" />
                        </div>
                        
                        {/* Mobile Controller */}
                        <div className="flex items-center justify-between border-t border-neutral-200 px-6 pt-4 shrink-0">
                          <button aria-label="Previous project" onClick={() => {
                            handlePrev();
                            if (carouselRef.current) {
                              const newIndex = (activeProjectIndex - 1 + uniqueGalleryProjects.length) % uniqueGalleryProjects.length;
                              carouselRef.current.scrollTo({ left: newIndex * (carouselRef.current.offsetWidth * 0.85), behavior: 'smooth' });
                            }
                          }} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors">
                            <ChevronLeft size={20} aria-hidden />
                          </button>
                          <span className="text-xs font-mono tracking-widest bg-neutral-100 px-4 py-2 rounded-full">
                            {String(activeProjectIndex + 1).padStart(2, '0')} / {String(uniqueGalleryProjects.length).padStart(2, '0')}
                          </span>
                          <button aria-label="Next project" onClick={() => {
                            handleNext();
                            if (carouselRef.current) {
                              const newIndex = (activeProjectIndex + 1) % uniqueGalleryProjects.length;
                              carouselRef.current.scrollTo({ left: newIndex * (carouselRef.current.offsetWidth * 0.85), behavior: 'smooth' });
                            }
                          }} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors">
                            <ChevronRight size={20} aria-hidden />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col md:flex-row bg-[#fbfbfb] overflow-hidden"
                    >
                      {/* Close Button */}
                      <button 
                        onClick={() => setProjectSelected(false)}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black absolute top-4 right-4 md:top-6 md:right-6 z-40 p-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors backdrop-blur-sm"
                        aria-label="Close detail view"
                      >
                        <X size={20} />
                      </button>

                      {/* Detail Image */}
                      <div className="w-full h-[40%] md:w-[50%] lg:w-[60%] md:h-full relative bg-neutral-100 border-b md:border-b-0 md:border-r border-neutral-200 shrink-0">
                        {activeProject.image ? (
                          <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover object-center" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-black p-8">
                            <span className="text-6xl font-mono opacity-10">{activeProject.title.substring(0,2).toUpperCase()}</span>
                          </div>
                        )}
                      </div>

                      {/* Detail Content */}
                      <div className="w-full h-[60%] md:w-[50%] lg:w-[40%] md:h-full p-6 md:p-10 lg:p-16 flex flex-col overflow-y-auto pb-12">
                        <div className="text-xs lg:text-xs uppercase tracking-widest text-neutral-500 mb-3 font-mono">
                          {String(activeProjectIndex + 1).padStart(2, '0')} — {activeProject.eyebrow}
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight mb-8">
                          {activeProject.title}
                        </h2>

                        <div className="space-y-6 lg:space-y-8 text-sm lg:text-base leading-relaxed text-neutral-800 flex-1">
                          <div>
                            <span className="block text-xs lg:text-xs uppercase font-mono text-neutral-400 mb-2">Problem</span>
                            <p>{activeProject.problem}</p>
                          </div>
                          <div>
                            <span className="block text-xs lg:text-xs uppercase font-mono text-neutral-400 mb-2">Contribution</span>
                            <p>{activeProject.contribution}</p>
                          </div>
                          <div>
                            <span className="block text-xs lg:text-xs uppercase font-mono text-neutral-400 mb-2">Impact</span>
                            <p>{activeProject.impact}</p>
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col gap-6 shrink-0">
                          <div className="flex flex-wrap gap-2">
                            {activeProject.technologies.map(tech => (
                              <span key={tech} className="px-2 py-1 bg-white border border-neutral-200 text-xs lg:text-xs uppercase tracking-wide">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-6">
                            {activeProject.githubUrl && (
                              <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black text-xs uppercase tracking-wider font-medium flex items-center gap-1 hover:opacity-50 transition-opacity py-2">
                                Repository <ArrowUpRight size={14} />
                              </a>
                            )}
                            {activeProject.liveUrl && (
                              <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black text-xs uppercase tracking-wider font-medium flex items-center gap-1 hover:opacity-50 transition-opacity py-2">
                                Live View <ArrowUpRight size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full p-6 pt-20 md:p-12 lg:p-20 overflow-y-auto bg-white"
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-8 md:mb-16">{activeTab}.</h2>
                
                {activeTab === "Experience" && (
                  <div className="max-w-3xl space-y-12 md:space-y-20 pb-12">
                    {experiences.map((exp, i) => (
                      <div key={i} className="flex flex-col md:grid md:grid-cols-[1fr_3fr] gap-2 md:gap-12 items-baseline">
                        <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2 md:mb-0">
                          {exp.dates}
                        </div>
                        <div>
                          <h3 className="text-lg md:text-2xl font-medium mb-1">{exp.company}</h3>
                          <p className="text-xs md:text-sm uppercase tracking-wide text-neutral-600 mb-4">{exp.role}</p>
                          <p className="text-sm md:text-base text-neutral-800 leading-relaxed mb-4">{exp.summary}</p>
                          <ul className="list-disc pl-4 space-y-2 text-xs md:text-sm text-neutral-700">
                            {exp.bulletPoints.map((bp, j) => <li key={j}>{bp}</li>)}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Capabilities" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-16 max-w-6xl pb-12">
                    {techGroups.map((group) => (
                      <div key={group.id}>
                        <h3 className="text-base md:text-lg font-medium mb-2">{group.title}</h3>
                        <p className="text-xs md:text-sm text-neutral-600 mb-6">{group.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 md:px-3 md:py-1.5 border border-neutral-200 text-xs uppercase tracking-wider text-neutral-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Education" && (
                  <div className="max-w-3xl space-y-12 pb-12">
                    {education.map((edu, i) => (
                      <div key={i}>
                        <h3 className="text-xl md:text-2xl font-medium mb-1">{edu.degree}</h3>
                        <p className="text-xs md:text-sm uppercase tracking-wide text-neutral-600 mb-4">{edu.university} {edu.date && `· ${edu.date}`} {edu.gpa && `· ${edu.gpa}`}</p>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {edu.highlights.map((h, j) => (
                            <span key={j} className="px-2 py-1 md:px-3 md:py-1.5 border border-neutral-200 text-xs text-neutral-700">{h}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Journey" && (
                  <div className="max-w-2xl text-base md:text-lg leading-relaxed space-y-6 text-neutral-800 pb-12">
                    <p>I build embedded systems and the infrastructure surrounding them.</p>
                    <p>Currently, I&apos;m an Embedded Software Engineer II at Konami, researching, designing, and maintaining C/C++ components integrated with embedded hardware and manufacturing systems.</p>
                    <p>At Koshee AI, I built robotics software spanning LiDAR perception and a UDP heartbeat shutdown control. Before that, I worked on backend Java services at Credit One Bank.</p>
                    <div className="mt-12">
                      <Link href="/blog" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider font-medium hover:opacity-50 transition-opacity p-4 -ml-4 bg-neutral-100/50 rounded-lg">
                        Read Blog <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === "Contact" && (
                  <div className="max-w-xl space-y-12 pb-12">
                    <p className="text-xl md:text-2xl font-medium leading-tight">
                      Open to discussing embedded systems, infrastructure, and technical leadership.
                    </p>
                    <div className="flex flex-col gap-6 text-xs md:text-sm uppercase tracking-widest font-mono">
                      <a href={`mailto:${EMAIL}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black hover:opacity-50 transition-opacity w-fit flex items-center gap-3 py-2"><span className="w-4 h-px bg-black block"></span> {EMAIL}</a>
                      <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black hover:opacity-50 transition-opacity w-fit flex items-center gap-3 py-2"><span className="w-4 h-px bg-black block"></span> GitHub</a>
                      <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black hover:opacity-50 transition-opacity w-fit flex items-center gap-3 py-2"><span className="w-4 h-px bg-black block"></span> LinkedIn</a>
                      <a href={siteConfig.links.x} target="_blank" rel="noopener noreferrer" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black hover:opacity-50 transition-opacity w-fit flex items-center gap-3 py-2"><span className="w-4 h-px bg-black block"></span> X</a>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

function Thumbnail({ project, isActive, onClick, size }: { project: Project, isActive: boolean, onClick: () => void, size: "small" | "medium" | "large" }) {
  const sizeClasses = {
    small: "w-32 lg:w-48 aspect-[4/3]",
    medium: "w-40 lg:w-64 aspect-square",
    large: "w-48 lg:w-80 aspect-video",
  };

  return (
    <button 
      onClick={onClick}
      className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 group relative overflow-hidden transition-all duration-500 ease-out flex-shrink-0
        ${sizeClasses[size]} 
        ${isActive ? 'ring-2 ring-black ring-offset-4 scale-[1.02] shadow-xl z-20' : 'opacity-70 hover:opacity-100 hover:scale-[1.01] grayscale hover:grayscale-0'}
      `}
      aria-label={`View ${project.title}`}
    >
      {project.image ? (
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center p-4 border border-neutral-200">
          <span className="font-mono text-xl lg:text-3xl font-bold opacity-20 text-black">
            {project.title.substring(0, 2).toUpperCase()}
          </span>
          <span className="mt-2 text-xs uppercase tracking-widest text-neutral-500 text-center px-2">
            {project.technologies[0]} / {project.technologies[1] || 'SYS'}
          </span>
        </div>
      )}
      
      {/* Label overlay on hover */}
      <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-start justify-end">
        <span className="text-white text-xs font-medium truncate w-full text-left">{project.title}</span>
      </div>
    </button>
  );
}
