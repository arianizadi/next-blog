"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const CustomCursor = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 520, damping: 40, mass: 0.6 });

  const coordX = useTransform(springX, (v) => `X:${String(Math.round(v)).padStart(4, "0")}`);
  const coordY = useTransform(springY, (v) => `Y:${String(Math.round(v)).padStart(4, "0")}`);

  useEffect(() => {
    if (reduceMotion) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const enable = requestAnimationFrame(() => {
      setEnabled(true);
      document.documentElement.classList.add("custom-cursor");
    });

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setHovering(
        Boolean(target.closest("a, button, input, [data-cursor-hover]"))
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(enable);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ x: springX, y: springY }}
    >
      {/* Crosshair */}
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: hovering ? 1.9 : 1, rotate: hovering ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <span className="absolute left-1/2 top-1/2 h-[26px] w-px -translate-x-1/2 -translate-y-1/2 bg-phosphor/80" />
        <span className="absolute left-1/2 top-1/2 h-px w-[26px] -translate-x-1/2 -translate-y-1/2 bg-phosphor/80" />
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-phosphor" />
      </motion.div>

      {/* Coordinate readout */}
      <motion.div
        className="absolute left-4 top-4 whitespace-nowrap font-mono text-[9px] leading-[1.5] tracking-[0.14em] text-phosphor/70"
        animate={{ opacity: hovering ? 0 : 1 }}
      >
        <motion.span className="block">{coordX}</motion.span>
        <motion.span className="block">{coordY}</motion.span>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
