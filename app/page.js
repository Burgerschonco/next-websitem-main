'use client'

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaFileDownload, FaReact, FaNodeJs, FaDocker, FaGitAlt, FaCode, FaRobot, FaMagic, FaMoon, FaSun, FaLanguage, FaArrowUp, FaBullseye, FaHandPaper, FaShoppingCart, FaPencilAlt, FaComments, FaChartLine } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql, SiVisualstudiocode } from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi';
import Navigation from './components/Navigation';

// Lazy load GitHub Calendar for better performance
const GitHubCalendar = dynamic(() => import('react-github-calendar'), {
  ssr: false,
  loading: () => <div className="h-48 flex items-center justify-center text-[#B8B8B8]">Loading GitHub activity...</div>
});

const Home = () => {
  const { theme, setTheme } = useTheme();
  const githubUsername = 'system-conf';
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);

    // Scroll progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

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
      icon: FaShoppingCart,
    },
    {
      title: 'Blog & CMS',
      description: 'SEO optimize blog platformu. Markdown desteği ve hızlı içerik yönetimi.',
      tech: ['Next.js', 'TypeScript', 'MDX'],
      icon: FaPencilAlt,
    },
    {
      title: 'Real-time Chat',
      description: 'WebSocket ile gerçek zamanlı mesajlaşma. Grup sohbetleri ve dosya paylaşımı.',
      tech: ['React', 'Socket.io', 'Redis'],
      icon: FaComments,
    },
    {
      title: 'Dashboard Analytics',
      description: 'Veri görselleştirme paneli. Grafik, tablo ve raporlama araçları.',
      tech: ['Next.js', 'Chart.js', 'PostgreSQL'],
      icon: FaChartLine,
    },
  ];


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 2) newErrors.name = 'İsim en az 2 karakter olmalı';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir email girin';
    if (formData.message.length < 10) newErrors.message = 'Mesaj en az 10 karakter olmalı';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setFormStatus('Mesajınız alındı! En kısa sürede dönüş yapacağım.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 3000);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F5E7' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2B2B2B]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 transition-colors duration-300" style={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7' }}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#E6E6E6]/20 z-50">
        <div 
          className="h-full bg-[#2B2B2B] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-[#2B2B2B] text-white shadow-lg hover:bg-[#1A1A1A] z-50 hover:scale-110 transition-all duration-300"
        >
          <FaArrowUp className="text-xl" />
        </motion.button>
      )}

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

      {/* Side Navigation Menu - Fixed Left Bottom - Always Visible */}
      {/* Navigation Component */}
      <Navigation />


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
                loading="eager"
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
              Merhaba, ben <FaHandPaper className="inline-block" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }} />
            </h1>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
              Süleyman Talha Duman
            </h2>
            <p className="text-xl md:text-2xl font-medium" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
              Full-Stack Web Developer
            </p>
          </motion.div>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8"
            style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}
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
            <button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 bg-[#2B2B2B] text-white hover:bg-[#1A1A1A]"
            >
              <FaEnvelope className="text-lg group-hover:rotate-12 transition-transform" />
              İletişime Geç
            </button>
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


        {/* About Section - Hakkımda */}
        <motion.div
          id="about"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-16 scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h3 className="text-2xl font-bold text-center mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
            Hakkımda
          </h3>
          <div className="p-8 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl" style={{ 
            backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
            borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6'
          }}>
            <div className="space-y-4 text-base md:text-lg leading-relaxed" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
              <p>
                Merhaba! Ben Süleyman Talha Duman, tutkulu bir <span className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}>Full-Stack Web Developer</span>'ım. 
                Web teknolojileri dünyasında yolculuğuma başladığımdan beri, kullanıcı deneyimini ön planda tutan, 
                modern ve performanslı uygulamalar geliştirmeye odaklandım.
              </p>
              
              <p>
                <span className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}>Frontend</span> tarafında React ve Next.js ile dinamik, 
                responsive ve SEO dostu arayüzler tasarlıyorum. <span className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}>Backend</span> tarafında ise 
                Node.js, MongoDB ve PostgreSQL kullanarak güvenli, ölçeklenebilir API'ler ve veritabanı mimarileri kuruyorum.
              </p>
              
              <p>
                Teknolojiye olan merakım, sürekli öğrenme ve gelişme tutkumla birleşiyor. 
                AI destekli araçlar (Cursor AI, Claude, GitHub Copilot) ile kod yazma sürecimi optimize ediyor, 
                daha temiz ve sürdürülebilir kod üretmeye çalışıyorum.
              </p>
              
              <p>
                Her projede <span className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}>temiz kod</span>, 
                <span className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}> performans</span> ve 
                <span className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}> kullanıcı deneyimi</span> önceliğimdir. 
                Modern web standartlarını takip ediyor, en iyi pratikleri uyguluyorum.
              </p>

              <div className="pt-4 mt-4 border-t" style={{ borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6' }}>
                <p className="font-semibold mb-2 flex items-center gap-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}>
                  <FaBullseye className="text-lg" />
                  Odak Alanlarım:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Modern web uygulamaları (SPA, SSR, SSG)</li>
                  <li>RESTful API ve GraphQL backend geliştirme</li>
                  <li>Veritabanı tasarımı ve optimizasyonu</li>
                  <li>UI/UX odaklı responsive tasarım</li>
                  <li>Performance optimization ve SEO</li>
                  <li>AI-powered development tools</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Tech Stack with Categories */}
        <motion.div
          id="tech"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16 scroll-mt-24 relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          
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
          <h3 className="text-2xl font-bold text-center mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
            Ne Yapıyorum?
          </h3>
          <p className="text-center mb-8 text-sm" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
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
                className="group p-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl border"
                style={{
                  backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6'
                }}
              >
                <div className="inline-flex p-4 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110" style={{
                  backgroundColor: theme === 'dark' ? '#1A1A1A' : '#E6E6E6'
                }}>
                  <service.icon className="text-3xl" style={{
                    color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B'
                  }} />
                </div>
                <h4 className="text-xl font-bold mb-3" style={{
                  color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B'
                }}>
                  {service.title}
                </h4>
                <p className="text-sm mb-4" style={{
                  color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                }}>
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(43, 43, 43, 0.1)',
                        color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section - Grid Layout */}
        <motion.div
          id="projects"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mb-16 scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h3 className="text-2xl font-bold text-center mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
            Projelerim
          </h3>
          <p className="text-center mb-12 text-sm" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
            Son zamanlarda geliştirdiğim projeler
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div 
                  className="h-full p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border"
                  style={{ 
                    backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6'
                  }}
                >
                  <div className="h-full flex flex-col">
                    <div 
                      className="mb-4 group-hover:scale-110 transition-transform duration-300 inline-flex p-4 rounded-xl"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7'
                      }}
                    >
                      <project.icon 
                        className="text-4xl" 
                        style={{ color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }} 
                      />
                    </div>
                    <h4 
                      className="text-xl font-bold mb-3"
                      style={{ color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}
                    >
                      {project.title}
                    </h4>
                    <p 
                      className="text-sm mb-4 flex-grow leading-relaxed"
                      style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(43, 43, 43, 0.1)',
                            color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors bg-white text-[#1A1A1A] focus:border-[#2B2B2B] focus:outline-none placeholder-[#B8B8B8] ${formErrors.name ? 'border-red-500' : 'border-[#E6E6E6]'}`}
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors bg-white text-[#1A1A1A] focus:border-[#2B2B2B] focus:outline-none placeholder-[#B8B8B8] ${formErrors.email ? 'border-red-500' : 'border-[#E6E6E6]'}`}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Mesajınız"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors bg-white text-[#1A1A1A] focus:border-[#2B2B2B] focus:outline-none placeholder-[#B8B8B8] ${formErrors.message ? 'border-red-500' : 'border-[#E6E6E6]'}`}
                ></textarea>
                {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
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
          transition={{ delay: 0.3 }}
          className="mt-20 pt-8 text-center scroll-mt-24 relative w-full"
        >
          
          <p className="text-sm relative z-10" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
            &copy; 2024 system.conf - Süleyman Talha Duman
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Home;
