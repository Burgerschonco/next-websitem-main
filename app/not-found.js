'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { FaHome } from 'react-icons/fa'
import Logo from './components/Logo'

export default function NotFound() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      theme === "light" ? "bg-custom-lightest" : "bg-custom-darkest"
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <Logo width={80} height={80} />
        </motion.div>

        {/* 404 Number */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`text-9xl md:text-[12rem] font-bold mb-4 ${
            theme === "light" ? "text-custom-accent" : "text-custom-white"
          }`}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className={`text-2xl md:text-3xl font-semibold mb-4 ${
            theme === "light" ? "text-custom-accent" : "text-custom-white"
          }`}>
            Sayfa Bulunamadı
          </h2>
          <p className={`text-base md:text-lg mb-8 max-w-md mx-auto ${
            theme === "light" ? "text-custom-medium" : "text-custom-lighter"
          }`}>
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </motion.div>

        {/* Home Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        >
          <Link
            href="/"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl ${
              theme === "light"
                ? "bg-custom-accent text-custom-white hover:bg-custom-darkest shadow-lg"
                : "bg-custom-white text-custom-accent hover:bg-custom-lighter shadow-xl"
            }`}
          >
            <FaHome className="text-xl" />
            Ana Sayfaya Dön
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute top-20 left-20 w-32 h-32 rounded-full blur-3xl opacity-20 ${
            theme === "light" ? "bg-custom-accent" : "bg-custom-white"
          }`}
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className={`absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl opacity-20 ${
            theme === "light" ? "bg-custom-medium" : "bg-custom-lighter"
          }`}
        />
      </motion.div>
    </div>
  )
}