'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.footer
      className={`${theme === "light" ? "bg-custom-white text-custom-accent border-t border-custom-lighter shadow-inner" : "bg-custom-darkest text-custom-white border-t border-custom-dark shadow-inner"} transition-colors duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo />
              <h3 className="text-xl font-bold">system.conf</h3>
            </div>
            <p className={`text-sm ${theme === 'light' ? 'text-custom-medium' : 'text-custom-lighter'}`}>
              Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiren full-stack web geliştiricisi.
            </p>
          </div>

          {/* Hızlı Bağlantılar */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Hızlı Bağlantılar</h4>
            <div className="space-y-2">
              {[
                { name: 'Ana Sayfa', href: '/' },
                { name: 'Hakkımda', href: '/About' },
                { name: 'Projeler', href: '/projects' },
                { name: 'Hizmetler', href: '/Services' },
                { name: 'İletişim', href: '/Contact' }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block text-sm ${theme === 'light' ? 'text-custom-medium hover:text-custom-accent' : 'text-custom-lighter hover:text-custom-white'} transition-colors duration-200`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">İletişim</h4>
            <div className="space-y-3">
              <a
                href="mailto:info@systemconf.online"
                className={`flex items-center space-x-2 text-sm ${theme === 'light' ? 'text-custom-medium hover:text-custom-accent' : 'text-custom-lighter hover:text-custom-white'} transition-colors duration-200`}
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                <span>info@systemconf.online</span>
              </a>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://github.com/system-conf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme === 'light' ? 'text-custom-medium hover:text-custom-accent' : 'text-custom-lighter hover:text-custom-white'} transition-colors duration-200`}
                >
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/system-conf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme === 'light' ? 'text-custom-medium hover:text-custom-accent' : 'text-custom-lighter hover:text-custom-white'} transition-colors duration-200`}
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/system_conf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme === 'light' ? 'text-custom-medium hover:text-custom-accent' : 'text-custom-lighter hover:text-custom-white'} transition-colors duration-200`}
                >
                  <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Çizgi ve Telif Hakkı */}
        <div className={`mt-8 pt-8 border-t ${theme === 'light' ? 'border-custom-lighter' : 'border-custom-dark'} flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0`}>
          <div className="flex items-center space-x-2 text-sm">
            <span>&copy; 2024 system.conf - Tüm hakları saklıdır</span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <span>Türkiye'den</span>
            <FontAwesomeIcon icon={faHeart} className="text-red-500 w-4 h-4" />
            <span>ile yapıldı</span>
            <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
