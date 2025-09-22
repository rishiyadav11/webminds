"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = ["Features", "How it Works", "Pricing", "About"];

  useEffect(() => {
    setIsLoggedIn(!!session?.user);
  }, [session]);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 backdrop-blur-md bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white font-extrabold text-xl tracking-tight">
            WebMinds
          </Link>
          <span className="ml-2 px-3 py-2 rounded-full text-sm font-semibold text-indigo-100 bg-indigo-700/30 border border-indigo-500 hidden sm:inline transition transform hover:scale-110 hover:bg-indigo-600/50 hover:rotate-1">
            Empowering Developers
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-gray-200 hover:text-white transition duration-300 transform hover:scale-110 hover:underline hover:underline-offset-4"
            >
              {item}
            </a>
          ))}
          <Link
            href={isLoggedIn ? "/dashboard" : "/start"}
            className="ml-4 px-5 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:brightness-125 hover:rotate-1"
          >
            {isLoggedIn ? "Dashboard" : "Get Started"}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-200 hover:text-white transition transform hover:scale-125"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f172a] border-t border-white/20 px-6 py-4 space-y-4 rounded-b-lg shadow-lg">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="block text-gray-200 hover:text-white transition duration-300 transform hover:scale-110 hover:underline hover:underline-offset-4"
            >
              {item}
            </a>
          ))}
          <Link
            href={isLoggedIn ? "/dashboard" : "/start"}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:brightness-125 hover:rotate-1 cursor-pointer"
          >
            {isLoggedIn ? "Dashboard" : "Get Started"}
          </Link>
        </div>
      )}
    </nav>
  );
}
