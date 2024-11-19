"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2">
      <div className="relative">
        <ChevronDown
          className="w-12 h-12 text-white opacity-60 animate-slide-down 
          drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
        />
      </div>
      <style jsx global>{`
        @keyframes slide-down {
          0% {
            transform: translateY(-30px);
            opacity: 0;
          }
          20% {
            transform: translateY(-15px);
            opacity: 0.3;
          }
          80% {
            transform: translateY(10px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(40px);
            opacity: 0;
          }
        }
        .animate-slide-down {
          animation: slide-down 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollIndicator;