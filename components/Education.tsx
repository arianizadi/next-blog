"use client";

import React from "react";
import { GraduationCap, Award, Trophy, Cloud, BookOpen, Calendar, ChevronRight, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  defaultViewport,
  revealMotionProps,
  staggerVariants,
} from "@/lib/motion";

interface Degree {
  university: string;
  degree: string;
  track?: string;
  gpa?: string;
  date: string;
  coursework?: string[];
  research?: { title: string; description: string };
  involvement?: string[];
}

interface Certification {
  name: string;
  icon: React.ReactNode;
}

interface Achievement {
  title: string;
  icon: React.ReactNode;
}

const degrees: Degree[] = [
  {
    university: "University of Nevada, Las Vegas",
    degree: "Master of Science, Computer Science",
    track: "Part Time / Professional Track",
    gpa: "4.0",
    date: "Expected: Dec 2026",
    coursework: ["Real Time & Embedded Systems", "Cloud Computing", "Advanced Operating Systems", "Network Security"],
    research: {
      title: "Railway Track Segmentation",
      description: "Semantic segmentation of POV train images to detect mud pumping and track related issues, finetuning HRNET and other models. Added Railseg19 Transfer Learning to MMSEGMENTATION"
    },
  },
  {
    university: "University of Nevada, Las Vegas",
    degree: "Bachelor of Science, Computer Science",
    date: "Graduated: Jul 2024",
    involvement: [
      "President of Layer Zero",
      "Bosch Future Mobility Challenge",
      "CyberFire CTF First Place Winner",
      "NCL CTF Top 8%"
    ],
  }
];

const certifications: Certification[] = [
  { name: "AWS Certified Cloud Practitioner", icon: <Cloud size={18} /> }
];

const achievements: Achievement[] = [
  { title: "CyberFire CTF First Place Winner", icon: <Trophy size={16} className="text-foreground/60" /> },
  { title: "NCL CTF Top 8%", icon: <Award size={16} className="text-foreground/60" /> },
  { title: "Bosch Future Mobility Challenge", icon: <Star size={16} className="text-foreground/60" /> },
  { title: "President of Layer Zero", icon: <Award size={16} className="text-foreground/60" /> }
];

const DegreeCard = ({ degree, index }: { degree: Degree; index: number }) => {
  return (
    <div className="card-surface group relative rounded-xl p-8 transition-all duration-300">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-foreground/5 rounded-lg border border-border group-hover:bg-foreground/10 transition-colors duration-300 flex-shrink-0">
              <GraduationCap size={18} className="text-foreground/60" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground font-display">{degree.university}</h3>
              <p className="text-foreground/80 font-medium">{degree.degree}</p>
              {degree.track && (
                <p className="text-muted-foreground text-sm italic">{degree.track}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar size={14} />
              <span>{degree.date}</span>
            </div>
            {degree.gpa && (
              <div className="flex items-center gap-2 px-3 py-1 bg-foreground/10 border border-foreground/20 rounded-full">
                <Star size={14} className="text-foreground" />
                <span className="text-foreground font-semibold text-sm">GPA: {degree.gpa}</span>
              </div>
            )}
          </div>
        </div>

        {degree.research && (
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={14} className="text-muted-foreground" />
              <span className="text-foreground/80 text-sm font-medium">Research</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{degree.research.description}</p>
          </div>
        )}

        {degree.coursework && (
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Relevant Coursework</p>
            <div className="flex flex-wrap gap-2">
              {degree.coursework.map((course) => (
                <span
                  key={course}
                  className="px-2 py-1 bg-card text-muted-foreground text-xs rounded border border-border"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}

        {degree.involvement && (
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Involvement & Achievements</p>
            <ul className="space-y-2">
              {degree.involvement.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ChevronRight size={14} className="text-foreground/20 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
  return (
    <div className="card-surface flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300">
      <div className="p-2 bg-foreground/5 rounded-lg border border-border">
        <span className="text-foreground/60">{cert.icon}</span>
      </div>
      <span className="text-foreground/80 text-sm font-medium">{cert.name}</span>
    </div>
  );
};

const AchievementBadge = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  return (
    <div className="card-surface flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200">
      {achievement.icon}
      <span className="text-foreground/80 text-sm">{achievement.title}</span>
    </div>
  );
};

const Education = () => {
  const reduceMotion = useReducedMotion();
  const headerMotion = revealMotionProps(reduceMotion);
  const { container: staggerContainer, item: staggerItem } =
    staggerVariants(reduceMotion);

  return (
    <div className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="mb-12" {...headerMotion}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-4">05 / Education</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Education & Certifications
          </h2>
        </motion.div>

        <motion.div
          className="mb-12 space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {degrees.map((degree, index) => (
            <motion.div key={degree.degree} variants={staggerItem}>
              <DegreeCard degree={degree} index={index} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16">
          <motion.div
            className="mb-6 flex items-center gap-3"
            {...revealMotionProps(reduceMotion)}
          >
            <div className="rounded-lg border border-border bg-foreground/5 p-2">
              <Award size={20} className="text-foreground/60" />
            </div>
            <h2 className="font-display text-2xl text-foreground">Certifications</h2>
          </motion.div>

          <motion.div
            className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {certifications.map((cert, index) => (
              <motion.div key={cert.name} variants={staggerItem}>
                <CertificationCard cert={cert} index={index} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mb-6 flex items-center gap-3"
            {...revealMotionProps(reduceMotion)}
          >
            <div className="rounded-lg border border-border bg-foreground/5 p-2">
              <Trophy size={20} className="text-foreground/60" />
            </div>
            <h2 className="font-display text-2xl text-foreground">Achievements</h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {achievements.map((achievement, index) => (
              <motion.div key={achievement.title} variants={staggerItem}>
                <AchievementBadge achievement={achievement} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Education;
