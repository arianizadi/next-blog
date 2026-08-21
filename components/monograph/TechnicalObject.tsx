import { cn } from "@/lib/utils";

export type TechnicalObjectKind =
  | "keyboard"
  | "pointcloud"
  | "heartbeat"
  | "board"
  | "callgraph"
  | "lattice"
  | "tunnel"
  | "segmentation";

/* Deterministic PRNG so server and client render identical plates. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const INK = "#d9d2c6";
const ACCENT = "#ff4400";

type SvgProps = { idPrefix: string };

function Frame({
  idPrefix,
  children,
}: SvgProps & { children: React.ReactNode }) {
  return (
    <>
      <defs>
        <radialGradient id={`${idPrefix}-glow`} cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#efe9de" stopOpacity="0.09" />
          <stop offset="55%" stopColor="#efe9de" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#efe9de" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${idPrefix}-floor`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="760" fill={`url(#${idPrefix}-glow)`} />
      {children}
    </>
  );
}

/* --- Hero: an ultra-low-profile keyboard study ---------------------------- */
function KeyboardObject({ idPrefix }: SvgProps) {
  const u = 74;
  const gap = 8;
  const rows: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
    [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
    [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.75],
    [1.25, 1.25, 1.5, 6.25, 1.5, 1.25, 1.25],
  ];
  const rowHeight = u - 6;
  const caseWidth = 15 * u + 14 * gap + 56;
  const caseHeight = rows.length * rowHeight + (rows.length - 1) * gap + 56;
  const caseX = (1200 - caseWidth) / 2;
  const caseY = (760 - caseHeight) / 2 + 14;

  return (
    <>
      <defs>
        <linearGradient id={`${idPrefix}-case`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#211e1a" />
          <stop offset="100%" stopColor="#131110" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-key`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#29251f" />
          <stop offset="100%" stopColor="#16130f" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-keyAccent`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6a2a" />
          <stop offset="100%" stopColor="#d13c00" />
        </linearGradient>
      </defs>

      <ellipse
        cx="600"
        cy={caseY + caseHeight + 34}
        rx={caseWidth * 0.52}
        ry="44"
        fill={`url(#${idPrefix}-floor)`}
      />

      <g transform="rotate(-2.5 600 380)">
        <rect
          x={caseX}
          y={caseY}
          width={caseWidth}
          height={caseHeight}
          rx="26"
          fill={`url(#${idPrefix}-case)`}
          stroke="#ffffff"
          strokeOpacity="0.06"
        />
        {rows.map((row, r) => {
          let cursor = caseX + 28;
          const y = caseY + 28 + r * (rowHeight + gap);
          return (
            <g key={r}>
              {row.map((units, k) => {
                const w = units * u + (units - 1) * gap;
                const x = cursor;
                cursor += w + gap;
                const isAccent = r === 0 && k === 0;
                const isHoming = r === 2 && (k === 5 || k === 8);
                return (
                  <g key={k}>
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={rowHeight}
                      rx="11"
                      fill={
                        isAccent
                          ? `url(#${idPrefix}-keyAccent)`
                          : `url(#${idPrefix}-key)`
                      }
                      stroke="#ffffff"
                      strokeOpacity={isAccent ? 0.14 : 0.05}
                    />
                    {(isHoming || units === 6.25) && (
                      <rect
                        x={x + w / 2 - (units === 6.25 ? 24 : 16)}
                        y={y + rowHeight - 15}
                        width={units === 6.25 ? 48 : 32}
                        height="3"
                        rx="1.5"
                        fill={INK}
                        opacity="0.26"
                      />
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    </>
  );
}

/* --- LiDAR: a point-cloud ground plane ------------------------------------ */
function PointCloudObject() {
  const rand = mulberry32(11);
  const dots: React.ReactNode[] = [];
  const horizon = 400;

  for (let i = 13; i >= 0; i--) {
    const t = i / 13;
    const y = horizon + 250 * t * t;
    const count = 26 + i * 3;
    const r = 1.1 + 2.3 * t;
    const opacity = 0.06 + 0.4 * t * t;
    for (let j = 0; j < count; j++) {
      const x = 40 + (1120 / count) * j + (rand() - 0.5) * 46 * (1 - t);
      dots.push(
        <circle
          key={`g-${i}-${j}`}
          cx={x}
          cy={y + (rand() - 0.5) * 26 * t}
          r={r}
          fill={INK}
          opacity={opacity * (0.6 + rand() * 0.4)}
        />
      );
    }
  }

  for (let k = 0; k < 70; k++) {
    const x = 120 + rand() * 960;
    const y = 130 + rand() * 300;
    const isAccent = k % 23 === 0;
    dots.push(
      <circle
        key={`a-${k}`}
        cx={x}
        cy={y}
        r={isAccent ? 3.4 : 1 + rand() * 2.2}
        fill={isAccent ? ACCENT : INK}
        opacity={isAccent ? 0.95 : 0.12 + rand() * 0.3}
      />
    );
  }

  return (
    <>
      <line
        x1="60"
        y1={horizon}
        x2="1140"
        y2={horizon}
        stroke={INK}
        strokeOpacity="0.12"
      />
      {dots}
    </>
  );
}

/* --- UDP heartbeat: one long pulse ---------------------------------------- */
function HeartbeatObject({ idPrefix }: SvgProps) {
  const y = 396;
  const beat =
    "h 150 c 10 0 14 -8 20 -26 c 8 -24 12 -52 20 -52 c 8 0 12 28 20 52 c 6 18 10 26 20 26 h 60";
  const d = `M 70 ${y} ${beat} ${beat} ${beat} ${beat}`;
  const spikeStartX = 70 + (150 + 80) * 2;

  return (
    <>
      <defs>
        <filter id={`${idPrefix}-blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
      <path
        d={d}
        fill="none"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.13"
        transform="translate(0 30)"
      />
      <path
        d={`M ${spikeStartX} ${y} c 10 0 14 -8 20 -26 c 8 -24 12 -52 20 -52 c 8 0 12 28 20 52 c 6 18 10 26 20 26`}
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.6"
        strokeLinecap="round"
        filter={`url(#${idPrefix}-blur)`}
        opacity="0.85"
      />
      <circle cx={spikeStartX + 80} cy={y - 78} r="5" fill={ACCENT} />
      <circle cx={1096} cy={y} r="4" fill={INK} opacity="0.55" />
    </>
  );
}

/* --- RustOS: bare-metal board --------------------------------------------- */
function BoardObject({ idPrefix }: SvgProps) {
  const s = 330;
  const x = (1200 - s) / 2;
  const y = (760 - s) / 2;
  const pinsPerSide = 9;
  const pins: React.ReactNode[] = [];
  for (let i = 0; i < pinsPerSide; i++) {
    const p = x + 34 + (i * (s - 68)) / (pinsPerSide - 1);
    pins.push(
      <rect key={`t${i}`} x={p - 4} y={y - 24} width="8" height="24" rx="2" fill="#221f1a" />,
      <rect key={`b${i}`} x={p - 4} y={y + s} width="8" height="24" rx="2" fill="#221f1a" />,
      <rect key={`l${i}`} x={x - 24} y={p - 4} width="24" height="8" rx="2" fill="#221f1a" />,
      <rect key={`r${i}`} x={x + s} y={p - 4} width="24" height="8" rx="2" fill="#221f1a" />
    );
  }

  return (
    <>
      <ellipse
        cx="600"
        cy={y + s + 66}
        rx={s * 0.62}
        ry="40"
        fill={`url(#${idPrefix}-floor)`}
      />
      <rect
        x={x - 44}
        y={y - 44}
        width={s + 88}
        height={s + 88}
        rx="30"
        fill="#15120f"
        stroke="#ffffff"
        strokeOpacity="0.06"
      />
      {[
        [x - 20, y - 20],
        [x + s + 20, y - 20],
        [x - 20, y + s + 20],
        [x + s + 20, y + s + 20],
      ].map(([hx, hy], i) => (
        <circle key={i} cx={hx} cy={hy} r="9" fill="none" stroke={INK} strokeOpacity="0.22" />
      ))}
      {pins}
      <rect
        x={x}
        y={y}
        width={s}
        height={s}
        rx="24"
        fill="#1b1814"
        stroke="#ffffff"
        strokeOpacity="0.1"
      />
      <rect
        x={x + 42}
        y={y + 42}
        width={s - 84}
        height={s - 84}
        rx="14"
        fill="#0e0c0a"
        stroke="#ffffff"
        strokeOpacity="0.07"
      />
      <g stroke={INK} strokeOpacity="0.13" strokeWidth="1.4">
        <path d={`M ${x + 70} ${y + 96} h 90 v -30 h 110`} fill="none" />
        <path d={`M ${x + 70} ${y + 150} h 150`} fill="none" />
        <path d={`M ${x + 190} ${y + 210} h 80 v 40`} fill="none" />
        <circle cx={x + 165} cy={y + 150} r="14" fill="none" />
      </g>
      <circle cx={x + s - 34} cy={y + 34} r="6.5" fill={ACCENT} opacity="0.95" />
      <circle cx={x + s - 34} cy={y + 34} r="12" fill={ACCENT} opacity="0.18" />
    </>
  );
}

/* --- T-REX: timing call graph --------------------------------------------- */
function CallGraphObject() {
  const nodes = [
    { cx: 300, cy: 500, r: 20 },
    { cx: 470, cy: 290, r: 15 },
    { cx: 700, cy: 330, r: 26 },
    { cx: 900, cy: 500, r: 17 },
    { cx: 610, cy: 545, r: 12 },
  ];
  const edges: Array<[number, number, boolean]> = [
    [0, 1, false],
    [1, 2, true],
    [2, 3, true],
    [3, 0, false],
    [2, 4, false],
    [4, 0, false],
    [1, 3, false],
  ];

  return (
    <>
      {edges.map(([a, b, hot], i) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        const mx = (n1.cx + n2.cx) / 2;
        const my = (n1.cy + n2.cy) / 2 - 46;
        return (
          <path
            key={i}
            d={`M ${n1.cx} ${n1.cy} Q ${mx} ${my} ${n2.cx} ${n2.cy}`}
            fill="none"
            stroke={hot ? ACCENT : INK}
            strokeOpacity={hot ? 0.85 : 0.28}
            strokeWidth={hot ? 2 : 1.4}
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="#181512"
            stroke={i === 2 ? ACCENT : INK}
            strokeOpacity={i === 2 ? 0.9 : 0.4}
            strokeWidth="1.6"
          />
          <circle cx={n.cx} cy={n.cy} r="3" fill={INK} opacity="0.5" />
        </g>
      ))}
    </>
  );
}

/* --- SEALCrypt: encrypted lattice ----------------------------------------- */
function LatticeObject({ idPrefix }: SvgProps) {
  const rand = mulberry32(7);
  const cols = 9;
  const rowCount = 6;
  const cw = 92;
  const ch = 66;
  const gx = 14;
  const gy = 14;
  const totalW = cols * cw + (cols - 1) * gx;
  const totalH = rowCount * ch + (rowCount - 1) * gy;
  const x0 = (1200 - totalW) / 2;
  const y0 = (760 - totalH) / 2;
  const accentIndex = 23;

  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const roll = rand();
      const isAccent = idx === accentIndex;
      let fill = "none";
      if (!isAccent) {
        if (roll > 0.72) fill = "#211d18";
        else if (roll > 0.5) fill = "#181511";
      }
      cells.push(
        <rect
          key={idx}
          x={x0 + c * (cw + gx)}
          y={y0 + r * (ch + gy)}
          width={cw}
          height={ch}
          rx="10"
          fill={isAccent ? ACCENT : fill}
          stroke={isAccent ? "none" : INK}
          strokeOpacity={fill === "none" ? 0.1 : 0.05}
        />
      );
    }
  }

  return (
    <>
      <ellipse
        cx="600"
        cy={y0 + totalH + 60}
        rx={totalW * 0.5}
        ry="46"
        fill={`url(#${idPrefix}-floor)`}
      />
      <g transform="rotate(-4 600 380)">{cells}</g>
    </>
  );
}

/* --- VpnDad: packet tunnel profile ----------------------------------------- */
function TunnelObject({ idPrefix }: SvgProps) {
  const cy = 560;
  const rings = [
    { r: 330, o: 0.1 },
    { r: 264, o: 0.16 },
    { r: 198, o: 0.24 },
    { r: 132, o: 0.36 },
  ];
  return (
    <>
      {rings.map(({ r, o }, i) => (
        <path
          key={i}
          d={`M ${600 - r} ${cy} A ${r} ${r} 0 0 1 ${600 + r} ${cy}`}
          fill="none"
          stroke={INK}
          strokeOpacity={o}
          strokeWidth="2"
        />
      ))}
      <path
        d={`M ${600 - 66} ${cy} A 66 66 0 0 1 ${600 + 66} ${cy}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.4"
        opacity="0.9"
      />
      <circle cx="600" cy={cy - 66} r="5.5" fill={ACCENT} />
      <ellipse cx="600" cy={cy + 44} rx="230" ry="34" fill={`url(#${idPrefix}-floor)`} />
      <rect
        x={528}
        y={cy - 26}
        width="144"
        height="52"
        rx="14"
        fill="#17140f"
        stroke={INK}
        strokeOpacity="0.28"
      />
      <circle cx="600" cy={cy} r="4" fill={INK} opacity="0.6" />
    </>
  );
}

/* --- Segmentary: segmentation masks over a scene --------------------------- */
function SegmentationObject({ idPrefix }: SvgProps) {
  return (
    <>
      <defs>
        <clipPath id={`${idPrefix}-scene`}>
          <rect x="200" y="140" width="800" height="480" rx="26" />
        </clipPath>
      </defs>
      <rect
        x="200"
        y="140"
        width="800"
        height="480"
        rx="26"
        fill="#12100d"
        stroke="#ffffff"
        strokeOpacity="0.08"
      />
      <g clipPath={`url(#${idPrefix}-scene)`}>
        <rect x="200" y="140" width="800" height="170" fill={INK} opacity="0.07" />
        <path d="M 420 620 L 560 310 L 700 310 L 900 620 Z" fill={INK} opacity="0.14" />
        <path
          d="M 260 380 C 300 300 420 280 470 340 C 520 400 470 470 400 480 C 320 492 230 450 260 380 Z"
          fill={INK}
          opacity="0.2"
          stroke={INK}
          strokeOpacity="0.3"
        />
        <path
          d="M 700 220 C 780 200 880 240 880 320 C 880 390 790 400 740 370 C 690 340 650 235 700 220 Z"
          fill={ACCENT}
          opacity="0.14"
          stroke={ACCENT}
          strokeOpacity="0.85"
          strokeWidth="2.2"
        />
        <path
          d="M 560 470 C 620 430 720 450 730 510 C 738 560 660 590 600 575 C 545 562 520 500 560 470 Z"
          fill={INK}
          opacity="0.26"
          stroke={INK}
          strokeOpacity="0.35"
        />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={598 + i * 4}
            y={430 + i * 70}
            width="4"
            height="34"
            rx="2"
            fill={INK}
            opacity="0.3"
          />
        ))}
      </g>
    </>
  );
}

const OBJECTS: Record<TechnicalObjectKind, (props: SvgProps) => React.ReactNode> = {
  keyboard: KeyboardObject,
  pointcloud: PointCloudObject,
  heartbeat: HeartbeatObject,
  board: BoardObject,
  callgraph: () => <CallGraphObject />,
  lattice: LatticeObject,
  tunnel: TunnelObject,
  segmentation: SegmentationObject,
};

export function TechnicalObject({
  kind,
  idPrefix,
  className,
}: {
  kind: TechnicalObjectKind;
  idPrefix: string;
  className?: string;
}) {
  const Body = OBJECTS[kind];
  return (
    <svg
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
      className={cn("h-full w-full", className)}
    >
      <Frame idPrefix={idPrefix}>
        <Body idPrefix={idPrefix} />
      </Frame>
    </svg>
  );
}
