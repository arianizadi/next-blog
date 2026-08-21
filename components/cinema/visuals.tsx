import { useId } from "react";
import type { VisualKey } from "@/lib/reel";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number; r: number; o: number };

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function scatter(
  seed: number,
  count: number,
  opts: {
    x: [number, number];
    y: [number, number];
    r: [number, number];
    o: [number, number];
    centerBand?: boolean;
  }
): Point[] {
  const rand = lcg(seed);
  const band = opts.centerBand === true;
  return Array.from({ length: count }, () => {
    let ry = rand();
    if (band) ry = (rand() + rand() + rand()) / 3;
    return {
      x: opts.x[0] + rand() * (opts.x[1] - opts.x[0]),
      y: opts.y[0] + ry * (opts.y[1] - opts.y[0]),
      r: opts.r[0] + rand() * (opts.r[1] - opts.r[0]),
      o: opts.o[0] + rand() * (opts.o[1] - opts.o[0]),
    };
  });
}

const identityStars = scatter(711, 460, {
  x: [40, 1560],
  y: [60, 840],
  r: [0.6, 2.6],
  o: [0.12, 0.6],
  centerBand: true,
});

const lidarFloor = (() => {
  const rand = lcg(1337);
  const pts: Point[] = [];
  for (let row = 0; row < 12; row += 1) {
    for (let col = 0; col < 62; col += 1) {
      pts.push({
        x: 150 + col * 21 + (rand() - 0.5) * 9,
        y: 545 + row * 25 + (rand() - 0.5) * 9,
        r: 0.9 + row * 0.13,
        o: 0.1 + row * 0.045,
      });
    }
  }
  return pts;
})();

const lidarClusterA = scatter(4242, 95, {
  x: [1075, 1285],
  y: [335, 505],
  r: [0.8, 2.3],
  o: [0.3, 0.85],
});

const lidarClusterB = scatter(5252, 70, {
  x: [330, 520],
  y: [290, 450],
  r: [0.7, 1.9],
  o: [0.25, 0.7],
});

const graphNodes = (() => {
  const rand = lcg(9001);
  return Array.from({ length: 24 }, (_, i) => ({
    x: 180 + rand() * 1240,
    y: 130 + rand() * 620,
    r: 4 + rand() * 5.5,
    i,
  }));
})();

const graphEdges = (() => {
  const rand = lcg(31337);
  const edges: [number, number][] = [];
  graphNodes.forEach((node, i) => {
    const links = 1 + Math.floor(rand() * 2);
    for (let k = 0; k < links; k += 1) {
      const target = Math.floor(rand() * graphNodes.length);
      if (target !== i) edges.push([i, target]);
    }
  });
  return edges;
})();

const CYCLE = [3, 9, 16, 20];
const cycleEdges: [number, number][] = [
  [CYCLE[0], CYCLE[1]],
  [CYCLE[1], CYCLE[2]],
  [CYCLE[2], CYCLE[3]],
  [CYCLE[3], CYCLE[0]],
];
const PATH_NODES = [1, 6, 12, 17, 22];

const cipherBits = (() => {
  const rand = lcg(2048);
  return Array.from({ length: 4 }, (_, row) =>
    Array.from({ length: 36 }, (_, col) => ({
      x: 460 + col * 19,
      y: 690 + row * 22,
      o: 0.08 + rand() * 0.5,
      a: rand() > 0.93,
    }))
  ).flat();
})();

const cipherOrbit = (() => {
  const rand = lcg(6161);
  return Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2 + rand() * 0.22;
    return {
      x: 800 + Math.cos(angle) * 335,
      y: 450 + Math.sin(angle) * 335,
      r: 2.4 + rand() * 2.6,
      o: 0.35 + rand() * 0.45,
      a: rand() > 0.86,
    };
  });
})();

const tunnelPackets = (() => {
  const rand = lcg(7777);
  return Array.from({ length: 20 }, (_, i) => {
    const t = 0.08 + (i / 20) * 0.84;
    const x = 320 + t * 940;
    return {
      x,
      y: 450 + Math.sin(t * Math.PI * 3.2) * 62 + (rand() - 0.5) * 10,
      o: 0.35 + rand() * 0.55,
      a: rand() > 0.78,
      s: 7 + rand() * 5,
    };
  });
})();

