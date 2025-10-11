'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import Logo from './Logo';

const Navbar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = () => router.push('/');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  if (!mounted) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      theme === "light" ? "bg-custom-white/95 text-custom-accent shadow-md border-b border-custom-lighter" : "bg-custom-darkest/95 text-custom-white shadow-lg border-b border-custom-dark"
    } p-4 transition-colors duration-300 backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div
          onClick={handleLogoClick}
          className="cursor-pointer hover:opacity-75 transition-opacity duration-300 flex items-center gap-3"
        >
          <Logo width={40} height={40} />
          <span className="text-xl font-bold hidden sm:block">system.conf</span>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 ${
              theme === "light" 
                ? "hover:bg-custom-lighter text-custom-accent hover:scale-110" 
                : "hover:bg-custom-dark text-custom-white hover:scale-110"
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
