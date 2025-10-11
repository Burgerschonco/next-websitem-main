'use client'

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validasyonu
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Lütfen tüm alanları doldurun.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('Geçerli bir email adresi girin.');
      return;
    }

    try {
      setIsLoading(true);
      setFormStatus('Mesajınız gönderiliyor...');
      
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Bir hata oluştu');
      }
    } catch (error) {
      setFormStatus('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      console.error('Form gönderme hatası:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  if (!mounted) return null;

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 ${
        theme === "light"
          ? "bg-gradient-to-br from-custom-lightest to-custom-lighter"
          : "bg-gradient-to-br from-custom-darkest to-custom-dark"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-xl w-full space-y-8">
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="text-center space-y-3"
        >
          <h2 className={`text-4xl font-bold ${
            theme === "light"
              ? "bg-gradient-to-r from-custom-dark to-custom-darkest bg-clip-text text-transparent"
              : "text-custom-white"
          }`}>İletişime Geç</h2>
          <p className={`text-sm ${
            theme === "light" ? "text-custom-dark" : "text-custom-lightest"
          }`}>Projeleriniz için benimle iletişime geçebilirsiniz.</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className={`mt-8 space-y-6 p-8 rounded-2xl backdrop-blur-sm ${
            theme === "light"
              ? "bg-custom-white/80 shadow-lg"
              : "bg-custom-dark/50 shadow-xl"
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                theme === "light" ? "text-custom-dark" : "text-custom-lightest"
              }`}>İsim</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`block w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ease-in-out ${
                  theme === "light"
                    ? "bg-custom-lightest border-custom-lighter placeholder-custom-medium text-custom-darkest focus:border-custom-darkest focus:ring-0"
                    : "bg-custom-darkest/50 border-custom-dark placeholder-custom-medium text-custom-white focus:border-custom-medium focus:ring-0"
                }`}
                placeholder="Adınız"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                theme === "light" ? "text-custom-dark" : "text-custom-lightest"
              }`}>E-posta</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`block w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ease-in-out ${
                  theme === "light"
                    ? "bg-custom-lightest border-custom-lighter placeholder-custom-medium text-custom-darkest focus:border-custom-darkest focus:ring-0"
                    : "bg-custom-darkest/50 border-custom-dark placeholder-custom-medium text-custom-white focus:border-custom-medium focus:ring-0"
                }`}
                placeholder="E-posta adresiniz"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                theme === "light" ? "text-custom-dark" : "text-custom-lightest"
              }`}>Mesaj</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className={`block w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ease-in-out ${
                  theme === "light"
                    ? "bg-custom-lightest border-custom-lighter placeholder-custom-medium text-custom-darkest focus:border-custom-darkest focus:ring-0"
                    : "bg-custom-darkest/50 border-custom-dark placeholder-custom-medium text-custom-white focus:border-custom-medium focus:ring-0"
                }`}
                placeholder="Mesajınız"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl transition-all duration-300 ${
                theme === "light"
                  ? "text-custom-white bg-custom-darkest hover:bg-custom-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-darkest disabled:bg-custom-medium"
                  : "text-custom-white bg-custom-dark hover:bg-custom-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-medium disabled:bg-custom-dark"
              }`}
            >
              <span className="flex items-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Mesaj Gönder
                  </>
                )}
              </span>
            </button>
          </div>
        </motion.form>
        {formStatus && (
          <motion.p
            className={`mt-4 text-center text-sm ${
              formStatus.includes('hata')
                ? theme === "light" ? "text-red-600" : "text-red-400"
                : theme === "light" ? "text-green-600" : "text-green-400"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {formStatus}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Contact;

 