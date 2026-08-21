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

export const projects: Project[] = [
  {
    id: 15,
    title: "LiDAR Perception Pipeline",
    eyebrow: "Koshee AI · Robotics Perception",
    problem:
      "High-density point-cloud processing had to stay within strict timing and memory constraints.",
    contribution:
      "Created a C++/PCL LiDAR perception pipeline that handled more than 100,000 points per frame.",
    impact:
      "Processed high-density LiDAR data within explicit timing and memory constraints.",
    technologies: ["C++", "PCL", "LiDAR", "Point Clouds"],
    featured: true,
  },
  {
    id: 16,
    title: "UDP Heartbeat Safety Switch",
    eyebrow: "Koshee AI · Fault Handling",
    problem:
      "Loss of the network control link required a bounded response.",
    contribution:
      "Used UDP heartbeats to detect network partitions and connect communication loss to shutdown control.",
    impact:
      "Enforced hard shutdown behavior within a sub-two-second window.",
    technologies: ["UDP", "Networking", "Heartbeat Monitoring", "Fault Handling"],
    featured: true,
  },
  {
    id: 8,
    title: "RustOS: Bare-Metal RISC-V Kernel",
    eyebrow: "Low-Level Systems",
    problem:
      "Understanding operating-system internals requires direct control over boot flow, memory layout, device I/O, and toolchain constraints.",
    contribution:
      "Implemented a boot path in RISC-V assembly, custom linker scripts, UART output, and a small Rust kernel environment.",
    impact:
      "Exercised low-level debugging across assembly, Rust, QEMU, and bare-metal constraints.",
    image:
      "https://images.downey.io/blog/cs140e-rust-ferris-crochet-downey-1.jpg",
    technologies: ["Rust", "Assembly", "RISC-V", "QEMU", "Linker Scripts"],
    githubUrl: "https://github.com/arianizadi/rustos",
    featured: true,
  },
  {
    id: 2,
    title: "T-REX: WCET Analysis for Rust",
    eyebrow: "Heuristic Timing Analysis",
    problem:
      "Timing analysis for Rust code needs a bridge from LLVM IR into call graphs and loop/cycle analysis.",
    contribution:
      "Parsed LLVM IR, built call graphs, detected cycles, and visualized timing paths with Python tooling.",
    impact:
      "Explored heuristic WCET workflows for systems where predictable execution matters.",
    technologies: ["Python", "LLVM", "Rust", "NetworkX", "Matplotlib"],
    githubUrl: "https://github.com/arianizadi/rust-parser-wcet",
    featured: true,
  },
  {
    id: 10,
    title: "SEALCrypt",
    eyebrow: "C++17 Library · Testing",
    problem:
      "Microsoft SEAL setup has enough context and parameter wiring to slow down experimentation with encrypted computation.",
    contribution:
      "Wrapped encryption-context initialization behind a modern C++17 interface with CMake, tests, and CI.",
    impact:
      "Reduced setup overhead while keeping configuration and testability explicit in the library interface.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYL_2VvThixV3iCXrp3qzMlb5eWt8BE-sag&s",
    technologies: ["C++17", "CMake", "Google Test", "GitHub Actions"],
    githubUrl: "https://github.com/arianizadi/sealcrypt",
    featured: true,
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
    id: 6,
    title: "Reverse Engineering Tutorials",
    eyebrow: "Low-Level Security",
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
    id: 13,
    title: "VpnDad",
    eyebrow: "iOS Packet Tunnel",
    problem:
      "MasterDnsVPN is powerful on the server side, but it did not have a practical iOS client for family members who just need a reliable connect button.",
    contribution:
      "Built a SwiftUI app with a Network Extension packet tunnel, a Go mobile bridge, JSON profile import/export, diagnostics, and MasterDnsVPN-aware reliability controls.",
    impact:
      "Turned a command-line DNS tunnel into a mobile workflow that can run against standard MasterDnsVPN servers while exposing custom profile controls when the server supports them.",
    image:
      "https://www.americanprogress.org/wp-content/uploads/sites/2/2026/03/CaseAgainstIranColumn-2264384567.jpg?w=1680",
    technologies: ["SwiftUI", "NetworkExtension", "Go", "gomobile", "MasterDnsVPN"],
    githubUrl: "https://github.com/arianizadi/VpnDad",
  },
  {
    id: 1,
    title: "Segmentary",
    eyebrow: "Semantic Segmentation Framework",
    problem:
      "Semantic segmentation experiments are difficult to reproduce when configs, taxonomy mappings, checkpoints, metrics, and deployment benchmarks live in separate tools.",
    contribution:
      "Built a config-driven PyTorch suite for training, transfer learning, evaluation, comparison, export, and analysis across Hugging Face, native, and SMP models.",
    impact:
      "Created a reproducible model lifecycle today while building toward a complete segmentation suite for the Hugging Face ecosystem.",
    image: "https://www.wilddash.cc/static/images/lab3-rs19.jpg",
    technologies: ["Python", "PyTorch", "Hugging Face", "Lightning", "CUDA"],
    githubUrl: "https://github.com/arianizadi/segmentary",
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
    id: 14,
    title: "Fantasy Football Notifier",
    eyebrow: "Real-Time Alerting",
    problem:
      "Breaking NFL news is fast but noisy, and a headline alone does not show whether a roster move is actually available in each fantasy league.",
    contribution:
      "Built a Python pipeline that joins X and RotoWire reports with ESPN and Sleeper rosters, deterministic depth charts, model-assisted classification, deduplication, and Telegram delivery.",
    impact:
      "Turns raw player news into per-league lineup and waiver guidance while keeping credentials and roster state outside the repository.",
    technologies: ["Python", "OpenRouter", "Telegram", "X API", "Sleeper"],
    githubUrl: "https://github.com/arianizadi/fantasy-football-notifier",
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
    company: "Konami Gaming, Inc.",
    role: "Embedded Software Engineer II",
    location: "Las Vegas, NV",
    dates: "July 2026 to Present",
    summary:
      "R&D work across embedded hardware, manufacturing systems, and regulated gaming software.",
    technologies: [
      "C/C++",
      "Embedded Systems",
      "Hardware Integration",
      "Unit Testing",
      "Technical Leadership",
    ],
    bulletPoints: [
      "Research, design, and maintain C/C++ components integrated with embedded hardware and manufacturing systems.",
      "Translate complex requirements into testable, standards-aligned software through code review, unit testing, revision control, and clear documentation.",
      "Coordinate delivery across Engineering, QA, Training, and Documentation while providing technical guidance to junior developers.",
    ],
  },
  {
    company: "Credit One Bank",
    role: "Software Engineer",
    location: "Las Vegas, NV",
    dates: "July 2025 to July 2026",
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
      "Built robotics systems across communication-failure handling, LiDAR perception, and C++ build automation.",
    technologies: ["C++", "CMake/CTest", "LiDAR", "Networking", "GitHub Actions"],
    bulletPoints: [
      "Architected a UDP heartbeat shutdown control that detected network partitions and enforced hard shutdown behavior within a sub-two-second window.",
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
    project: "MasterDnsVPN",
    feature: "iOS Mobile Bridge and Reliability Controls",
    description:
      "Extended a DNS-tunneled proxy stack with a gomobile-friendly bridge, app diagnostics, profile-driven settings, and negotiated reliability experiments for mobile use.",
    githubUrl: "https://github.com/arianizadi/MasterDnsVPN",
    status: "forked",
    technologies: ["Go", "DNS Tunneling", "gomobile", "iOS"],
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

export interface Degree {
  university: string;
  degree: string;
  gpa?: string;
  date: string;
  highlights: string[];
}

export const education: Degree[] = [
  {
    university: "University of Nevada, Las Vegas",
    degree: "M.S. Computer Science",
    gpa: "4.0 GPA",
    date: "Expected Dec 2026",
    highlights: [
      "Real-time & embedded systems",
      "Advanced operating systems",
      "Network security",
      "Railway track segmentation research",
    ],
  },
  {
    university: "University of Nevada, Las Vegas",
    degree: "B.S. Computer Science",
    date: "Jul 2024",
    highlights: [
      "CyberFire CTF: 1st place",
      "NCL CTF: top 8% nationally",
      "Bosch Future Mobility Challenge",
      "President of Layer Zero",
    ],
  },
];

export const certifications: string[] = ["AWS Certified Cloud Practitioner"];

export const techGroups: TechGroup[] = [
  {
    id: "systems",
    title: "Embedded & Systems",
    description: "Production software, operating-system tooling, timing constraints, and networked fault handling.",
    skills: [
      "C/C++",
      "Linux",
      "Embedded Systems",
      "Real-Time Systems",
      "Multithreaded Systems",
      "Networking",
    ],
  },
  {
    id: "low-level",
    title: "Low-Level / Hardware",
    description: "Bare-metal boot flow, architecture, device output, and hardware/software boundaries.",
    skills: [
      "Rust",
      "RISC-V",
      "QEMU",
      "UART",
      "Assembly",
      "GDB",
      "Hardware Integration",
    ],
  },
  {
    id: "languages",
    title: "Languages",
    description: "Languages used across embedded, systems, research, and production service work.",
    skills: ["C", "C++", "Rust", "Python", "Java"],
  },
  {
    id: "tooling",
    title: "Tooling & Debugging",
    description: "Build, test, inspect, and version software across low-level and production environments.",
    skills: [
      "CMake/CTest",
      "Google Test",
      "Git",
      "GitHub Actions",
      "LLVM",
      "Ghidra",
      "IDA Pro",
    ],
  },
  {
    id: "additional",
    title: "Additional",
    description: "Robotics perception, computer vision, backend systems, and technical interfaces.",
    skills: [
      "Robotics",
      "LiDAR",
      "PCL",
      "OpenCV",
      "PyTorch",
      "Kafka",
      "Spring Boot",
      "TypeScript",
      "Next.js",
    ],
  },
];
