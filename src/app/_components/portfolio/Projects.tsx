'use client';

import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { ExternalLink, Code, Star } from 'lucide-react';
import { Button } from '../ui/button';

interface Project {
  name: string;
  url: string;
  description?: string;
  tech?: string[];
}

interface ProjectsProps {
  projects?: Project[];
}

const randomDescriptions = [
  "A cutting-edge project demonstrating innovative problem-solving and clean code.",
  "An interactive web app showcasing modern UI/UX principles and responsive design.",
  "A full-stack solution integrating backend APIs with a sleek frontend experience.",
  "A creative project highlighting automation, efficiency, and real-world utility.",
  "A performance-optimized application built with best practices in mind.",
  "A learning-focused project demonstrating mastery of new technologies.",
  "An open-source inspired project designed for collaboration and scalability.",
  "A visually stunning interface combining functionality and aesthetic appeal.",
  "A data-driven solution emphasizing analytics, insights, and interactivity.",
  "A personal showcase project reflecting passion, creativity, and skill growth."
];

export default function Projects({ projects }: ProjectsProps) {
  const { theme } = useTheme();

  const themeClasses = (() => {
    switch (theme.name) {
      case 'Dark':
        return {
          bg: 'bg-gray-900',
          text: 'text-white',
          textMuted: 'text-gray-300',
          card: 'bg-gray-800',
          cardHover: 'hover:bg-gray-700',
          accent: 'bg-purple-500 hover:bg-purple-600',
          accentText: 'text-purple-400',
          border: 'border-gray-700',
          tech: 'bg-gray-700 text-gray-200'
        };
      case 'Cyan':
        return {
          bg: 'bg-cyan-50',
          text: 'text-gray-900',
          textMuted: 'text-gray-600',
          card: 'bg-white',
          cardHover: 'hover:bg-cyan-100',
          accent: 'bg-cyan-500 hover:bg-cyan-600',
          accentText: 'text-cyan-600',
          border: 'border-cyan-200',
          tech: 'bg-cyan-100 text-cyan-800'
        };
      case 'Gradient':
        return {
          bg: 'bg-gradient-to-br from-pink-400 to-purple-400',
          text: 'text-white',
          textMuted: 'text-white/80',
          card: 'bg-white/10 backdrop-blur-sm',
          cardHover: 'hover:bg-white/20',
          accent: 'bg-white text-purple-600 hover:bg-gray-100',
          accentText: 'text-white',
          border: 'border-white/20',
          tech: 'bg-white/20 text-white'
        };
      default: // Light
        return {
          bg: 'bg-white',
          text: 'text-gray-900',
          textMuted: 'text-gray-600',
          card: 'bg-gray-50',
          cardHover: 'hover:bg-gray-100',
          accent: 'bg-blue-500 hover:bg-blue-600',
          accentText: 'text-blue-600',
          border: 'border-gray-200',
          tech: 'bg-blue-100 text-blue-800'
        };
    }
  })();

  const hasProjects = projects?.length ?? 0 > 0;

  if (!hasProjects) {
    return (
      <section id='projects' className={`py-20 ${themeClasses.bg} min-h-screen flex flex-col items-center justify-center text-center px-4`}>
        <div className="max-w-4xl">
          <div className={`flex items-center justify-center w-16 h-16 rounded-full ${themeClasses.accent} text-white mb-6 mx-auto`}>
            <Star className="w-8 h-8" />
          </div>
          <h2 className={`text-5xl font-bold mb-4 ${themeClasses.text}`}>
            No Projects Yet
          </h2>
          <p className={`text-lg mb-6 ${themeClasses.textMuted}`}>
            I am actively building exciting projects that demonstrate my skills and creativity. Stay tuned for updates!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={`py-20 ${themeClasses.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${themeClasses.text} mb-4`}>
            Featured Projects
          </h2>
          <p className={`text-lg ${themeClasses.textMuted} max-w-2xl mx-auto`}>
            Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge and learning experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <div
              key={project.name}
              className={`${themeClasses.card} ${themeClasses.cardHover} rounded-xl p-6 ${themeClasses.border} border transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Code className={`w-6 h-6 ${themeClasses.accentText} mr-2`} />
                  <h3 className={`text-xl font-bold ${themeClasses.text}`}>
                    {project.name}
                  </h3>
                </div>
              </div>

              <p className={`${themeClasses.textMuted} mb-4 leading-relaxed`}>
                {project.description ?? randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)]}
              </p>

              {project.tech && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${themeClasses.tech} transition-all duration-200 hover:scale-105`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-3 mt-4">
                <Button
                  size="sm"
                  className={`flex-1 ${themeClasses.accent} text-white 
                    bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer
                    hover:from-purple-500 hover:to-blue-500 
                    transition-all duration-300 
                    transform hover:-translate-y-1 hover:scale-105 
                    shadow-md hover:shadow-xl`}
                  onClick={() => window.open(project.url.replace('github.com', 'github.io'), '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
