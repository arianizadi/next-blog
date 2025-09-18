import React from "react";
import Image from "next/image";

const TechnologyCard = ({
  icon,
  name,
  description,
}: {
  icon: string;
  name: string;
  description: string;
}) => (
  <div className="bg-zinc-900 rounded-xl text-balance p-4 flex items-center gap-3 hover:bg-zinc-800 transition-colors">
    <div className="relative shrink-0 flex items-center justify-center w-10 h-10">
      <Image
        src={icon}
        alt={`${name} icon`}
        width={40}
        height={40}
        className="rounded-md"
      />
    </div>
    <div>
      <h3 className="text-white font-medium mb-1">{name}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  </div>
);

const CurrentTech = () => {
  const technologies = [
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/ida.webp",
      name: "IDA Pro",
      description: "Disassembler",
      category: "security"
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/typescript.webp",
      name: "TypeScript",
      description: "Premium JS",
      category: "frontend"
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/cpp.webp",
      name: "C++",
      description: "Systems programming",
      category: "backend"
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/next-js.webp",
      name: "NextJS",
      description: "React framework",
      category: "frontend"
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/tailwindcss.webp",
      name: "TailwindCSS",
      description: "CSS framework",
      category: "frontend"
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/git.webp",
      name: "Git",
      description: "Version control",
      category: "tools"
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/mongo.webp",
      name: "MongoDB",
      description: "Database",
      category: "data"
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/cmake.webp",
      name: "CMake",
      description: "Build system",
      category: "tools"
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg",
      name: "Airflow",
      description: "Workflow orchestration",
      category: "data"
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      name: "SQL",
      description: "Query language",
      category: "data"
    },
    {
      icon: "https://logos-world.net/wp-content/uploads/2022/11/Snowflake-Symbol.png",
      name: "Snowflake",
      description: "Cloud data platform",
      category: "data"
    },
    {
      icon: "https://docs.gethue.com/images/hue_logo.png",
      name: "HUE",
      description: "SQL editor",
      category: "data"
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg",
      name: "Conda",
      description: "Package manager",
      category: "tools"
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
      name: "TensorFlow",
      description: "ML framework",
      category: "data"
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
      name: "PyTorch",
      description: "ML framework",
      category: "data"
    },
    {
      icon: "https://images.icon-icons.com/3053/PNG/512/burp_suite_macos_bigsur_icon_190319.png",
      name: "Burp Suite",
      description: "Web security testing",
      category: "security"
    },
    {
      icon: "https://www.proxmox.com/images/proxmox/Proxmox_logo_standard_hex_400px.png",
      name: "Proxmox",
      description: "Virtualization platform",
      category: "tools"
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Wireshark_icon_new.png/960px-Wireshark_icon_new.png",
      name: "Wireshark",
      description: "Network analyzer",
      category: "security"
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
      name: "Framer Motion",
      description: "Animation library",
      category: "frontend"
    },
    {
      icon: "https://pointclouds.org/assets/images/logo.png",
      name: "PCL",
      description: "Point Cloud Library",
      category: "data"
    },
    {
      icon: "https://www.livoxtech.com/dps/2d9e037e6d457ef7ffec037f7d16dcf8.png",
      name: "Livox Mid-360",
      description: "LiDAR sensor",
      category: "data"
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
      name: "OpenCV",
      description: "Computer vision",
      category: "data"
    },
  ];

  const categories = {
    frontend: { name: "Frontend", color: "from-blue-500 to-cyan-500" },
    backend: { name: "Systems", color: "from-green-500 to-emerald-500" },
    data: { name: "Data & Analytics", color: "from-purple-500 to-pink-500" },
    tools: { name: "Tools", color: "from-orange-500 to-red-500" },
    security: { name: "Security", color: "from-red-500 to-rose-500" }
  };

  const groupedTech = Object.keys(categories).reduce((acc, category) => {
    acc[category] = technologies.filter(tech => tech.category === category);
    return acc;
  }, {} as Record<string, typeof technologies>);

  return (
    <div className="min-h-screen bg-black p-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Current Technologies
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Tools and technologies I use most frequently, organized by domain.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedTech).map(([categoryKey, techs]) => {
            const category = categories[categoryKey as keyof typeof categories];
            return (
              <div key={categoryKey} className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-1 w-12 bg-gradient-to-r ${category.color} rounded-full`} />
                  <h2 className="text-2xl font-semibold text-white">
                    {category.name}
                  </h2>
                  <div className={`h-1 flex-1 bg-gradient-to-r ${category.color} opacity-20 rounded-full`} />
                </div>

                <div className={`grid gap-4 ${
                  techs.length <= 2 ? 'grid-cols-1 md:grid-cols-2' :
                  techs.length <= 3 ? 'grid-cols-1 md:grid-cols-3' :
                  techs.length <= 4 ? 'grid-cols-2 md:grid-cols-4' :
                  'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                }`}>
                  {techs.map((tech) => (
                    <TechnologyCard
                      key={tech.name}
                      icon={tech.icon}
                      name={tech.name}
                      description={tech.description}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrentTech;
