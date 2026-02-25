"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import ScrollIndicator from "./ScrollIndicator";
import { siteConfig } from "@/app/config/site";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-h-full min-w-full object-cover"
      >
        <source
          src="https://arian-next-blog-assets.s3.us-west-2.amazonaws.com/bosch.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative flex h-full items-center justify-center px-5">
        <div className="text-center text-white">
          <motion.div
            className="flex flex-col md:flex-row justify-center pb-5 md:space-x-5"
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <DecodeEffect text="Arian" />
            <DecodeEffect text="Izadi" />
          </motion.div>
          <motion.p
            className="pb-6 text-3xl italic"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Systems Engineer & Researcher
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p className="pb-6 text-xl flex flex-col">
              <span className="font-light">
                M.S. Computer Science @ UNLV
              </span>
            </p>
          </motion.div>
          <motion.a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/50 bg-white/10 px-5 py-2.5 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="h-5 w-5" />
            <span>Resume</span>
          </motion.a>
        </div>
      </div>
      <ScrollIndicator></ScrollIndicator>
    </div>
  );
};

interface DecodeEffectProps {
  text: string;
}

const DecodeEffect: React.FC<DecodeEffectProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  const characters =
    "AAAAABCDEFGHIIIIIIJKLMNOPQRSTUVWXYZaaaaaaabcddddddddefghiiiiiijklmnnnnnnnopqrrrrrrrstuvwxyzzzzz0123456789!@#$%^&*()        ";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (displayText !== text) {
      interval = setInterval(() => {
        setDisplayText((current) => {
          const currentArray = current.split("");
          const finalArray = text.split("");
          let newText = "";

          for (let i = 0; i < finalArray.length; i++) {
            if (i < currentArray.length && currentArray[i] === finalArray[i]) {
              newText += currentArray[i];
            } else if (i === currentArray.length) {
              newText += finalArray[i];
            } else {
              newText +=
                characters[Math.floor(Math.random() * characters.length)];
            }
          }

          return newText;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [displayText, text]);

  return (
    <motion.h1
      className="text-6xl font-bold font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.h1>
  );
};

export default Hero;