function SvgFrame({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const glowId = `cx-glow${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="46%" r="65%">
          <stop offset="0%" stopColor="#14161d" />
          <stop offset="100%" stopColor="#050608" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="1600" height="900" fill={`url(#${glowId})`} />
      {children}
    </svg>
  );
}

function GridLines({ step = 100, opacity = 0.045 }: { step?: number; opacity?: number }) {
  const lines = [];
  for (let x = step; x < 1600; x += step) {
    lines.push(
      <line key={`v${x}`} x1={x} y1={0} x2={x} y2={900} stroke="#ffffff" strokeOpacity={opacity} />
    );
  }
  for (let y = step; y < 900; y += step) {
    lines.push(
      <line key={`h${y}`} x1={0} y1={y} x2={1600} y2={y} stroke="#ffffff" strokeOpacity={opacity} />
    );
  }
  return <g aria-hidden>{lines}</g>;
}

function Dots({ points, fill = "#ffffff", accent }: { points: Point[]; fill?: string; accent?: string }) {
  return (
    <g aria-hidden>
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={accent && p.o > 0.75 ? accent : fill}
          fillOpacity={p.o}
        />
      ))}
    </g>
  );
}

function Hud({ left, right, accent }: { left: string; right: string; accent: string }) {
  return (
    <g aria-hidden className="fill-white/45 font-mono">
      <text x="70" y="830" fontSize="24" letterSpacing="3">
        {left}
      </text>
      <text x="1530" y="830" fontSize="24" letterSpacing="3" textAnchor="end">
        {right}
      </text>
      <circle cx="70" cy="858" r="4" fill={accent} fillOpacity="0.9" />
    </g>
  );
}

function IdentityField({ label, className }: { label: string; className?: string }) {
  return (
    <SvgFrame label={label} className={className}>
      <GridLines step={160} opacity={0.035} />
      <Dots points={identityStars} />
      <g aria-hidden stroke="#ffffff">
        <circle cx="800" cy="450" r="210" fill="none" strokeOpacity="0.09" />
        <circle cx="800" cy="450" r="330" fill="none" strokeOpacity="0.06" />
        <circle cx="800" cy="450" r="450" fill="none" strokeOpacity="0.04" />
        <line x1="0" y1="450" x2="1600" y2="450" strokeOpacity="0.07" />
        <line x1="800" y1="0" x2="800" y2="900" strokeOpacity="0.05" />
      </g>
      <g aria-hidden>
        <path
          d="M 800 120 A 330 330 0 0 1 1090 300"
          fill="none"
          stroke="#e2b45a"
          strokeOpacity="0.28"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M 800 120 A 330 330 0 0 1 1090 300"
          fill="none"
          stroke="#e2b45a"
          strokeOpacity="0.95"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="740" y1="450" x2="860" y2="450" stroke="#e2b45a" strokeWidth="2" strokeOpacity="0.9" />
        <line x1="800" y1="390" x2="800" y2="510" stroke="#e2b45a" strokeWidth="2" strokeOpacity="0.9" />
        <circle cx="800" cy="450" r="5" fill="#e2b45a" />
      </g>
      <Hud left="SYS — IDENTITY" right="REEL 01" accent="#e2b45a" />
    </SvgFrame>
  );
}

function LidarField({ label, className }: { label: string; className?: string }) {
  return (
    <SvgFrame label={label} className={className}>
      <GridLines step={120} opacity={0.04} />
      <line x1="0" y1="300" x2="1600" y2="300" stroke="#ffffff" strokeOpacity="0.07" aria-hidden />
      <Dots points={lidarFloor} />
      <Dots points={lidarClusterA} accent="#7ee0c2" />
      <Dots points={lidarClusterB} accent="#7ee0c2" />
      <g aria-hidden>
        <rect
          x="1055"
          y="315"
          width="250"
          height="210"
          fill="none"
          stroke="#7ee0c2"
          strokeOpacity="0.75"
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <path d="M 1055 315 l 26 0 M 1055 315 l 0 26" stroke="#7ee0c2" strokeWidth="3" />
        <path d="M 1305 525 l -26 0 M 1305 525 l 0 -26" stroke="#7ee0c2" strokeWidth="3" />
        <text x="1055" y="295" fontSize="24" letterSpacing="3" className="fill-white/60 font-mono">
          OBSTACLE
        </text>
      </g>
      <g aria-hidden stroke="#ffffff">
        <line x1="0" y1="530" x2="1600" y2="530" strokeOpacity="0.12" strokeDasharray="2 10" />
        <line x1="800" y1="90" x2="800" y2="180" strokeOpacity="0.3" />
        <line x1="770" y1="90" x2="830" y2="90" strokeOpacity="0.3" />
      </g>
      <Hud left="100,000+ PTS / FRAME" right="PCL · C++" accent="#7ee0c2" />
    </SvgFrame>
  );
}

