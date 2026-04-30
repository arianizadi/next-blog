export interface ImpactMetric {
  label: string;
  value: string;
  detail: string;
}

export interface Project {
  id: number;
  title: string;
  eyebrow: string;
  problem: string;
  contribution: string;
  impact: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location?: string;
  dates: string;
  summary: string;
  technologies: string[];
  bulletPoints: string[];
}

export interface Contribution {
  id: number;
  project: string;
  feature: string;
  description: string;
  githubUrl: string;
  prUrl?: string;
  status: "merged" | "open" | "pending" | "forked";
  technologies?: string[];
}

export interface TechGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export const impactMetrics: ImpactMetric[] = [
  {
    label: "Credit One Bank",
    value: "Software Engineer",
    detail: "Java, Spring Boot, Kafka, Kubernetes",
  },
  {
    label: "UNLV",
    value: "M.S. CS, 4.0 GPA",
    detail: "Real-time systems, security, operating systems",
  },
  {
    label: "Open Source",
    value: "Merged PRs",
    detail: "OctoMap point clouds and CVAT annotation tooling",
  },
  {
    label: "Research",
    value: "Railway CV",
    detail: "Semantic segmentation for track condition analysis",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Railway Semantic Segmentation Research",
    eyebrow: "Computer Vision Research",
    problem:
      "Railway inspection workflows need reliable pixel-level understanding of track, ballast, and surrounding scene context.",
    contribution:
      "Fine-tuned segmentation models on RailSem19-style data, added transfer-learning support in an MMSegmentation fork, and evaluated railway-specific failure modes.",
    impact:
      "Turned academic segmentation work into a practical inspection pipeline for detecting track-adjacent issues such as mud pumping indicators.",
    image: "https://www.wilddash.cc/static/images/lab3-rs19.jpg",
    technologies: ["Python", "PyTorch", "MMSegmentation", "RailSem19"],
    githubUrl: "https://github.com/arianizadi/mmsegmentation",
    featured: true,
  },
  {
    id: 11,
    title: "Inference Checker",
    eyebrow: "Model Evaluation Tooling",
    problem:
      "Segmentation models are hard to compare when outputs live as separate masks and aggregate metrics hide visual regressions.",
    contribution:
      "Built an interactive Next.js canvas tool with single, side-by-side, diff, overlay, hover inspection, and per-class metric modes.",
    impact:
      "Made qualitative model review faster by pairing pixel-level inspection with IoU and accuracy summaries in one workflow.",
    image: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/inference.png",
    technologies: ["Next.js", "TypeScript", "Canvas API", "Tailwind CSS"],
    liveUrl: "https://inference-checker.vercel.app",
    featured: true,
  },
  {
    id: 10,
    title: "SEALCrypt",
    eyebrow: "C++ Library",
    problem:
      "Microsoft SEAL setup has enough context and parameter wiring to slow down experimentation with encrypted computation.",
    contribution:
      "Wrapped encryption-context initialization behind a modern C++17 interface with CMake, tests, and CI.",
    impact:
      "Reduced setup overhead for homomorphic encryption experiments while keeping thread-safety and testability visible.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYL_2VvThixV3iCXrp3qzMlb5eWt8BE-sag&s",
    technologies: ["C++17", "CMake", "Google Test", "GitHub Actions"],
    githubUrl: "https://github.com/arianizadi/sealcrypt",
    featured: true,
  },
  {
    id: 8,
    title: "RustOS: Bare-Metal RISC-V Kernel",
    eyebrow: "Systems Programming",
    problem:
      "Understanding OS internals requires working directly with boot flow, memory layout, device IO, and toolchain constraints.",
    contribution:
      "Implemented a boot path in RISC-V assembly, custom linker scripts, UART output, and a small Rust kernel environment.",
    impact:
      "Demonstrates low-level debugging discipline across assembly, Rust, QEMU, and bare-metal constraints.",
    image:
      "https://images.downey.io/blog/cs140e-rust-ferris-crochet-downey-1.jpg",
    technologies: ["Rust", "Assembly", "RISC-V", "QEMU", "Linker Scripts"],
    githubUrl: "https://github.com/arianizadi/rustos",
    featured: true,
  },
  {
    id: 12,
    title: "Cal",
    eyebrow: "Privacy-First iOS App",
    problem:
      "Most nutrition apps require subscriptions, accounts, backend services, or third-party nutrition APIs for basic logging.",
    contribution:
      "Built a local-first SwiftUI app that reads package labels with on-device Vision OCR and stores nutrition data locally.",
    impact:
      "Kept scanning and macro tracking private while making the app self-buildable from source for personal use.",
    technologies: ["Swift", "SwiftUI", "SwiftData", "Vision", "HealthKit"],
    githubUrl: "https://github.com/arianizadi/opensource-cal",
  },
  {
    id: 3,
    title: "LiDAR 2D Room Mapping",
    eyebrow: "Robotics Perception",
    problem:
      "Raw LiDAR captures include floor planes and noisy points that obscure usable room geometry.",
    contribution:
      "Processed point clouds with PCL and OpenCV, removed floor planes with RANSAC, and generated 2D room maps.",
    impact:
      "Produced a clearer perception output from real sensor data for downstream robotics workflows.",
    technologies: ["C++", "PCL", "OpenCV", "CMake", "LiDAR"],
    githubUrl: "https://github.com/arianizadi/pointclouds_livox",
  },
  {
    id: 2,
    title: "T-REX: Rust WCET Analyzer",
    eyebrow: "Static Analysis",
    problem:
      "Timing analysis for Rust code needs a bridge from LLVM IR into call graphs and loop/cycle analysis.",
    contribution:
      "Parsed LLVM IR, built call graphs, detected cycles, and visualized timing paths with Python tooling.",
    impact:
      "Explored practical WCET analysis workflows for systems where predictability matters.",
    technologies: ["Python", "LLVM", "Rust", "NetworkX", "Matplotlib"],
    githubUrl: "https://github.com/arianizadi/rust-parser-wcet",
  },
  {
    id: 9,
    title: "Knowledge Mapper",
    eyebrow: "AI Learning Tool",
    problem:
      "Static study guides do not reveal where a learner's understanding is shallow or brittle.",
    contribution:
      "Built a Next.js assessment interface that generates dynamic checks and maps knowledge gaps.",
    impact:
      "Turned study sessions into targeted feedback loops rather than passive review.",
    technologies: ["Next.js", "TypeScript", "React", "LLMs"],
    liveUrl: "https://knowledge-mapper.vercel.app",
  },
  {
    id: 6,
    title: "Reverse Engineering Tutorials",
    eyebrow: "Security Education",
    problem:
      "Low-level security learning is easier when examples are legal, reproducible, and focused on reasoning.",
    contribution:
      "Documented CTF-style reverse engineering walkthroughs using tools such as Ghidra and IDA.",
    impact:
      "Created a structured learning trail for binary analysis, debugging, and defensive security thinking.",
    technologies: ["C++", "Python", "Assembly", "Ghidra", "IDA Pro"],
    githubUrl: "https://github.com/arianizadi/ReverseEngineering",
  },
  {
    id: 4,
    title: "Lazy Wordler",
    eyebrow: "Web Utility",
    problem:
      "Wordle-solving strategies are easier to reason about when guesses can be compared against known answer sets.",
    contribution:
      "Built a small Next.js utility for answer lookup and solver experimentation.",
    impact:
      "Kept a lightweight puzzle helper available as a deployable web app.",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/arianizadi/lazy-wordler",
    liveUrl: "https://lazy-wordler.vercel.app",
  },
  {
    id: 5,
    title: "Proton Pass to Chrome Converter",
    eyebrow: "Migration Utility",
    problem:
      "Password-manager exports often need reshaping before another browser or tool can import them cleanly.",
    contribution:
      "Built a simple Python converter from Proton Pass export shape into Chrome-compatible CSV output.",
    impact:
      "Made a one-off personal migration repeatable and inspectable from source.",
    technologies: ["Python", "JSON", "CSV"],
    githubUrl: "https://github.com/arianizadi/protonpasstochrome",
  },
];

