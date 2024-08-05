'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ProfileCard = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 overflow-hidden">
      {/* Animated Wavy top */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          fill="#000000"
          fillOpacity="0.3"
          d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          animate={{
            d: [
              "M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
              "M0,64L48,74.7C96,85,192,107,288,122.7C384,139,480,149,576,138.7C672,128,768,96,864,101.3C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
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

      {/* Content */}
      <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-4xl px-4">
        <IntrestsTitle />
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          <Image
            src="/arian_fa22.jpg"
            alt="Arian Izadi"
            width={300}
            height={300}
            className="rounded-full"
          />
          <AboutMeCard />
        </div>
      </div>

      {/* Animated Wavy bottom */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          fill="#000000"
          fillOpacity="0.3"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,261.3C672,277,768,267,864,245.3C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
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
  );
};

const AboutMeCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-xl p-8 max-w-sm relative z-10"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold text-center text-gray-800 pb-2"
      >
        Arian Izadi
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center text-gray-600"
      >
        A brief description about yourself. You can add more details here to introduce yourself to visitors.
      </motion.p>
    </motion.div>
  );
};

const IntrestsTitle = () => {
  return (
    <div className="flex flex-col items-center w-full h-40 overflow-hidden">
      <strong className="text-5xl">
        My Interests
      </strong>
      <svg viewBox="0 0 500 100" className="w-full h-full">
        <motion.path
          d="M15,50 Q80,10 220,50 T280,50 T420,50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
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