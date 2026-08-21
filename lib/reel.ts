import { projects } from "@/lib/portfolio";
import { siteConfig } from "@/app/config/site";

export type VisualKey =
  | "identity"
  | "lidar"
  | "heartbeat"
  | "callgraph"
  | "cipher"
  | "tunnel";

export type SlideMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "visual"; visual: VisualKey; label: string };

export interface SlideLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ReelSlide {
  id: string;
  kind: "identity" | "project";
  display: string;
  kicker: string;
  category: string;
  description: string;
  technologies: string[];
  links: SlideLink[];
  media: SlideMedia;
  accent: string;
  projectId?: number;
}

export const slides: ReelSlide[] = [
  {
    id: "identity",
    kind: "identity",
    display: "Arian Izadi",
    kicker: "Embedded Software Engineer II — Konami Gaming",
    category: "Opening · Identity / Current Work",
    description: "Embedded & systems software engineer.",
    technologies: ["C/C++", "Linux", "Real-Time Systems", "Robotics", "Rust"],
    links: [
      { label: "Resume", href: siteConfig.links.resume, external: true },
      { label: "Journey", href: "/journey" },
      { label: "Writing", href: "/blog" },
      { label: "GitHub", href: siteConfig.links.github, external: true },
    ],
    media: {
      kind: "visual",
      visual: "identity",
      label: "Abstract field of signal points and concentric rings",
    },
    accent: "#e2b45a",
  },
  {
    id: "lidar-perception",
    kind: "project",
    display: "LiDAR",
    kicker: "Koshee AI — Robotics Perception",
    category: "Robotics Perception",
    description:
      "C++/PCL perception pipeline handling more than 100,000 LiDAR points per frame within explicit timing and memory constraints.",
    technologies: ["C++", "PCL", "LiDAR", "Point Clouds"],
    links: [],
    media: {
      kind: "visual",
      visual: "lidar",
      label: "Point-cloud floor with obstacle clusters and a bounding box",
    },
    accent: "#7ee0c2",
    projectId: 15,
  },
  {
    id: "heartbeat-switch",
    kind: "project",
    display: "Heartbeat",
    kicker: "Koshee AI — Fault Handling",
    category: "Networking & Fault Handling",
    description:
      "UDP heartbeats detect network partitions and connect communication loss to shutdown control, enforcing hard shutdown behavior within a sub-two-second window.",
    technologies: ["UDP", "Networking", "Heartbeat Monitoring", "Fault Handling"],
    links: [],
    media: {
      kind: "visual",
      visual: "heartbeat",
      label: "Heartbeat trace with a signal-loss partition and shutdown drop",
    },
    accent: "#ff6f61",
    projectId: 16,
  },
  {
    id: "rustos",
    kind: "project",
    display: "RustOS",
    kicker: "Low-Level Systems — Bare-Metal RISC-V",
    category: "Bare-Metal Kernel Prototype",
    description:
      "A bare-metal RISC-V kernel prototype: boot path in assembly, custom linker scripts, UART output, and a small Rust kernel environment, with low-level debugging across Rust, QEMU, and bare-metal constraints.",
    technologies: ["Rust", "Assembly", "RISC-V", "QEMU", "Linker Scripts"],
    links: [
      { label: "Source", href: "https://github.com/arianizadi/rustos", external: true },
    ],
    media: {
      kind: "image",
      src: "https://images.downey.io/blog/cs140e-rust-ferris-crochet-downey-1.jpg",
      alt: "Ferris, the Rust mascot",
    },
    accent: "#f2703d",
    projectId: 8,
  },
  {
    id: "t-rex",
    kind: "project",
    display: "T-REX",
    kicker: "Heuristic Timing Analysis",
    category: "Timing Analysis Tooling",
    description:
      "Heuristic WCET exploration for Rust: parses LLVM IR, builds call graphs, detects cycles, and visualizes timing paths with Python tooling. Exploratory analysis, not a formal proof.",
    technologies: ["Python", "LLVM", "Rust", "NetworkX", "Matplotlib"],
    links: [
      {
        label: "Source",
        href: "https://github.com/arianizadi/rust-parser-wcet",
        external: true,
      },
    ],
    media: {
      kind: "visual",
      visual: "callgraph",
      label: "Call graph with nodes, directed edges, and a highlighted cycle",
    },
    accent: "#b9a4f5",
    projectId: 2,
  },
  {
    id: "sealcrypt",
    kind: "project",
    display: "SEALCrypt",
    kicker: "C++17 Library — Testing & CI",
    category: "C++ Library Engineering",
    description:
      "Wraps Microsoft SEAL encryption-context setup behind a modern C++17 interface, with CMake builds, Google Test coverage, and GitHub Actions CI.",
    technologies: ["C++17", "CMake", "Google Test", "GitHub Actions"],
    links: [
      { label: "Source", href: "https://github.com/arianizadi/sealcrypt", external: true },
    ],
    media: {
      kind: "visual",
      visual: "cipher",
      label: "Concentric cipher rings orbiting a key seal",
    },
    accent: "#6fbfe8",
    projectId: 10,
  },
  {
    id: "segmentary",
    kind: "project",
    display: "Segmentary",
    kicker: "Semantic Segmentation Framework",
    category: "ML / Computer Vision",
    description:
      "Config-driven PyTorch suite for training, transfer learning, evaluation, comparison, export, and benchmark analysis across Hugging Face, native, and SMP models.",
    technologies: ["Python", "PyTorch", "Hugging Face", "Lightning", "CUDA"],
    links: [
      { label: "Source", href: "https://github.com/arianizadi/segmentary", external: true },
      { label: "Writing", href: "/blog" },
    ],
    media: {
      kind: "image",
      src: "https://www.wilddash.cc/static/images/lab3-rs19.jpg",
      alt: "Railway scene from segmentation dataset work",
    },
    accent: "#a2d96c",
    projectId: 1,
  },
  {
    id: "vpndad",
    kind: "project",
    display: "VpnDad",
    kicker: "iOS Packet Tunnel",
    category: "iOS / Networking",
    description:
      "A SwiftUI app with a Network Extension packet tunnel, a Go mobile bridge, JSON profile import/export, diagnostics, and MasterDnsVPN-aware reliability controls.",
    technologies: ["SwiftUI", "NetworkExtension", "Go", "gomobile", "MasterDnsVPN"],
    links: [
      { label: "Source", href: "https://github.com/arianizadi/VpnDad", external: true },
    ],
    media: {
      kind: "visual",
      visual: "tunnel",
      label: "Packets streaming through a tunnel between a server and a phone",
    },
    accent: "#f2a35e",
    projectId: 13,
  },
];

export interface RosterEntry {
  id: number;
  title: string;
  eyebrow: string;
  technologies: string[];
  href: string | null;
  external: boolean;
  reelIndex: number | null;
}

const reelIndexByProjectId = new Map<number, number>(
  slides.flatMap((slide, index) =>
    slide.projectId !== undefined ? [[slide.projectId, index] as const] : []
  )
);

export const roster: RosterEntry[] = projects.map((project) => {
  const reelIndex = reelIndexByProjectId.get(project.id) ?? null;
  const href = reelIndex !== null ? null : (project.liveUrl ?? project.githubUrl ?? null);
  return {
    id: project.id,
    title: project.title,
    eyebrow: project.eyebrow,
    technologies: project.technologies,
    href,
    external: href !== null,
    reelIndex,
  };
});
