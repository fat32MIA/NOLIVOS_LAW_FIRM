"use client"

import { motion } from "framer-motion"

export function AnimatedLogo() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-10 h-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#2563eb' }} />
              <stop offset="100%" style={{ stopColor: '#60a5fa' }} />
            </linearGradient>
          </defs>
          <motion.path
            d="M20 80 L20 20 L50 20 L80 20 L80 80 L50 80 M20 50 L80 50"
            stroke="url(#logoGradient)"
            strokeWidth="8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col"
      >
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          NOLIVOS LAW
        </span>
        <span className="text-xs text-muted-foreground">
          SERVICIOS LEGALES
        </span>
      </motion.div>
    </motion.div>
  )
}