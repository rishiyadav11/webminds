'use client';

import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Image from 'next/image';

interface HomeProps {
  personal: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
}

export default function Home({ personal }: HomeProps) {
  const { theme } = useTheme();

  const themeClasses = (() => {
    switch (theme.name) {
      case 'Dark':
        return {
          bg: 'bg-gray-900',
          text: 'text-white',
          textMuted: 'text-gray-300',
          card: 'bg-gray-800',
          accentText: 'text-purple-400',
        };
      case 'Cyan':
        return {
          bg: 'bg-cyan-50',
          text: 'text-gray-900',
          textMuted: 'text-gray-600',
          card: 'bg-white',
          accentText: 'text-cyan-600',
        };
      case 'Gradient':
        return {
          bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
          text: 'text-white',
          textMuted: 'text-white/80',
          card: 'bg-white/10 backdrop-blur-lg',
          accentText: 'text-white',
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-900',
          textMuted: 'text-gray-600',
          card: 'bg-white',
          accentText: 'text-blue-600',
        };
    }
  })();

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center ${themeClasses.bg} pt-16 overflow-hidden`}
    >
      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-500 opacity-30 blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-500 opacity-30 blur-3xl animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div
              className={`inline-block px-4 py-2 rounded-full ${themeClasses.card} mb-6 shadow-lg`}
            >
              <span className={`text-sm font-medium ${themeClasses.accentText}`}>
                Hello, Visionary
              </span>
            </div>

            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${themeClasses.text} mb-6 leading-tight`}
            >
              I am <span className={themeClasses.accentText}>{personal.name}</span>
            </h1>

            <h2
              className={`text-xl md:text-2xl font-semibold ${themeClasses.textMuted} mb-6`}
            >
              {personal.role}
            </h2>

            <p
              className={`text-lg ${themeClasses.textMuted} mb-4 leading-relaxed max-w-2xl`}
            >
              {personal.bio}
            </p>

            <p
              className={`text-lg ${themeClasses.textMuted} leading-relaxed max-w-2xl`}
            >
              Beyond coding, I craft visions into reality. I thrive on challenges,
              push boundaries, and create experiences that inspire. Every line of code
              I write is a step towards innovation and excellence.
            </p>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 opacity-20 blur-3xl animate-pulse`}
              ></div>
              <div
                className={`relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden ${themeClasses.card} p-2 shadow-2xl`}
              >
                <Image
                fill
                  src={personal.image}
                  alt={personal.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <div className={`animate-bounce ${themeClasses.textMuted}`}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
