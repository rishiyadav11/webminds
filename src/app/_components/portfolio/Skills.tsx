'use client';

import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { Code, Database, Globe, Zap, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SkillPageProps {
  skills: string[];
}

export default function SkillPage({ skills }: SkillPageProps) {
  const { theme } = useTheme();

  const themeClasses = (() => {
    switch (theme.name) {
      case 'Dark':
        return {
          bg: 'bg-gray-900',
          text: 'text-white',
          card: 'bg-gray-800',
          skillText: 'text-gray-200',
          accent: 'bg-purple-500',
          accentGlow: 'shadow-purple-500/50',
        };
      case 'Cyan':
        return {
          bg: 'bg-cyan-50',
          text: 'text-gray-900',
          card: 'bg-white',
          skillText: 'text-cyan-800',
          accent: 'bg-cyan-500',
          accentGlow: 'shadow-cyan-400/50',
        };
      case 'Gradient':
        return {
          bg: 'bg-gradient-to-br from-pink-400 to-purple-400',
          text: 'text-white',
          card: 'bg-white/10 backdrop-blur-lg',
          skillText: 'text-white',
          accent: 'bg-white/30',
          accentGlow: 'shadow-white/50',
        };
      default:
        return {
          bg: 'bg-white',
          text: 'text-gray-900',
          card: 'bg-gray-50',
          skillText: 'text-blue-800',
          accent: 'bg-blue-500',
          accentGlow: 'shadow-blue-400/50',
        };
    }
  })();

  // Correct typing for icons
  const icons: LucideIcon[] = [Code, Database, Globe, Zap, Palette];

  return (
    <section       id="skills"
 className={`min-h-screen py-20 ${themeClasses.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold mb-4 ${themeClasses.text}`}>
            My Skills
          </h1>
          <p className={`text-lg ${themeClasses.text} max-w-2xl mx-auto`}>
            These are the technologies I master and use daily to build amazing projects.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skill, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={skill}
                className={`relative p-6 rounded-3xl ${themeClasses.card} shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-opacity-30 overflow-hidden`}
              >
                {/* Glow circle */}
                <div
                  className={`absolute -top-6 -right-6 w-32 h-32 rounded-full ${themeClasses.accent} opacity-20 blur-3xl animate-pulse ${themeClasses.accentGlow}`}
                ></div>

                {/* Icon */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${themeClasses.accent} text-white`}
                >
                  {Icon && <Icon className="w-6 h-6" />}
                </div>

                {/* Skill name */}
                <h3 className={`text-xl font-bold ${themeClasses.skillText} mb-2`}>
                  {skill}
                </h3>

                {/* Description */}
                <p className={`text-sm ${themeClasses.skillText} opacity-80`}>
                  Expert in {skill}, capable of building scalable and efficient applications.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
