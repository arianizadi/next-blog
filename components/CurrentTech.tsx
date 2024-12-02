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
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/typescript.webp",
      name: "TypeScript",
      description: "Premium JS",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/cpp.webp",
      name: "C++",
      description: "Systems programming",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/next-js.webp",
      name: "NextJS",
      description: "React framework",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/tailwindcss.webp",
      name: "TailwindCSS",
      description: "CSS framework",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/git.webp",
      name: "Git",
      description: "Version control",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/mongo.webp",
      name: "MongoDB",
      description: "Database",
    },
    {
      icon: "https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/cmake.webp",
      name: "CMake",
      description: "Build system",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black p-8 items-center justify-center pt-20 md:pt-0">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          Current technologies
        </h1>
        <p className="text-zinc-400 mb-8">
          These are current tools and technologies I use most frequently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <TechnologyCard
              key={tech.name}
              icon={tech.icon}
              name={tech.name}
              description={tech.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentTech;
