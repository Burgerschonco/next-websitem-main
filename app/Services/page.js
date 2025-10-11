'use client'

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMobileAlt, faPalette, faServer, faCloud, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Services = () => {
  const { theme } = useTheme();
  const [services, setServices] = useState([
    { title: 'Web Geliştirme', description: 'Modern ve responsive web siteleri geliştiriyorum. React, Next.js ve diğer güncel teknolojiler kullanarak kullanıcı dostu arayüzler oluşturuyorum.', icon: 'faCode' },
    { title: 'Mobil Uygulama', description: 'React Native ile cross-platform mobil uygulamalar geliştiriyorum. iOS ve Android için tek kod tabanı ile hızlı çözümler sunuyorum.', icon: 'faMobileAlt' },
    { title: 'UI/UX Tasarım', description: 'Kullanıcı deneyimini ön planda tutan, modern ve estetik tasarımlar oluşturuyorum. Figma ve Adobe Creative Suite kullanıyorum.', icon: 'faPalette' },
    { title: 'Backend Geliştirme', description: 'Node.js, Express ve MongoDB ile güçlü backend sistemleri geliştiriyorum. API tasarımı ve veritabanı yönetimi konularında uzmanım.', icon: 'faServer' },
    { title: 'Cloud Çözümleri', description: 'AWS, Vercel ve diğer cloud platformlarında uygulama deployment ve yönetimi yapıyorum. Ölçeklenebilir çözümler sunuyorum.', icon: 'faCloud' },
    { title: 'E-ticaret', description: 'Online mağaza ve e-ticaret platformları geliştiriyorum. Güvenli ödeme sistemleri ve stok yönetimi çözümleri sunuyorum.', icon: 'faShoppingCart' },
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const iconMap = { faCode, faMobileAlt, faPalette, faServer, faCloud, faShoppingCart };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen pt-20 ${theme === "light" ? "bg-custom-lightest text-custom-darkest" : "bg-custom-darkest text-custom-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 className="text-4xl font-bold mb-12 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Hizmetlerim
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={index} className={`relative p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${theme === "light" ? "bg-custom-lighter" : "bg-custom-darkest"}`} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <div className={`absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full ${theme === "light" ? "bg-custom-white text-custom-darkest" : "bg-custom-darkest text-custom-white"}`}>
                <FontAwesomeIcon icon={iconMap[service.icon]} className="text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className={`text-base ${theme === "light" ? "text-custom-dark" : "text-custom-lightest"}`}>{service.description}</p>
              <div className="mt-6">
                <a href="#" className={`inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${theme === "light" ? "bg-custom-darkest text-custom-white hover:bg-custom-dark" : "bg-custom-white text-custom-darkest hover:bg-custom-lightest"}`}>
                  Daha Fazla
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;



