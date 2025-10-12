'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaTools, FaChartBar, FaBriefcase, FaFolder, FaEnvelope } from 'react-icons/fa';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Active section observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    
    ['about', 'tech', 'github', 'services', 'projects', 'contact'].forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const menuItems = [
    { id: 'about', label: 'Hakkımda', icon: FaInfoCircle },
    { id: 'tech', label: 'Teknoloji', icon: FaTools },
    { id: 'github', label: 'GitHub', icon: FaChartBar },
    { id: 'services', label: 'Hizmetler', icon: FaBriefcase },
    { id: 'projects', label: 'Projeler', icon: FaFolder },
    { id: 'contact', label: 'İletişim', icon: FaEnvelope },
  ];

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <nav 
      className="z-40 flex flex-row md:flex-col gap-2 md:gap-3"
      aria-label="Ana Navigasyon"
      style={{ 
        position: 'fixed',
        left: '1.5rem',
        bottom: '1.5rem'
      }}
    >
      {menuItems.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.08, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1, x: 5 }}
          onClick={() => handleNavClick(item.id)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center gap-0.5 md:gap-1 transition-all duration-300 shadow-lg hover:shadow-xl bg-[#2B2B2B] hover:bg-[#3C3C3C] group ${
            activeSection === item.id ? 'ring-2 ring-white scale-110' : ''
          }`}
          aria-label={item.label}
          title={item.label}
        >
          <item.icon className="text-sm md:text-base text-[#E6E6E6] group-hover:text-white transition-colors" />
          <span className="text-[6px] md:text-[7px] font-semibold text-[#E6E6E6] group-hover:text-white transition-colors leading-none">
            {item.label}
          </span>
        </motion.button>
      ))}
    </nav>
  );
};

export default Navigation;