export const experiences: ExperienceItem[] = [
  {
    company: "Credit One Bank",
    role: "Software Engineer",
    location: "Las Vegas, NV",
    dates: "July 2025 to Present",
    summary:
      "Backend engineer working on event-driven account and customer systems in a regulated banking environment.",
    technologies: ["Java", "Spring Boot", "Kafka", "Kubernetes", "Elasticsearch"],
    bulletPoints: [
      "Develop and maintain Java/Spring Boot microservices that process account and customer events through Kafka-based workflows.",
      "Implement Kafka consumers and producers with tested error handling, retry behavior, and dead-letter queue flows.",
      "Support Elasticsearch and relational database integrations for account search, indexing, and event-driven synchronization.",
    ],
  },
  {
    company: "Koshee AI",
    role: "Embedded Systems & Robotics Intern",
    dates: "Jan 2024 to July 2025",
    summary:
      "Built robotics infrastructure across safety controls, LiDAR perception, and C++ build automation.",
    technologies: ["C++", "CMake/CTest", "LiDAR", "Networking", "GitHub Actions"],
    bulletPoints: [
      "Architected a UDP heartbeat safety switch that enforced hard shutdown behavior within a sub-2-second window during network partitions.",
      "Created a LiDAR perception pipeline in C++/PCL that handled 100k+ points per frame within strict timing and memory constraints.",
      "Built CMake and GitHub Actions workflows with distributed caching, reducing build times from 15 minutes to 4 minutes.",
    ],
  },
  {
    company: "Code Central",
    role: "Lead Instructor & Full Stack Web Developer",
    dates: "May 2023 to Jan 2024",
    summary:
      "Taught programming while improving an internal learning platform used by students and schools.",
    technologies: ["PHP", "MySQL", "JavaScript", "API Development", "Secure Programming"],
    bulletPoints: [
      "Improved LMS data protection by patching SQL injection issues and strengthening PHP/MySQL data access patterns.",
      "Implemented Clever SSO so 200+ students could access course material through school accounts.",
      "Led classroom instruction across web fundamentals, backend concepts, and secure programming habits.",
    ],
  },
];

