'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const PageTransition = ({ children }) => {
  const pathname = usePathname()

  const variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    enter: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1]
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.61, 1, 0.88, 1]
      }
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
