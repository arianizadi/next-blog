/*
 * Deterministic generative figures, in the spirit of plotter diagrams.
 * Seeded purely by project id so server and client always render the same
 * markup — no randomness, no hydration drift.
 */

import type { ReactNode } from "react";

const W = 260;
const H = 170;
const CX = W / 2;
const CY = H / 2;

function n(v: number): string {
  return (Math.round(v * 100) / 100).toString();
}

function waves(seed: number): ReactNode {
  const rows = 9;
  const freq = 1.4 + (seed % 5) * 0.35;
  const amp = 8 + (seed % 4) * 2;
  const lines = [];
  for (let r = 0; r < rows; r++) {
    const pts = [];
    for (let x = 14; x <= W - 14; x += 5) {
      const t = (x / W) * Math.PI * 2 * freq + r * 0.55 + seed;
      const y = 26 + r * ((H - 52) / (rows - 1)) + Math.sin(t) * amp;
      pts.push(`${n(x)},${n(y)}`);
    }
    lines.push(
      <polyline key={r} points={pts.join(" ")} fill="none" strokeWidth="1" />
    );
  }
  return lines;
}

function rings(seed: number): ReactNode {
  const count = 11;
  const step = 6 + (seed % 3) * 5;
  const els = [];
  for (let i = 0; i < count; i++) {
    const rx = 10 + i * 9;
    const ry = rx * (0.34 + (i % 4) * 0.05);
    els.push(
      <ellipse
        key={i}
        cx={CX}
        cy={CY}
        rx={n(rx)}
        ry={n(ry)}
        fill="none"
        strokeWidth="1"
        transform={`rotate(${(i * step + seed * 7) % 180} ${CX} ${CY})`}
      />
    );
  }
  return els;
}

function burst(seed: number): ReactNode {
  const spokes = 28;
  const els = [];
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    const r0 = 12 + Math.abs(Math.sin(i * (seed + 2))) * 12;
    const r1 = 46 + Math.sin(i * 1.7 + seed) * 18;
    els.push(
      <line
        key={i}
        x1={n(CX + Math.cos(a) * r0)}
        y1={n(CY + Math.sin(a) * r0 * 0.72)}
        x2={n(CX + Math.cos(a) * r1)}
        y2={n(CY + Math.sin(a) * r1 * 0.72)}
        strokeWidth="1"
      />
    );
  }
  els.push(
    <ellipse
      key="rim"
      cx={CX}
      cy={CY}
      rx={n(74)}
      ry={n(74 * 0.72)}
      fill="none"
      strokeWidth="1"
    />
  );
  return els;
}

function lissajous(seed: number): ReactNode {
  const a = 2 + (seed % 3);
  const b = 3 + (seed % 4);
  const d = (seed % 6) * 0.5;
  const dots = [];
  for (let i = 0; i < 160; i++) {
    const t = (i / 160) * Math.PI * 2;
    dots.push(
      <circle
        key={i}
        cx={n(CX + Math.sin(a * t + d) * 96)}
        cy={n(CY + Math.sin(b * t) * 58)}
        r="1.4"
      />
    );
  }
  return dots;
}

const PATTERNS = [waves, rings, burst, lissajous];

export function Figure({
  seed,
  className,
}: {
  seed: number;
  className?: string;
}) {
  const pattern = PATTERNS[seed % PATTERNS.length];
  const gridDots = [];
  for (let gy = 12; gy < H; gy += 16) {
    for (let gx = 12; gx < W; gx += 16) {
      gridDots.push(<circle key={`${gx}-${gy}`} cx={gx} cy={gy} r="0.6" />);
    }
  }
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g fill="rgba(23,19,14,0.25)">{gridDots}</g>
      <g stroke="#17130e" fill="#17130e">
        {pattern(seed)}
      </g>
    </svg>
  );
}

/* 8x8 pixel-art "A" mark for the title bar */
export function PixelGlyph({ size = 18 }: { size?: number }) {
  const rows = [
    "..####..",
    ".##..##.",
    "##....##",
    "##....##",
    "########",
    "##....##",
    "##....##",
    "##....##",
  ];
  const cells = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < 8; x++) {
      if (rows[y][x] === "#") {
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
      }
    }
  }
  return (
    <svg
      viewBox="0 0 8 8"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <g fill="currentColor">{cells}</g>
    </svg>
  );
}
