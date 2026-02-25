"use client";

import React from "react";
import { GraduationCap, Award, Trophy, Cloud, BookOpen, Calendar, ChevronRight, Star } from "lucide-react";
import { useCategory } from "@/contexts/CategoryContext";

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
    track: "Part-Time / Professional Track",
    gpa: "4.0",
    date: "Expected: Dec 2026",
    coursework: ["Real-Time & Embedded Systems", "Cloud Computing", "Advanced Operating Systems", "Network Security"],
    research: {
      title: "Railway Track Segmentation",
      description: "Semantic segmentation of POV train images to detect mud pumping and track-related issues, finetuning HRNET and other models. Added Railseg19 Transfer Learning to MMSEGMENTATION"
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
  { title: "CyberFire CTF First Place Winner", icon: <Trophy size={16} className="text-yellow-500" /> },
  { title: "NCL CTF Top 8%", icon: <Award size={16} className="text-amber-500" /> },
  { title: "Bosch Future Mobility Challenge", icon: <Star size={16} className="text-blue-400" /> },
  { title: "President of Layer Zero", icon: <Award size={16} className="text-purple-400" /> }
];

const DegreeCard = ({ degree, index }: { degree: Degree; index: number }) => {
  return (
    <div className="group relative bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:bg-zinc-900/70">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 group-hover:bg-zinc-800/70 transition-colors duration-300 flex-shrink-0">
              <GraduationCap size={18} className="text-zinc-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white">{degree.university}</h3>
              <p className="text-zinc-300 font-medium">{degree.degree}</p>
              {degree.track && (
                <p className="text-zinc-500 text-sm italic">{degree.track}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <Calendar size={14} />
              <span>{degree.date}</span>
            </div>
            {degree.gpa && (
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                <Star size={14} className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm">GPA: {degree.gpa}</span>
              </div>
            )}
          </div>
        </div>

        {degree.research && (
          <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={14} className="text-zinc-500" />
              <span className="text-zinc-300 text-sm font-medium">Research</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">{degree.research.description}</p>
          </div>
        )}

        {degree.coursework && (
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Relevant Coursework</p>
            <div className="flex flex-wrap gap-2">
              {degree.coursework.map((course) => (
                <span
                  key={course}
                  className="px-2 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded border border-zinc-700/50 transition-all duration-200"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}

        {degree.involvement && (
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Involvement & Achievements</p>
            <ul className="space-y-2">
              {degree.involvement.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                  <ChevronRight size={14} className="text-zinc-600 flex-shrink-0" />
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
    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50 hover:border-amber-500/30 transition-all duration-300">
      <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
        <span className="text-amber-400">{cert.icon}</span>
      </div>
      <span className="text-zinc-300 text-sm font-medium">{cert.name}</span>
    </div>
  );
};

const AchievementBadge = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-200">
      {achievement.icon}
      <span className="text-zinc-300 text-sm">{achievement.title}</span>
    </div>
  );
};

const Education = () => {
  const { selectedCategories, searchQuery } = useCategory();
  const isFilterActive = selectedCategories.length > 0 || searchQuery.length > 0;

  return (
    <div className="py-24 bg-zinc-950 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-zinc-950" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="mb-16">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                Education & Certifications
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl">
                Academic background and professional certifications.
              </p>
            </div>
            {isFilterActive && (
              <div className="bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-400 text-sm">
                Academic profile active
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 mb-12">
          {degrees.map((degree, index) => (
            <DegreeCard key={degree.degree} degree={degree} index={index} />
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <Award size={20} className="text-amber-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.name} cert={cert} index={index} />
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Trophy size={20} className="text-yellow-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Achievements</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {achievements.map((achievement, index) => (
              <AchievementBadge key={achievement.title} achievement={achievement} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
