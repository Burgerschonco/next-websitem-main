'use client'

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import GitHubCalendar from 'react-github-calendar';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaFileDownload, FaReact, FaNodeJs, FaDocker, FaGitAlt, FaCode, FaRobot, FaMagic, FaMoon, FaSun, FaChevronLeft, FaChevronRight, FaTools, FaChartBar, FaBriefcase, FaFolder, FaInfoCircle, FaHandPaper, FaTimes, FaGlobe, FaLanguage } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql, SiVisualstudiocode } from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi';

const Home = () => {
  const { theme, setTheme } = useTheme();
  const githubUsername = 'system-conf';
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const [showNavMenu, setShowNavMenu] = useState(false);

  const skills = [
    { name: 'React', icon: FaReact, category: 'frontend' },
    { name: 'Next.js', icon: SiNextdotjs, category: 'frontend' },
    { name: 'Node.js', icon: FaNodeJs, category: 'backend' },
    { name: 'TypeScript', icon: SiTypescript, category: 'frontend' },
    { name: 'Tailwind', icon: SiTailwindcss, category: 'frontend' },
    { name: 'MongoDB', icon: SiMongodb, category: 'backend' },
    { name: 'PostgreSQL', icon: SiPostgresql, category: 'backend' },
    { name: 'Docker', icon: FaDocker, category: 'tools' },
    { name: 'Git', icon: FaGitAlt, category: 'tools' },
    { name: 'Cursor AI', icon: HiSparkles, category: 'ai' },
    { name: 'Claude', icon: FaRobot, category: 'ai' },
    { name: 'Copilot', icon: FaMagic, category: 'ai' },
    { name: 'VS Code', icon: SiVisualstudiocode, category: 'tools' },
  ];

  const socialLinksPopup = [
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/system-conf/', color: '#0077B5' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com/system_conf', color: '#1DA1F2' },
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/system-conf', color: '#1A1A1A' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: FaLinkedin, link: 'https://www.linkedin.com/in/system-conf/', color: '#0077B5' },
    { name: 'Twitter', icon: FaTwitter, link: 'https://twitter.com/system_conf', color: '#1DA1F2' },
    { name: 'GitHub', icon: FaGithub, link: 'https://github.com/system-conf', color: '#333' },
  ];

  const vibeCodingTools = [
    { name: 'Cursor AI', icon: HiSparkles, description: 'AI-powered code editor' },
    { name: 'Claude', icon: FaRobot, description: 'AI pair programmer' },
    { name: 'GitHub Copilot', icon: FaMagic, description: 'AI code completion' },
    { name: 'VS Code', icon: SiVisualstudiocode, description: 'Modern IDE' },
  ];

  const services = [
    { 
      title: 'Frontend Development', 
      description: 'Modern, responsive ve performanslı web arayüzleri', 
      icon: FaReact,
      tech: ['React', 'Next.js', 'TypeScript']
    },
    { 
      title: 'Backend Development', 
      description: 'Güvenli ve ölçeklenebilir API sistemleri', 
      icon: FaNodeJs,
      tech: ['Node.js', 'MongoDB', 'PostgreSQL']
    },
    { 
      title: 'Full-Stack Solutions', 
      description: 'Baştan sona tüm proje geliştirme', 
      icon: FaCode,
      tech: ['MERN', 'Next.js', 'Cloud']
    },
  ];

  const projects = [
    {
      title: 'E-ticaret Platform',
      description: 'Full-stack e-ticaret çözümü. Ödeme entegrasyonu, stok yönetimi ve admin paneli.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      bgColor: '#2B2B2B'
    },
    {
      title: 'Blog & CMS',
      description: 'SEO optimize blog platformu. Markdown desteği ve hızlı içerik yönetimi.',
      tech: ['Next.js', 'TypeScript', 'MDX'],
      bgColor: '#3C3C3C'
    },
    {
      title: 'Real-time Chat',
      description: 'WebSocket ile gerçek zamanlı mesajlaşma. Grup sohbetleri ve dosya paylaşımı.',
      tech: ['React', 'Socket.io', 'Redis'],
      bgColor: '#1A1A1A'
    },
    {
      title: 'Dashboard Analytics',
      description: 'Veri görselleştirme paneli. Grafik, tablo ve raporlama araçları.',
      tech: ['Next.js', 'Chart.js', 'PostgreSQL'],
      bgColor: '#2B2B2B'
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Mesajınız alındı! En kısa sürede dönüş yapacağım.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 3000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen py-16 transition-colors duration-300" style={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7' }}>
      {/* Theme Toggle & Language - Top Right */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        {/* Language Selector */}
        <div className="relative">
          <select
            className="pl-10 pr-4 py-3 rounded-full transition-all duration-300 shadow-lg text-sm font-semibold cursor-pointer hover:scale-105 appearance-none"
            style={{ 
              backgroundColor: theme === 'dark' ? '#F8F5E7' : '#2B2B2B',
              color: theme === 'dark' ? '#1A1A1A' : '#E6E6E6'
            }}
          >
            <option value="tr">TR</option>
            <option value="en">EN</option>
          </select>
          <FaLanguage 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none" 
            style={{ color: theme === 'dark' ? '#1A1A1A' : '#E6E6E6' }}
          />
        </div>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-4 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
          style={{ 
            backgroundColor: theme === 'dark' ? '#F8F5E7' : '#2B2B2B',
            color: theme === 'dark' ? '#1A1A1A' : '#E6E6E6'
          }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
        </button>
      </div>

      {/* Side Navigation Menu - Fixed Left - Always Visible - No Scroll */}
      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 md:gap-4">
        {[
          { id: 'tech', label: 'Tech', icon: FaTools },
          { id: 'github', label: 'GitHub', icon: FaChartBar },
          { id: 'services', label: 'Services', icon: FaBriefcase },
          { id: 'projects', label: 'Projects', icon: FaFolder },
          { id: 'contact', label: 'Contact', icon: FaEnvelope },
          { id: 'footer', label: 'Info', icon: FaInfoCircle },
        ].map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.08, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1, x: 5 }}
            onClick={() => {
              const element = document.getElementById(item.id);
              element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center gap-0.5 md:gap-1 transition-all duration-300 shadow-lg hover:shadow-xl bg-[#2B2B2B] hover:bg-[#3C3C3C] group"
          >
            <item.icon className="text-sm md:text-base text-[#E6E6E6] group-hover:text-white transition-colors" />
            <span className="text-[6px] md:text-[7px] font-semibold text-[#E6E6E6] group-hover:text-white transition-colors leading-none">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="w-full">
        {/* Hero Section - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Avatar with Navigation Menu */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="mb-8 inline-block relative"
          >
            {/* Center Avatar */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#E6E6E6] transition-all duration-300 hover:scale-105 z-10">
              <img
                src="/pp.png"
                alt="Süleyman Talha Duman"
                className="object-cover w-full h-full"
              />
            </div>

          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#2B2B2B' }}>
              Merhaba, ben <FaHandPaper className="inline-block animate-wave" style={{ color: theme === 'dark' ? '#B8B8B8' : '#3C3C3C' }} />
            </h1>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
              Süleyman Talha Duman
            </h2>
            <p className="text-xl md:text-2xl font-medium" style={{ color: theme === 'dark' ? '#B8B8B8' : '#3C3C3C' }}>
              Full-Stack Web Developer
            </p>
          </motion.div>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8"
            style={{ color: theme === 'dark' ? '#B8B8B8' : '#3C3C3C' }}
          >
            Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum. 
            React, Next.js ve Node.js ile projeler üretiyorum.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/Contact">
              <button className="group px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 bg-[#2B2B2B] text-white hover:bg-[#1A1A1A]">
                <FaEnvelope className="text-lg group-hover:rotate-12 transition-transform" />
                İletişime Geç
              </button>
            </Link>
            <a href="/profile.pdf" download>
              <button className="group px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 flex items-center gap-2 bg-white text-[#2B2B2B] border-2 border-[#2B2B2B] hover:bg-[#E6E6E6] shadow-lg">
                <FaFileDownload className="text-lg group-hover:translate-y-1 transition-transform" />
                CV İndir
              </button>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-4 mb-16"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-full transition-all duration-300 bg-white hover:bg-[#2B2B2B] text-[#2B2B2B] hover:text-white shadow-lg"
                aria-label={social.name}
              >
                <social.icon className="text-2xl" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Tech Stack with Categories */}
        <motion.div
          id="tech"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16 scroll-mt-24 relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Decorative Wave - Full Width */}
          <div className="absolute -top-16 left-0 w-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-24">
              <path d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z" fill={theme === 'dark' ? '#E6E6E6' : '#2B2B2B'} />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-center mb-3 text-[#1A1A1A]">
            Teknolojiler & Araçlar
          </h3>
          <p className="text-center mb-8 text-sm text-[#3C3C3C]">
            Modern araçlar ve AI destekli geliştirme
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.03 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`px-5 py-3 rounded-full font-medium text-sm flex items-center gap-2 transition-all duration-300 cursor-default ${
                  skill.category === 'ai'
                    ? "bg-[#3C3C3C] text-[#E6E6E6] shadow-lg hover:shadow-xl hover:bg-[#2B2B2B]"
                    : "bg-[#E6E6E6] text-[#2B2B2B] shadow-md hover:shadow-lg hover:bg-white"
                }`}
              >
                <skill.icon className="text-lg" />
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GitHub Activity - Moved Up */}
        <motion.div
          id="github"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mb-16 scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h3 className="text-2xl font-bold text-center mb-6 text-[#1A1A1A]">
            GitHub Aktivitelerim
          </h3>
          <div className="overflow-x-auto p-6 rounded-2xl transition-all duration-300 bg-white shadow-lg hover:shadow-xl border border-[#E6E6E6]">
            <GitHubCalendar 
              username={githubUsername}
              blockSize={14}
              blockMargin={5}
              fontSize={14}
              theme={{
                light: ['#F8F5E7', '#E6E6E6', '#B8B8B8', '#3C3C3C', '#2B2B2B'],
                dark: ['#F8F5E7', '#E6E6E6', '#B8B8B8', '#3C3C3C', '#2B2B2B']
              }}
              colorScheme="light"
            />
          </div>
        </motion.div>

        {/* Services Section - Modernized */}
        <motion.div
          id="services"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className="mb-16 scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h3 className="text-2xl font-bold text-center mb-3 text-[#1A1A1A]">
            Ne Yapıyorum?
          </h3>
          <p className="text-center mb-8 text-sm text-[#3C3C3C]">
            Uzmanlık alanlarım ve sunduğum hizmetler
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-2xl transition-all duration-300 bg-white shadow-lg hover:shadow-2xl border border-[#E6E6E6]"
              >
                <div className={`inline-flex p-4 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  theme === "light" ? "bg-custom-lighter" : "bg-custom-darkest"
                }`}>
                  <service.icon className={`text-3xl ${
                    theme === "light" ? "text-custom-accent" : "text-custom-white"
                  }`} />
                </div>
                <h4 className={`text-xl font-bold mb-3 ${
                  theme === "light" ? "text-custom-accent" : "text-custom-white"
                }`}>
                  {service.title}
                </h4>
                <p className={`text-sm mb-4 ${
                  theme === "light" ? "text-custom-medium" : "text-custom-lighter"
                }`}>
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        theme === "light"
                          ? "bg-custom-accent/10 text-custom-accent"
                          : "bg-custom-white/10 text-custom-white"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section - Modern Slider */}
        <motion.div
          id="projects"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mb-16 scroll-mt-24 w-full"
        >
          <h3 className="text-2xl font-bold text-center mb-3 text-[#1A1A1A]">
            Projelerim
          </h3>
          <p className="text-center mb-8 text-sm text-[#3C3C3C]">
            Son zamanlarda geliştirdiğim projeler
          </p>
          
          <div className="relative w-full">
            {/* Slider Container */}
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex"
              >
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="min-w-full px-4 md:px-8"
                  >
                    <div className="p-8 md:p-12 shadow-2xl" style={{ backgroundColor: project.bgColor }}>
                      <div className="text-white">
                        <h4 className="text-3xl font-bold mb-4">{project.title}</h4>
                        <p className="text-lg mb-6 opacity-90">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full transition-all duration-300 bg-white hover:bg-[#E6E6E6] text-[#2B2B2B] shadow-lg"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full transition-all duration-300 bg-white hover:bg-[#E6E6E6] text-[#2B2B2B] shadow-lg"
              >
                <FaChevronRight className="text-xl" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? theme === "light"
                        ? "w-8 bg-custom-accent"
                        : "w-8 bg-custom-white"
                      : theme === "light"
                      ? "w-2 bg-custom-lighter"
                      : "w-2 bg-custom-medium"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9 }}
          className="mb-16 scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-[#1A1A1A]">
            İletişim
          </h3>
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white shadow-lg border border-[#E6E6E6]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="İsim"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 transition-colors bg-white border-[#E6E6E6] text-[#1A1A1A] focus:border-[#2B2B2B] focus:outline-none placeholder-[#B8B8B8]"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 transition-colors bg-white border-[#E6E6E6] text-[#1A1A1A] focus:border-[#2B2B2B] focus:outline-none placeholder-[#B8B8B8]"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Mesajınız"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 transition-colors bg-white border-[#E6E6E6] text-[#1A1A1A] focus:border-[#2B2B2B] focus:outline-none placeholder-[#B8B8B8]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-[#2B2B2B] text-white hover:bg-[#1A1A1A]"
              >
                <FaEnvelope />
                Mesaj Gönder
              </button>
            </form>
            {formStatus && (
              <p className="mt-4 text-center text-sm text-green-500">
                {formStatus}
              </p>
            )}
          </div>
        </motion.div>
        {/* Footer */}
        <motion.footer
          id="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3 }}
          className="mt-20 pt-8 text-center scroll-mt-24 relative w-full"
        >
          {/* Wave Divider - Full Width */}
          <div className="absolute -top-20 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z" style={{ fill: theme === 'dark' ? '#2B2B2B' : '#E6E6E6', opacity: 0.2 }}></path>
            </svg>
          </div>
          
          <p className="text-sm relative z-10" style={{ color: theme === 'dark' ? '#B8B8B8' : '#3C3C3C' }}>
            &copy; 2024 system.conf - Süleyman Talha Duman
          </p>
        </motion.footer>
      </div>
      
      {/* Floating Wave Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-10 animate-float-slow" style={{ background: `radial-gradient(circle, ${theme === 'dark' ? '#E6E6E6' : '#2B2B2B'} 0%, transparent 70%)` }}></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full opacity-10 animate-float-slower" style={{ background: `radial-gradient(circle, ${theme === 'dark' ? '#B8B8B8' : '#3C3C3C'} 0%, transparent 70%)` }}></div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-wave {
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(5deg); }
          50% { transform: translate(-20px, 20px) rotate(-5deg); }
          75% { transform: translate(20px, 10px) rotate(3deg); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 20px) rotate(-3deg); }
          66% { transform: translate(30px, -20px) rotate(3deg); }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
