'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Logo from './Logo'

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Splash screen süresini ayarla
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 saniye

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${
            theme === "light" ? "bg-custom-lightest" : "bg-custom-darkest"
          }`}
        >
          <div className="relative">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.8
              }}
              className="flex justify-center mb-6"
            >
              <Logo width={100} height={100} />
            </motion.div>

            {/* Text Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1 className={`text-3xl font-bold mb-2 ${
                theme === "light" ? "text-custom-accent" : "text-custom-white"
              }`}>
                system.conf
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                className={`h-1 rounded-full mx-auto ${
                  theme === "light" ? "bg-custom-accent" : "bg-custom-white"
                }`}
              />
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-2 mt-8"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className={`w-2 h-2 rounded-full ${
                    theme === "light" ? "bg-custom-accent" : "bg-custom-white"
                  }`}
                />
              ))}
            </motion.div>

            {/* Decorative Circles */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: 360
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 10, repeat: Infinity, ease: "linear" }
              }}
              className={`absolute -top-10 -left-10 w-20 h-20 rounded-full blur-2xl opacity-30 ${
                theme === "light" ? "bg-custom-accent" : "bg-custom-white"
              }`}
            />
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: -360
              }}
              transition={{ 
                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                rotate: { duration: 12, repeat: Infinity, ease: "linear" }
              }}
              className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-30 ${
                theme === "light" ? "bg-custom-medium" : "bg-custom-lighter"
              }`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen
