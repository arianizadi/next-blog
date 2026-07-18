"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** ms between character resolutions */
  speed?: number;
  once?: boolean;
};

const ScrambleText = ({
  text,
  className,
  speed = 28,
  once = true,
}: ScrambleTextProps) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const [output, setOutput] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    // Initial state already renders the final text; nothing to do when
    // reduced motion is preferred.
    if (reduceMotion) return;
    if (!inView || (once && played.current)) return;
    played.current = true;

    let frame = 0;
    const totalFrames = Math.max(text.length, 1);
    const interval = window.setInterval(() => {
      frame += 1;
      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < frame - 2) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setOutput(next);
      if (frame >= totalFrames + 2) {
        window.clearInterval(interval);
        setOutput(text);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [inView, text, speed, once, reduceMotion]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{output}</span>
    </span>
  );
};

export default ScrambleText;
