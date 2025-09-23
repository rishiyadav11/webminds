"use client";

import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { Github, Linkedin, Twitter } from "lucide-react";

interface ContactProps {
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export default function Contact({ socials }: ContactProps) {
  const { theme } = useTheme();

  const themeClasses = (() => {
    switch (theme.name) {
      case "Dark":
        return { bg: "bg-gray-900", text: "text-white", textMuted: "text-gray-300" };
      case "Cyan":
        return { bg: "bg-cyan-50", text: "text-gray-900", textMuted: "text-gray-600" };
      case "Gradient":
        return { 
                    bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400', text: "text-white", textMuted: "text-white/80" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-900", textMuted: "text-gray-600" };
    }
  })();

  const defaultSocials = {
    github: socials?.github ? `https://github.com/${socials.github}` : undefined,
    linkedin: socials?.linkedin ? `https://linkedin.com/in/${socials.linkedin}` : undefined,
    twitter: socials?.twitter ? `https://twitter.com/${socials.twitter}` : undefined,
  };

  const socialCards = [
    {
      name: "GitHub",
      url: defaultSocials.github,
      icon: <Github className="w-10 h-10 text-gray-900 group-hover:text-white transition-colors duration-300" />,
      description: "Check out my repositories and coding projects on GitHub.",
      bgColor: "bg-gray-800",
      hoverColor: "hover:bg-gray-900",
      iconBg: "bg-white/20",
      gradient: "from-gray-500 to-gray-700",
    },
    {
      name: "LinkedIn",
      url: defaultSocials.linkedin,
      icon: <Linkedin className="w-10 h-10 text-white group-hover:text-blue-100 transition-colors duration-300" />,
      description: "Connect with me professionally and see my work experience.",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      iconBg: "bg-white/20",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      name: "Twitter",
      url: defaultSocials.twitter,
      icon: <Twitter className="w-10 h-10 text-white group-hover:text-sky-100 transition-colors duration-300" />,
      description: "Follow me for tech insights, updates, and thoughts.",
      bgColor: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
      iconBg: "bg-white/20",
      gradient: "from-sky-400 to-sky-600",
    },
  ];

  return (
    <section id="contact" className={`py-24 ${themeClasses.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-5xl font-extrabold ${themeClasses.text} mb-6 tracking-wide`}>
          Let&apos;s Connect
        </h2>
        <p className={`text-lg ${themeClasses.textMuted} mb-12 max-w-3xl mx-auto`}>
          I love collaborating, sharing ideas, and building cool projects. Find me on these platforms and let&apos;s make something amazing together!
        </p>

        <div className="grid md:grid-cols-3 gap-10 justify-center">
          {socialCards.map(
            (social) =>
              social.url && (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative block rounded-3xl p-10 shadow-xl transform transition-all duration-500 hover:-translate-y-3 hover:scale-105 overflow-hidden ${social.bgColor} ${social.hoverColor}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
                  <div className="flex flex-col items-center justify-center space-y-5 relative z-10">
                    <div className={`p-6 rounded-full ${social.iconBg} bg-gradient-to-tr ${social.gradient} flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-110`}>
                      {social.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{social.name}</h3>
                    <p className="text-center text-white/90">{social.description}</p>
                  </div>
                </a>
              )
          )}
        </div>
      </div>
    </section>
  );
}