export const contributions: Contribution[] = [
  {
    id: 1,
    project: "OctoMap",
    feature: "PCD File Reading",
    description:
      "Added PCD point-cloud file reading support to a widely used 3D occupancy mapping library.",
    githubUrl: "https://github.com/OctoMap/octomap",
    prUrl: "https://github.com/OctoMap/octomap/pull/430",
    status: "merged",
    technologies: ["C++", "Point Clouds", "3D Mapping"],
  },
  {
    id: 2,
    project: "CVAT",
    feature: "Z Layer Controls",
    description:
      "Implemented z-layer increment and decrement controls for annotation layers in CVAT.",
    githubUrl: "https://github.com/cvat-ai/cvat",
    prUrl: "https://github.com/cvat-ai/cvat/pull/9063",
    status: "merged",
    technologies: ["TypeScript", "React", "Annotation Tools"],
  },
  {
    id: 4,
    project: "MMSegmentation",
    feature: "RailSem19 Transfer Learning",
    description:
      "Maintained railway segmentation training changes for model experimentation and research.",
    githubUrl: "https://github.com/arianizadi/mmsegmentation",
    status: "forked",
    technologies: ["Python", "PyTorch", "Computer Vision"],
  },
];

export const techGroups: TechGroup[] = [
  {
    id: "systems",
    title: "Systems & Embedded",
    description: "Low-level software, kernels, debugging, and real-time constraints.",
    skills: ["C++", "Rust", "C", "RISC-V", "Linux", "CMake", "GDB", "QEMU"],
  },
  {
    id: "backend",
    title: "Backend & Platform",
    description: "Production services, event streams, search, deployment, and CI.",
    skills: [
      "Java",
      "Spring Boot",
      "Kafka",
      "Kubernetes",
      "Elasticsearch",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    id: "perception",
    title: "Robotics & Perception",
    description: "Sensor processing, segmentation, and computer vision research.",
    skills: [
      "Python",
      "PyTorch",
      "MMSegmentation",
      "OpenCV",
      "PCL",
      "LiDAR",
      "RANSAC",
      "Semantic Segmentation",
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "CTF practice, reverse engineering, network analysis, and secure coding.",
    skills: [
      "Network Security",
      "Ghidra",
      "IDA Pro",
      "Wireshark",
      "Burp Suite",
      "Binary Analysis",
      "Secure Programming",
    ],
  },
  {
    id: "product",
    title: "Product & Web",
    description: "Interfaces that make technical systems observable and usable.",
    skills: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Canvas API",
      "SwiftUI",
      "HealthKit",
    ],
  },
];
