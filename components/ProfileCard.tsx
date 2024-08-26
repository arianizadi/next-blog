'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ProfileCard = () => {
  return (
    <div className="cursor-default py-32 relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 overflow-hidden">
      {/* Animated Wavy top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-full 3xl:hidden" viewBox="0 0 1440 240" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            fill="#000000"
            fillOpacity="0.3"
            d="M0,72L48,84C96,96,192,120,288,124C384,128,480,112,576,96C672,80,768,64,864,68C960,72,1056,96,1152,104C1248,112,1344,104,1392,100L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            animate={{
              d: [
                "M0,72L48,84C96,96,192,120,288,124C384,128,480,112,576,96C672,80,768,64,864,68C960,72,1056,96,1152,104C1248,112,1344,104,1392,100L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                "M0,48L48,56C96,64,192,80,288,92C384,104,480,112,576,104C672,96,768,72,864,76C960,80,1056,112,1152,124C1248,136,1344,128,1392,124L1440,120L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 5,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-4xl px-4">
        <IntrestsTitle />
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          <Image
            src="https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/arian_fa22.webp"
            alt="Arian Izadi"
            width={300}
            height={300}
            className="rounded-full"
          />
          <AboutMeCard />
        </div>
      </div>

      {/* Animated Wavy bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 240" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            fill="#000000"
            fillOpacity="0.3"
            d="M0,168L48,160C96,152,192,136,288,136C384,136,480,152,576,152C672,152,768,136,864,136C960,136,1056,152,1152,156C1248,160,1344,152,1392,148L1440,144L1440,240L1392,240C1344,240,1248,240,1152,240C1056,240,960,240,864,240C768,240,672,240,576,240C480,240,384,240,288,240C192,240,96,240,48,240L0,240Z"
            animate={{
              d: [
                "M0,168L48,160C96,152,192,136,288,136C384,136,480,152,576,152C672,152,768,136,864,136C960,136,1056,152,1152,156C1248,160,1344,152,1392,148L1440,144L1440,240L1392,240C1344,240,1248,240,1152,240C1056,240,960,240,864,240C768,240,672,240,576,240C480,240,384,240,288,240C192,240,96,240,48,240L0,240Z",
                "M0,192L48,180C96,168,192,144,288,148C384,152,480,184,576,196C672,208,768,200,864,184C960,168,1056,144,1152,140C1248,136,1344,152,1392,160L1440,168L1440,240L1392,240C1344,240,1248,240,1152,240C1056,240,960,240,864,240C768,240,672,240,576,240C480,240,384,240,288,240C192,240,96,240,48,240L0,240Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 5,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </div>
  );
};

const AboutMeCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-xl p-6 text-center">
        <span className="text-2xl font-bold text-center text-gray-800 pb-2">
          Background
        </span>
        <p className="text-center text-gray-600">
          From a young age, I&apos;ve spent a lot of time with computers, which sparked my interest in everything from hacking to creating software solutions for my everyday problems.
        </p>
      </div>

      <BentoCard
        title="Layer Zero CyberSecurity"
        description="Served as the president of Layer Zero, where I facilitated learning through workshops and hosted events with other clubs and companies."
        icon="🖥️"
        delay={0.6}
      />

      <BentoCard
        title="Bosch Future Mobility Challenge"
        description="Competed in Cluj-Napoca, Romania, where I was on a team that developed an autonomous model car for an international competition."
        icon="🚗"
        delay={0.8}
      />
    </div>
  );
};

const BentoCard = ({ title, description, icon, delay }: { title: string, description: string, icon: string, delay: number }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const IntrestsTitle = () => {
  return (
    <div className="flex flex-col items-center w-full h-40 overflow-hidden">
      <strong className="text-3xl md:text-5xl">
        About Me.
      </strong>
      <svg viewBox="0 0 400 100" className="w-full h-full">
        <path
          d="M15,50 Q80,10 220,50 T280,50 T420,50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ProfileCard;