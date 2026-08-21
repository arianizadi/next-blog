"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const IRIDESCENT = [
  "hsl(187 100% 62%)",
  "hsl(163 100% 55%)",
  "hsl(262 85% 66%)",
  "hsl(303 100% 66%)",
  "hsl(210 100% 62%)",
  "hsl(48 100% 62%)",
];

/**
 * The hero object: an original "systems sculpture" built from SVG layers —
 * translucent orbital rings, routed traces, pixel clusters, and an
 * iridescent membrane core. Occupies roughly half the viewport and reacts
 * subtly to pointer position via layered parallax (disabled for reduced
 * motion and coarse pointers).
 */
export default function Sculpture({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const frame = useRef(0);

  const onPointerMove = (event: React.PointerEvent) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const node = ref.current;
    if (!node) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
      node.style.setProperty("--tilt-y", `${(x * 14).toFixed(2)}deg`);
      node.style.setProperty("--pan-x", `${(x * 26).toFixed(1)}px`);
      node.style.setProperty("--pan-y", `${(y * 26).toFixed(1)}px`);
    });
  };

  const onPointerLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
    node.style.setProperty("--pan-x", "0px");
    node.style.setProperty("--pan-y", "0px");
  };

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ perspective: 1200 }}
    >
      <div
        className="poster-drift relative h-full w-full transition-transform duration-300 ease-out will-change-transform motion-reduce:animate-none"
        style={{
          transform:
            "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          viewBox="0 0 800 800"
          className="h-full w-full"
          role="presentation"
          focusable="false"
        >
          <defs>
            <linearGradient id="sc-membrane" x1="0%" y1="0%" x2="100%" y2="100%">
              {IRIDESCENT.map((color, i) => (
                <stop
                  key={color}
                  offset={`${(i / (IRIDESCENT.length - 1)) * 100}%`}
                  stopColor={color}
                  stopOpacity="0.9"
                />
              ))}
            </linearGradient>
            <linearGradient id="sc-band" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(187 100% 60%)" stopOpacity="0.95" />
              <stop offset="55%" stopColor="hsl(262 85% 62%)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="hsl(303 100% 64%)" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="sc-core" cx="42%" cy="38%" r="70%">
              <stop offset="0%" stopColor="hsl(0 0% 100%)" stopOpacity="0.95" />
              <stop offset="22%" stopColor="hsl(187 100% 66%)" stopOpacity="0.9" />
              <stop offset="55%" stopColor="hsl(262 80% 52%)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="hsl(266 60% 12%)" stopOpacity="0.95" />
            </radialGradient>
            <filter id="sc-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* outer routed traces */}
          <g
            stroke="hsl(187 100% 60%)"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            fill="none"
            style={{ transform: "translate(var(--pan-x, 0px), var(--pan-y, 0px))" }}
          >
            <path d="M120 400 H60 V240 H140" />
            <path d="M680 400 H750 V560 H650" />
            <path d="M400 120 V60 H560 V150" />
            <path d="M400 680 V745 H250 V640" />
            <circle cx="60" cy="240" r="5" fill="hsl(187 100% 60%)" />
            <circle cx="750" cy="560" r="5" fill="hsl(303 100% 64%)" />
            <circle cx="560" cy="150" r="5" fill="hsl(163 100% 55%)" />
            <circle cx="250" cy="640" r="5" fill="hsl(187 100% 60%)" />
          </g>

          {/* translucent orbital rings */}
          <g fill="none" style={{ transform: "translate(calc(var(--pan-x, 0px) * 0.6), calc(var(--pan-y, 0px) * 0.6))" }}>
            <ellipse cx="400" cy="400" rx="330" ry="240" stroke="url(#sc-band)" strokeOpacity="0.55" strokeWidth="2" transform="rotate(-18 400 400)" />
            <ellipse cx="400" cy="400" rx="280" ry="300" stroke="hsl(262 85% 66%)" strokeOpacity="0.4" strokeWidth="1.5" transform="rotate(24 400 400)" />
            <ellipse cx="400" cy="400" rx="210" ry="150" stroke="hsl(163 100% 55%)" strokeOpacity="0.45" strokeWidth="1.5" transform="rotate(-42 400 400)" strokeDasharray="6 10" />
          </g>

          {/* luminous band behind the core */}
          <g className="poster-spin-slow" style={{ transformOrigin: "400px 400px" }}>
            <ellipse
              cx="400"
              cy="400"
              rx="250"
              ry="96"
              fill="none"
              stroke="url(#sc-band)"
              strokeWidth="7"
              strokeOpacity="0.85"
              strokeLinecap="round"
              strokeDasharray="420 520"
              transform="rotate(-24 400 400)"
              filter="url(#sc-glow)"
            />
          </g>

          {/* iridescent core membranes */}
          <g filter="url(#sc-glow)">
            <path
              d="M400 190 C520 190 610 285 610 400 C610 516 520 610 400 610 C280 610 192 516 192 400 C192 285 280 190 400 190 Z"
              fill="url(#sc-membrane)"
              fillOpacity="0.28"
            />
            <path
              d="M400 240 C492 240 562 308 562 400 C562 492 492 560 400 560 C308 560 238 492 238 400 C238 308 308 240 400 240 Z"
              fill="url(#sc-core)"
              fillOpacity="0.92"
            />
            <path
              d="M312 330 C350 268 470 262 516 340 C470 312 372 306 312 330 Z"
              fill="hsl(0 0% 100%)"
              fillOpacity="0.75"
            />
            <ellipse cx="400" cy="400" rx="150" ry="58" fill="none" stroke="hsl(0 0% 100%)" strokeOpacity="0.65" strokeWidth="2" transform="rotate(-24 400 400)" />
          </g>

          {/* pixel clusters */}
          <g fill="hsl(187 100% 62%)" fillOpacity="0.85" style={{ transform: "translate(calc(var(--pan-x, 0px) * 1.4), calc(var(--pan-y, 0px) * 1.4))" }}>
            <rect x="176" y="176" width="10" height="10" />
            <rect x="192" y="176" width="10" height="10" fillOpacity="0.5" />
            <rect x="176" y="192" width="10" height="10" fillOpacity="0.3" />
            <rect x="608" y="600" width="10" height="10" fill="hsl(303 100% 66%)" />
            <rect x="624" y="600" width="10" height="10" fill="hsl(303 100% 66%)" fillOpacity="0.5" />
            <rect x="608" y="616" width="10" height="10" fill="hsl(303 100% 66%)" fillOpacity="0.3" />
            <rect x="600" y="180" width="8" height="8" fill="hsl(163 100% 55%)" />
            <rect x="616" y="180" width="8" height="8" fill="hsl(163 100% 55%)" fillOpacity="0.45" />
            <rect x="180" y="604" width="8" height="8" fill="hsl(262 85% 66%)" />
            <rect x="196" y="604" width="8" height="8" fill="hsl(262 85% 66%)" fillOpacity="0.45" />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}
