'use client'

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const About = () => {
  const { theme } = useTheme();
  const [aboutText, setAboutText] = useState(`
    <p>Merhaba! Ben Süleyman Talha Duman, 25 yaşında bir full-stack web geliştiriciyim. 
    Teknolojiye olan tutkum ve sürekli öğrenme isteğimle, modern web teknolojileri 
    kullanarak kullanıcı dostu ve performanslı uygulamalar geliştiriyorum.</p>
    
    <p>React, Next.js, Node.js ve diğer güncel teknolojilerle projeler üretiyorum. 
    Her projede kullanıcı deneyimini ön planda tutarak, hem görsel hem de fonksiyonel 
    açıdan mükemmel çözümler sunmaya çalışıyorum.</p>
    
    <p>Yazılım geliştirme sürecinde sürekli kendimi geliştirmeye ve yeni teknolojileri 
    öğrenmeye odaklanıyorum. Ekip çalışmasına uyumlu, problem çözme becerileri güçlü 
    ve detaylara önem veren bir geliştiriciyim.</p>
  `);
  const [aboutTitle, setAboutTitle] = useState('Hakkımda');
  const [skills, setSkills] = useState([
    { name: 'React', level: 5 },
    { name: 'Next.js', level: 4 },
    { name: 'JavaScript', level: 5 },
    { name: 'Node.js', level: 4 },
    { name: 'HTML5', level: 5 },
    { name: 'CSS3', level: 5 },
    { name: 'MongoDB', level: 3 },
    { name: 'Git', level: 4 }
  ]);
  const [education, setEducation] = useState([
    'Bilgisayar Mühendisliği - Üniversite (2018-2022)',
    'Web Geliştirme Bootcamp - Kodluyoruz (2023)',
    'React Native Kursu - Patika.dev (2024)',
    'Node.js ve MongoDB - Udemy (2024)'
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!mounted) return null;

  return (
    <motion.div
      className={`pt-20 min-h-screen ${theme === "light" ? "bg-custom-lightest text-custom-darkest" : "bg-custom-darkest text-custom-white"} transition-all duration-500`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {aboutTitle}
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: aboutText }}></div>
            <h2 className="text-2xl font-bold mt-8 mb-4">Eğitim</h2>
            <ul className="space-y-2">
              {education.map((edu, index) => (
                <motion.li
                  key={index}
                  className={`p-3 rounded-md ${theme === "light" ? "bg-custom-lighter" : "bg-custom-darkest"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {edu}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Yetenekler</h2>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-md ${theme === "light" ? "bg-custom-lighter" : "bg-custom-darkest"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <span>{skill.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < skill.level ? "text-yellow-400" : "text-gray-400"} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
