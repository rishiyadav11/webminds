"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const abilities = [
  {
    imgPath: "https://img.icons8.com/?size=160&id=uzu81kwTPnDe&format=png",
    title: "Modern Templates",
    desc: "Pick from sleek, responsive templates designed to impress recruiters & clients.",
  },
  {
    imgPath: "https://img.icons8.com/?size=160&id=63911&format=png",
    title: "No Coding Needed",
    desc: "Build your portfolio in minutes — no technical knowledge required.",
  },
  {
    imgPath: "https://img.icons8.com/?size=160&id=tkO8wMPYxAZH&format=png",
    title: "Customizable",
    desc: "Easily personalize colors, fonts, and layouts to reflect your style.",
  },
  {
    imgPath: "https://img.icons8.com/?size=100&id=lqdmaqwWhoiz&format=png",
    title: "Central Dashboard",
    desc: "Manage projects, blogs, and achievements from one simple dashboard.",
  },
  {
    imgPath: "https://img.icons8.com/?size=160&id=87819&format=png",
    title: "One-Click Sharing",
    desc: "Get a unique link to share your portfolio instantly with anyone.",
  },
  {
    imgPath: "https://img.icons8.com/?size=96&id=QNjsAGAlpuNW&format=png",
    title: "SEO Optimized",
    desc: "Rank higher on search engines with built-in SEO optimization.",
  },
  {
    imgPath: "https://img.icons8.com/?size=96&id=KjPwn6Tz1iuz&format=png",
    title: "Fully Responsive",
    desc: "Your portfolio looks perfect on desktops, tablets, and mobiles.",
  },
  {
    imgPath: "https://img.icons8.com/?size=160&id=0UZvFwaqzj3h&format=png",
    title: "Secure & Reliable",
    desc: "Enjoy peace of mind with strong security and reliable hosting.",
  },
  {
    imgPath: "https://img.icons8.com/?size=160&id=d0Q6fXcETlmD&format=png",
    title: "Portfolio Analytics",
    desc: "Track visitors and engagement with built-in analytics tools.",
  },
];

const FeatureCards = () => (
  <section className="relative  py-24 px-6  " id="features">
          <div
        className="absolute top-0 left-10 h-[250px] w-[450px]  animate-pulse rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(1200px 600px at 70% -10%, rgba(37,99,235,0.6), rgba(37,99,235,0.2))',
          opacity: 0.4,
        }}
      />
          <div
        className="absolute -bottom-10 right-10 h-[250px] w-[450px]  animate-pulse rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(1200px 600px at 70% -10%, rgba(37,99,235,0.6), rgba(37,99,235,0.2))',
          opacity: 0.2,
        }}
      />

      <div
        className="absolute left-[-60px] top-[80px] h-[250px] w-[250px] animate-pulse rounded-full opacity-25 blur-2xl delay-100"
        style={{
          background:
            'radial-gradient(900px 600px at -20% 40%, rgba(6,182,212,0.16), transparent 90%)',
        }}
      />
    {/* Heading */}
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
        Features You’ll Love
      </h2>
      <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
        Everything you need to showcase your skills, share your story, and land
        opportunities — <span className="text-white font-semibold">crafted beautifully for creators like you.</span>
      </p>
    </div>

    {/* Grid */}
    <div className="max-w-7xl mx-auto grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {abilities.map(({ imgPath, title, desc }, index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:shadow-blue-500/20 group overflow-hidden transition-all duration-300"
        >
          {/* Gradient border hover glow */}
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-400/50 transition-all duration-300"></div>

          {/* Icon */}
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-6 shadow-lg scale-75 group-hover:scale-95 transition-transform">
            <Image src={imgPath} alt={title} fill className="w-8 h-8 scale-150" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>

          {/* Description */}
          <p className="text-gray-400 text-base leading-relaxed">{desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeatureCards;