function HeartbeatTrace({ label, className }: { label: string; className?: string }) {
  const pulses = [180, 340, 500, 660, 820];
  const path = [
    "M 60 480",
    ...pulses.map((x) => `L ${x - 60} 480 Q ${x - 45} 462 ${x - 30} 480 L ${x - 14} 480 L ${x - 4} 380 L ${x + 8} 528 L ${x + 18} 480 Q ${x + 38} 452 ${x + 58} 480`),
    "L 1000 480",
    "L 1250 480",
    "L 1300 480",
    "L 1300 700",
    "L 1520 700",
  ].join(" ");
  return (
    <SvgFrame label={label} className={className}>
      <GridLines step={90} opacity={0.04} />
      <g aria-hidden>
        <rect x="1000" y="360" width="250" height="240" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.14" strokeDasharray="4 6" />
        <text x="1012" y="346" fontSize="24" letterSpacing="3" className="fill-white/50 font-mono">
          PARTITION — SIGNAL LOSS
        </text>
      </g>
      <path d={path} fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="3" strokeLinejoin="round" aria-hidden />
      <g aria-hidden>
        {pulses.map((x) => (
          <circle key={x} cx={x + 2} cy={380} r="4" fill="#ffffff" fillOpacity="0.9" />
        ))}
        <line x1="1300" y1="480" x2="1300" y2="700" stroke="#ff6f61" strokeWidth="3" />
        <line x1="1300" y1="700" x2="1540" y2="700" stroke="#ff6f61" strokeWidth="3" />
        <circle cx="1300" cy="700" r="6" fill="#ff6f61" />
        <circle cx="1300" cy="700" r="14" fill="none" stroke="#ff6f61" strokeOpacity="0.4" strokeWidth="2" />
        <text x="1316" y="740" fontSize="26" letterSpacing="3" className="font-mono" fill="#ff6f61">
          HARD SHUTDOWN &lt; 2.0S
        </text>
      </g>
      <g aria-hidden className="fill-white/40 font-mono">
        {[60, 460, 860, 1260].map((x, i) => (
          <text key={x} x={x} y="816" fontSize="24" letterSpacing="2">
            {i * 500}ms
          </text>
        ))}
        <line x1="60" y1="790" x2="1540" y2="790" stroke="#ffffff" strokeOpacity="0.2" />
      </g>
      <Hud left="UDP HEARTBEAT" right="HEARTBEAT MONITORING" accent="#ff6f61" />
    </SvgFrame>
  );
}

function CallGraphField({ label, className }: { label: string; className?: string }) {
  const node = (i: number) => graphNodes[i];
  return (
    <SvgFrame label={label} className={className}>
      <GridLines step={140} opacity={0.035} />
      <g aria-hidden>
        {graphEdges.map(([a, b], i) => (
          <line
            key={i}
            x1={node(a).x}
            y1={node(a).y}
            x2={node(b).x}
            y2={node(b).y}
            stroke="#ffffff"
            strokeOpacity="0.16"
          />
        ))}
      </g>
      <g aria-hidden>
        <polyline
          points={PATH_NODES.map((i) => `${node(i).x},${node(i).y}`).join(" ")}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.7"
          strokeWidth="2"
          strokeDasharray="3 7"
        />
      </g>
      <g aria-hidden>
        {cycleEdges.map(([a, b], i) => (
          <g key={i}>
            <line
              x1={node(a).x}
              y1={node(a).y}
              x2={node(b).x}
              y2={node(b).y}
              stroke="#b9a4f5"
              strokeOpacity="0.22"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <line
              x1={node(a).x}
              y1={node(a).y}
              x2={node(b).x}
              y2={node(b).y}
              stroke="#b9a4f5"
              strokeOpacity="0.95"
              strokeWidth="2.5"
            />
          </g>
        ))}
      </g>
      <g aria-hidden>
        {graphNodes.map((n) => (
          <circle
            key={n.i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="#0a0b10"
            stroke="#ffffff"
            strokeOpacity="0.55"
            strokeWidth="1.6"
          />
        ))}
        {CYCLE.map((i) => (
          <circle
            key={`c${i}`}
            cx={node(i).x}
            cy={node(i).y}
            r={node(i).r + 2}
            fill="#b9a4f5"
            fillOpacity="0.9"
          />
        ))}
      </g>
      <Hud left="LLVM IR — CALL GRAPH" right="CYCLE DETECTED" accent="#b9a4f5" />
    </SvgFrame>
  );
}

function CipherField({ label, className }: { label: string; className?: string }) {
  return (
    <SvgFrame label={label} className={className}>
      <GridLines step={130} opacity={0.035} />
      <g aria-hidden stroke="#ffffff">
        <circle cx="800" cy="430" r="240" fill="none" strokeOpacity="0.1" strokeDasharray="3 14" />
        <circle cx="800" cy="430" r="335" fill="none" strokeOpacity="0.07" strokeDasharray="3 14" />
        <circle cx="800" cy="430" r="430" fill="none" strokeOpacity="0.045" strokeDasharray="3 14" />
      </g>
      <g aria-hidden>
        <rect x="710" y="340" width="180" height="180" rx="26" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" />
        <rect x="740" y="370" width="120" height="120" rx="16" fill="none" stroke="#6fbfe8" strokeOpacity="0.55" strokeWidth="1.6" />
        <circle cx="800" cy="418" r="20" fill="none" stroke="#6fbfe8" strokeOpacity="0.9" strokeWidth="2.4" />
        <line x1="800" y1="438" x2="800" y2="470" stroke="#6fbfe8" strokeOpacity="0.9" strokeWidth="2.4" />
        <line x1="800" y1="456" x2="818" y2="456" stroke="#6fbfe8" strokeOpacity="0.9" strokeWidth="2.4" />
        <line x1="800" y1="464" x2="812" y2="464" stroke="#6fbfe8" strokeOpacity="0.9" strokeWidth="2.4" />
      </g>
      <g aria-hidden>
        {cipherOrbit.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.a ? "#6fbfe8" : "#ffffff"}
            fillOpacity={p.a ? 0.95 : p.o}
          />
        ))}
      </g>
      <g aria-hidden>
        {cipherBits.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width="11"
            height="11"
            rx="2"
            fill={b.a ? "#6fbfe8" : "#ffffff"}
            fillOpacity={b.a ? 0.9 : b.o}
          />
        ))}
      </g>
      <Hud left="SEAL CONTEXT — C++17" right="GTEST · CI" accent="#6fbfe8" />
    </SvgFrame>
  );
}

