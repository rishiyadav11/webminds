import React from "react";
import { Github } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className="relative w-full py-24 text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f172a] via-black to-[#1e293b]" />

      {/* Glow Blobs */}
      <div
        className="absolute -top-40 right-40 h-[350px] w-[500px] rounded-full blur-3xl opacity-60 animate-pulse"
        style={{
          background:
            "radial-gradient(800px 600px at 70% -10%, rgba(37,99,235,0.6), transparent 80%)",
        }}
      />
      <div
        className="absolute -bottom-40 left-20 h-[300px] w-[400px] rounded-full blur-2xl opacity-50 animate-pulse delay-100"
        style={{
          background:
            "radial-gradient(900px 600px at -20% 40%, rgba(6,182,212,0.4), transparent 90%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Simple Pricing
        </h2>
        <p className="mt-4 text-gray-300 text-lg">
          WebMinds is completely free — just follow us on GitHub to support ❤️
        </p>
      </div>

      <div className="mt-16 flex justify-center">
        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl shadow-2xl p-10 max-w-md w-full border border-white/10 backdrop-blur-xl hover:scale-105 hover:shadow-cyan-500/20 transition-all duration-300">
          <h3 className="text-3xl font-semibold text-white">
            Free Forever 🎉
          </h3>
          <p className="mt-3 text-gray-400">
            Create unlimited portfolios, connect GitHub, choose templates, and
            share instantly — all at no cost.
          </p>

          <ul className="mt-6 space-y-3 text-left text-gray-300">
            <li className="flex items-center gap-2">✅ Instant portfolio creation</li>
            <li className="flex items-center gap-2">✅ GitHub integration</li>
            <li className="flex items-center gap-2">✅ Free hosting</li>
            <li className="flex items-center gap-2">✅ Modern templates</li>
          </ul>

          <a
            href="https://github.com/rishiyadav11"
            target="_blank"
            className="mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-3 px-6 rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all shadow-md"
          >
            <Github size={20} /> Follow on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
