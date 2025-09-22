'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  const getThemeClasses = () => {
    switch (theme.name) {
      case 'Dark':
        return {
          bg: 'bg-gray-900/95',
          text: 'text-white',
          accent: 'text-purple-400',
          hover: 'hover:text-purple-400',
          border: 'border-gray-700',
        };
      case 'Cyan':
        return {
          bg: 'bg-white/95',
          text: 'text-gray-900',
          accent: 'text-cyan-600',
          hover: 'hover:text-cyan-600',
          border: 'border-cyan-200',
        };
      case 'Gradient':
        return {
          bg: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400',
          text: 'text-white',
          accent: 'text-yellow-300',
          hover: 'hover:text-yellow-300',
          border: 'border-transparent',
        };
      default:
        return {
          bg: 'bg-white/95',
          text: 'text-gray-900',
          accent: 'text-blue-600',
          hover: 'hover:text-blue-600',
          border: 'border-gray-200',
        };
    }
  };

  const themeClasses = getThemeClasses();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${themeClasses.bg} backdrop-blur-md border-b ${themeClasses.border} shadow-md transition-all duration-300`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className={`text-xl flex items-center justify-center font-bold space-x-2 ${themeClasses.accent} transition-colors duration-300`}
          >
            <Image
              src="https://img.icons8.com/?size=160&id=115369&format=png"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="tracking-wider">WebMinds</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${themeClasses.text} ${themeClasses.hover} transition-all duration-300 font-medium relative group`}
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-current transition-all group-hover:w-full"></span>
              </a>
            ))}

            {/* Theme Selector */}
            <div className="relative">

              {isThemeMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 ${themeClasses.bg} rounded-xl shadow-lg border ${themeClasses.border} py-2 overflow-hidden animate-fade-in`}
                >
                  {themes.map((themeItem) => (
                    <button
                      key={themeItem.name}
                      onClick={() => {
                        setTheme(themeItem);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 ${themeClasses.text} ${themeClasses.hover} flex items-center space-x-3 transition-colors duration-300`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full ${themeItem.accent} border border-white/30`}
                      ></div>
                      <span>{themeItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
          

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${themeClasses.text} ${themeClasses.hover} transition-colors duration-300`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${themeClasses.border} py-4`}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 ${themeClasses.text} ${themeClasses.hover} transition-colors duration-300 font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}

        {/* Mobile Theme Menu */}
        {isThemeMenuOpen && (
          <div className={`md:hidden border-t ${themeClasses.border} py-4`}>
            {themes.map((themeItem) => (
              <button
                key={themeItem.name}
                onClick={() => {
                  setTheme(themeItem);
                  setIsThemeMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 ${themeClasses.text} ${themeClasses.hover} transition-colors duration-300 flex items-center space-x-3`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${themeItem.accent} border border-white/30`}
                ></div>
                <span>{themeItem.name}</span>
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
