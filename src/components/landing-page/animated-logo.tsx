'use client'

import { motion } from 'framer-motion'

export default function AnimatedLogo() {
  return (
    <motion.div
      className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      nextjs-ui-kit
    </motion.div>
  )
}

