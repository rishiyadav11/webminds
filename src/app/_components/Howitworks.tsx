"use client";
import React from "react";
import { StickyScroll } from "../../components/ui/stickyroll";

const steps = [
  {
    title: "1. Sign Up & Connect",
    description:
      "Get started by signing up and connecting your GitHub account — no complicated setup required.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-sky-700 text-white text-xl font-bold rounded-lg shadow-xl">
        🔑 Sign Up & Connect
      </div>
    ),
  },
  {
    title: "2. Add Your Details",
    description:
      "Fill in your name, bio, skills, and links. You can also auto-import projects directly from your GitHub profile.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-violet-700 text-white text-xl font-bold rounded-lg shadow-xl">
        📝 Add Profile Info
      </div>
    ),
  },
  {
    title: "3. Choose a Template",
    description:
      "Pick from beautifully designed portfolio templates — modern, minimal, or creative — all optimized for developers.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-400 to-emerald-600 text-white text-xl font-bold rounded-lg shadow-xl">
        🎨 Select Template
      </div>
    ),
  },
  {
    title: "4. Generate Your Portfolio",
    description:
      "With one click, WebMinds creates your live portfolio — instantly hosted and shareable on your unique link.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-400 to-orange-600 text-white text-xl font-bold rounded-lg shadow-xl">
        ⚡ Instant Portfolio
      </div>
    ),
  },
  {
    title: "5. Share & Grow",
    description:
      "Showcase your work to the world. Share your portfolio link with recruiters, clients, and your network.",
    content: (
      <div className="flex flex-col items-center justify-center text-white text-center gap-3 text-lg font-semibold h-full w-full bg-gradient-to-br from-fuchsia-600 to-rose-500 rounded-lg shadow-xl p-8">
        <h1 className="text-center">🌍 Share Anywhere</h1>
        <h1 className="text-center">👨‍💻 Impress Recruiters</h1>
        <h1 className="text-center">🚀 Grow Your Network</h1>
      </div>
    ),
  },
  {
    title: "",
    description: "",
    content: (
      <div className="flex flex-col items-center justify-center text-white text-center gap-3 text-lg font-semibold h-full w-full bg-gradient-to-br from-fuchsia-600 to-rose-500 rounded-lg shadow-xl p-8"></div>
    ),
  },
];

export function HowItWorks() {
  return (
    <div
      id="how-it-works"
      className="w-full py-20 bg-black text-white"
    >
        
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold">How WebMinds Works</h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          WebMinds makes it effortless to create your developer portfolio — connect GitHub, add your details, choose a template, and share instantly.
        </p>
      </div>
      <StickyScroll content={steps} />
    </div>
  );
}
