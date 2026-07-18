"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

const BOOT_LINES = [
  "PERCEPTION STACK v3.1 — COLD BOOT",
  "MOUNTING SENSOR ARRAY ......... OK",
  "CALIBRATING TYPE ENGINE ....... OK",
  "ACQUIRING SUBJECT ............. OK",
];

const Preloader = () => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (reduceMotion) return;
    if (sessionStorage.getItem("perception-booted")) return;

    // Defer to post-mount so SSR markup matches the first client render
    const show = requestAnimationFrame(() => {
      setVisible(true);
      document.documentElement.style.overflow = "hidden";
    });

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 14) + 6;
        if (next >= 100) {
          window.clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, 90);

    const lineTimer = window.setInterval(() => {
      setLineCount((prev) => {
        if (prev >= BOOT_LINES.length) {
          window.clearInterval(lineTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 260);

    timersRef.current = [progressTimer, lineTimer];

    return () => {
      cancelAnimationFrame(show);
      timersRef.current.forEach((t) => window.clearInterval(t));
      timersRef.current = [];
      document.documentElement.style.overflow = "";
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (progress < 100) return;
    const done = window.setTimeout(() => {
      sessionStorage.setItem("perception-booted", "1");
      setVisible(false);
      document.documentElement.style.overflow = "";
    }, 420);
    return () => window.clearTimeout(done);
  }, [progress]);

  const skip = () => {
    timersRef.current.forEach((t) => window.clearInterval(t));
    timersRef.current = [];
    sessionStorage.setItem("perception-booted", "1");
    setVisible(false);
    document.documentElement.style.overflow = "";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-background px-6 py-8 md:px-12"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: easeOutExpo } }}
          onClick={skip}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
              e.preventDefault();
              skip();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Skip intro"
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/55">
            <span>arianizadi.com</span>
            <span className="text-phosphor/70">SYS.BOOT</span>
          </div>

          <div className="font-mono text-xs leading-7 text-foreground/60 md:text-sm">
            {BOOT_LINES.slice(0, lineCount).map((line) => (
              <p key={line}>
                <span className="mr-3 text-phosphor">&gt;</span>
                {line}
              </p>
            ))}
            <p className="mt-4 text-foreground/55">
              <span className="mr-3 text-phosphor">&gt;</span>
              CLICK TO SKIP
              <span className="animate-blink ml-2 inline-block h-3.5 w-2 translate-y-0.5 bg-phosphor/80" />
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px w-full max-w-md self-center bg-border">
              <div
                className="h-px bg-phosphor transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="ml-8 font-display text-7xl font-black tabular-nums leading-none text-foreground md:text-9xl">
              {progress}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
