import React from 'react'
import { Check } from "lucide-react";

const Herosection = () => {
  return (
    <header className="relative  text-white overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute -top-40 right-40 h-[250px] w-[450px] animate-pulse rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(1200px 600px at 70% -10%, rgba(37,99,235,0.6), rgba(37,99,235,0.2))',
          opacity: 0.8,
        }}
      />

      <div
        className="absolute left-[-60px] top-[80px] h-[250px] w-[250px] animate-pulse rounded-full opacity-25 blur-2xl delay-100"
        style={{
          background:
            'radial-gradient(900px 600px at -20% 40%, rgba(6,182,212,0.16), transparent 90%)',
        }}
      />

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.6fr_1fr] gap-10 px-6 items-center py-20 relative z-10">
        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-indigo-200 text-xs font-medium bg-[#1f2937]/60 border border-[#374151] mb-4">
            Build • Share • Impress
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Create your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              personal portfolio
            </span>{" "}
            in minutes — no coding required.
          </h1>

          <p className="text-gray-300 text-lg mt-4">
            WebMinds helps developers, designers, and creators launch
            professional portfolios effortlessly. Showcase your work, tell your
            story, and share it with the world — all from one dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="#dashboard"
              className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow hover:opacity-90 transition"
            >
              Create My Portfolio
            </a>
            <a
              href="#features"
              className="px-5 py-3 rounded-xl font-semibold text-indigo-200 bg-white/10 border border-white/20 backdrop-blur hover:bg-black/20 transition"
            >
              See Features
            </a>
          </div>

{/* Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
  <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4 text-center">
    <b className="block text-2xl">🚀 Launch</b>
    <span className="text-gray-400 text-sm">Be among the first creators</span>
  </div>
  <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4 text-center">
    <b className="block text-2xl">0 → 1</b>
    <span className="text-gray-400 text-sm">Start your journey today</span>
  </div>
  <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4 text-center">
    <b className="block text-2xl">∞</b>
    <span className="text-gray-400 text-sm">Unlimited possibilities</span>
  </div>
</div>

        </div>

        {/* Right Features Card */}
        <div className="bg-[#0f172a]/90 border border-white/10 rounded-2xl shadow-lg p-6 space-y-5">
          {[
            {
              title: "Easy Setup",
              desc: "Log in, pick a template, and publish your portfolio instantly.",
            },
            {
              title: "Custom Dashboard",
              desc: "Manage your projects, blogs, and achievements from one place.",
            },
            {
              title: "Modern Templates",
              desc: "Choose from stunning, mobile-friendly designs built for creators.",
            },
            {
              title: "Share Anywhere",
              desc: "Get a unique link to share your portfolio with recruiters & clients.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <b className="block">{item.title}</b>
                <span className="text-gray-400 text-sm">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Herosection;
