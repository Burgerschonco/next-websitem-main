'use client'

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faNodeJs, faJsSquare, faCss3Alt, faHtml5, faGithub, faFigma } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faDatabase, faCalendar, faFire, faStar, faCode } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Projects = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'E-ticaret Websitesi',
      description: 'React ve Node.js ile geliştirilmiş modern ve responsive e-ticaret platformu. Gelişmiş ürün filtreleme, sepet yönetimi ve ödeme entegrasyonu.',
      technologies: ['React', 'Node.js', 'MongoDB', 'CSS3'],
      category: 'fullstack',
      featured: true,
      stats: {
        stars: 128,
        forks: 45
      },
      showcase: true,
      date: '2024-01-15',
      github: 'https://github.com/system-conf/ecommerce',
      project: 'https://ecommerce-demo.vercel.app',
      image: '/projects/ecommerce.png'
    },
    {
      id: '2',
      title: 'Blog Uygulaması',
      description: 'Next.js ile geliştirilmiş modern blog uygulaması. SEO optimize edilmiş, hızlı yüklenen ve markdown desteği olan içerik yönetim sistemi.',
      technologies: ['Next.js', 'JavaScript', 'HTML5', 'CSS3'],
      category: 'frontend',
      featured: true,
      stats: {
        stars: 89,
        forks: 23
      },
      showcase: true,
      date: '2024-02-20',
      github: 'https://github.com/system-conf/blog',
      project: 'https://blog-demo.vercel.app',
      image: '/projects/blog.png'
    },
    {
      id: '3',
      title: 'Portfolyo Websitesi',
      description: 'Framer Motion animasyonları ve karanlık/aydınlık tema desteği olan kişisel portfolyo websitesi. Modern tasarım ve yüksek performans.',
      technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Figma'],
      category: 'frontend',
      featured: false,
      stats: {
        stars: 67,
        forks: 12
      },
      showcase: true,
      date: '2024-03-10',
      github: 'https://github.com/system-conf/portfolio',
      project: 'https://portfolio-demo.vercel.app',
      image: '/projects/portfolio.png'
    },
    {
      id: '4',
      title: 'Real-time Chat Uygulaması',
      description: 'WebSocket teknolojisi ile geliştirilmiş gerçek zamanlı sohbet uygulaması. Grup sohbetleri, dosya paylaşımı ve emoji desteği.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      category: 'fullstack',
      featured: false,
      stats: {
        stars: 156,
        forks: 34
      },
      showcase: false,
      date: '2024-03-25',
      github: 'https://github.com/system-conf/chat-app',
      project: 'https://chat-demo.vercel.app',
      image: '/projects/chat.png'
    }
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { id: 'all', name: 'Tümü', icon: faCode },
    { id: 'frontend', name: 'Frontend', icon: faReact },
    { id: 'fullstack', name: 'Full Stack', icon: faNodeJs }
  ];

  function getIcon(name) {
    switch (name) {
      case 'React':
        return faReact;
      case 'Node.js':
        return faNodeJs;
      case 'JavaScript':
        return faJsSquare;
      case 'CSS3':
        return faCss3Alt;
      case 'HTML5':
        return faHtml5;
      case 'MongoDB':
        return faDatabase;
      case 'Socket.io':
        return faCode;
      case 'Figma':
        return faFigma;
      default:
        return faCode;
    }
  }

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen pt-20 ${theme === "light" ? "bg-custom-lightest text-custom-darkest" : "bg-custom-darkest text-custom-white"} transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-3">Projelerim</h1>
          <p className={`text-sm ${theme === "light" ? "text-custom-dark" : "text-custom-lightest"}`}>
            Modern teknolojiler ile geliştirdiğim projeler
          </p>
        </motion.div>

        {/* Kategori Filtreleri */}
        <motion.div 
          className="flex justify-center mb-12 space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                selectedCategory === category.id
                  ? theme === "light"
                    ? "bg-custom-darkest text-custom-white"
                    : "bg-custom-white text-custom-darkest"
                  : theme === "light"
                  ? "bg-custom-lighter text-custom-darkest hover:bg-custom-light"
                  : "bg-custom-dark text-custom-white hover:bg-custom-medium"
              }`}
            >
              <FontAwesomeIcon icon={category.icon} className="mr-2" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Öne Çıkan Projeler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`group relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                theme === "light"
                  ? "bg-custom-white border border-custom-lighter hover:border-custom-darkest"
                  : "bg-custom-darkest border border-custom-dark hover:border-custom-white"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Proje Görseli */}
              <div className="relative h-48 overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    theme === "light" ? "bg-custom-lighter" : "bg-custom-dark"
                  }`}>
                    <FontAwesomeIcon icon={faCode} className="text-4xl opacity-30" />
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      theme === "light"
                        ? "bg-custom-darkest text-custom-white"
                        : "bg-custom-white text-custom-darkest"
                    }`}>
                      <FontAwesomeIcon icon={faFire} className="mr-1" />
                      Öne Çıkan
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold">{project.title}</h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faStar} className={`mr-1 ${theme === "light" ? "text-yellow-500" : "text-yellow-400"}`} />
                      {project.stats.stars}
                    </span>
                  </div>
                </div>

                <p className={`text-xs mb-4 ${theme === "light" ? "text-custom-dark" : "text-custom-lightest"}`}>
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className={`flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium ${
                        theme === "light"
                          ? "bg-custom-lighter text-custom-dark"
                          : "bg-custom-dark text-custom-lightest"
                      }`}
                    >
                      <FontAwesomeIcon icon={getIcon(tech)} className="mr-1" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center text-xs space-x-4 mb-4">
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faCalendar} className="mr-1 opacity-70" />
                    {project.date}
                  </span>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center px-3 py-1.5 rounded-lg text-xs transition-colors duration-300 ${
                      theme === "light"
                        ? "bg-custom-darkest text-custom-white hover:bg-custom-dark"
                        : "bg-custom-white text-custom-darkest hover:bg-custom-lightest"
                    }`}
                  >
                    <FontAwesomeIcon icon={faGithub} className="mr-2" />
                    GitHub
                  </a>
                  <a
                    href={project.project}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg border transition-colors duration-300 ${
                      theme === "light"
                        ? "border-custom-darkest text-custom-darkest hover:bg-custom-darkest hover:text-custom-white"
                        : "border-custom-white text-custom-white hover:bg-custom-white hover:text-custom-darkest"
                    }`}
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                    Canlı Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