function TunnelField({ label, className }: { label: string; className?: string }) {
  return (
    <SvgFrame label={label} className={className}>
      <GridLines step={150} opacity={0.035} />
      <g aria-hidden>
        <path d="M 300 300 Q 800 190 1300 300" fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeDasharray="2 9" />
        <path d="M 300 600 Q 800 710 1300 600" fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeDasharray="2 9" />
        <path d="M 340 340 Q 800 260 1260 340" fill="none" stroke="#f2a35e" strokeOpacity="0.3" />
        <path d="M 340 560 Q 800 640 1260 560" fill="none" stroke="#f2a35e" strokeOpacity="0.3" />
      </g>
      <g aria-hidden>
        {[380, 425, 470].map((y) => (
          <rect
            key={y}
            x="170"
            y={y - 18}
            width="110"
            height="36"
            rx="8"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.4"
          />
        ))}
        {[398, 443, 488].map((y) => (
          <circle key={y} cx="196" cy={y} r="3.5" fill="#ffffff" fillOpacity="0.5" />
        ))}
        <rect x="1290" y="240" width="170" height="340" rx="30" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
        <line x1="1350" y1="252" x2="1400" y2="252" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="4" />
        <rect x="1330" y="300" width="90" height="34" rx="17" fill="none" stroke="#f2a35e" strokeOpacity="0.9" strokeWidth="2" />
        <text x="1375" y="324" fontSize="22" letterSpacing="4" textAnchor="middle" className="font-mono" fill="#f2a35e">
          ON
        </text>
      </g>
      <g aria-hidden>
        {tunnelPackets.map((p) => (
          <rect
            key={p.x}
            x={p.x}
            y={p.y}
            width={p.s}
            height={p.s}
            rx="2.5"
            fill={p.a ? "#f2a35e" : "#ffffff"}
            fillOpacity={p.a ? 0.95 : p.o}
          />
        ))}
      </g>
      <Hud left="PACKET TUNNEL — DNS" right="SWIFTUI · GO" accent="#f2a35e" />
    </SvgFrame>
  );
}

const VISUALS: Record<VisualKey, (props: { label: string; className?: string }) => React.ReactElement> =
  {
    identity: IdentityField,
    lidar: LidarField,
    heartbeat: HeartbeatTrace,
    callgraph: CallGraphField,
    cipher: CipherField,
    tunnel: TunnelField,
  };

export function StageVisual({
  visual,
  label,
  className,
}: {
  visual: VisualKey;
  label: string;
  className?: string;
}) {
  const Component = VISUALS[visual];
  return <Component label={label} className={className} />;
}
