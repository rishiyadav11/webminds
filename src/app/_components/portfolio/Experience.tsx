'use client';

import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { Calendar, Building, Star } from "lucide-react";

interface Experience {
  role: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description: string;
}

interface ExperienceProps {
  experience?: Experience[];
}

export default function Experience({ experience }: ExperienceProps) {
  const { theme } = useTheme();

  const themeClasses = (() => {
    switch (theme.name) {
      case "Dark":
        return {
          bg: "bg-gray-900",
          text: "text-white",
          textMuted: "text-gray-300",
          card: "bg-gray-800",
          accent: "bg-purple-500",
          accentText: "text-purple-400",
          border: "border-gray-700",
        };
      case "Cyan":
        return {
          bg: "bg-cyan-50",
          text: "text-gray-900",
          textMuted: "text-gray-600",
          card: "bg-white",
          accent: "bg-cyan-500",
          accentText: "text-cyan-600",
          border: "border-cyan-200",
        };
      case "Gradient":
        return {
          bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
          text: "text-white",
          textMuted: "text-white/80",
          card: "bg-white/10 backdrop-blur-sm",
          accent: "bg-white",
          accentText: "text-white",
          border: "border-white/20",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-900",
          textMuted: "text-gray-600",
          card: "bg-white",
          accent: "bg-blue-500",
          accentText: "text-blue-600",
          border: "border-gray-200",
        };
    }
  })();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const hasExperience = (experience?.length ?? 0) > 0;

  if (!hasExperience) {
    return (
      <section id="experience" className={`py-20 ${themeClasses.bg} min-h-screen flex flex-col items-center justify-center text-center px-4`}>
        <div className="max-w-4xl">
          <div className={`flex items-center justify-center w-16 h-16 rounded-full ${themeClasses.accent} text-white mb-6 mx-auto`}>
            <Star className="w-8 h-8" />
          </div>
          <h2 className={`text-5xl font-bold mb-4 ${themeClasses.text}`}>
            Extraordinary Talent
          </h2>
          <p className={`text-lg mb-6 ${themeClasses.textMuted}`}>
            I may not have formal work experience yet, but I am highly skilled, passionate, and eager to build amazing projects. I continuously learn, experiment, and apply modern technologies to deliver innovative solutions.
          </p>
          <h3 className={`text-3xl font-semibold mb-4 ${themeClasses.text}`}>
            What I Bring
          </h3>
          <ul className={`text-left list-disc list-inside space-y-2 text-lg ${themeClasses.textMuted}`}>
            <li>Strong knowledge of modern web development technologies</li>
            <li>Passion for building beautiful, user-friendly interfaces</li>
            <li>Ability to learn new technologies quickly and apply them effectively</li>
            <li>Creative problem-solving and analytical thinking</li>
            <li>Commitment to writing clean, maintainable, and efficient code</li>
          </ul>
          <p className={`mt-8 text-lg ${themeClasses.textMuted}`}>
            I am ready to take on challenges, contribute to meaningful projects, and grow as a developer every day.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className={`py-20 ${themeClasses.bg} min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${themeClasses.text} mb-4`}>
            Professional Experience
          </h2>
          <p className={`text-lg ${themeClasses.textMuted} max-w-2xl mx-auto`}>
            My journey in software development and the experiences that showcase my talent
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12">
          {experience?.map((exp, idx) => (
            <div
              key={idx}
              className={`${themeClasses.card} rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105`}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${themeClasses.accent} text-green-300 mb-4`}>
                {exp.company ? <Building className="w-6 h-6" /> : <Star className="w-6 h-6" />}
              </div>

              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>
                {exp.role}
              </h3>

              {exp.company && (
                <div className="flex items-center text-sm mb-4">
                  <Calendar className={`w-4 h-4 ${themeClasses.textMuted} mr-1`} />
                  <span className={themeClasses.textMuted}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                  <span className={`ml-2 ${themeClasses.accentText} font-semibold`}>{exp.company}</span>
                </div>
              )}

              <p className={`${themeClasses.textMuted} leading-relaxed`}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
