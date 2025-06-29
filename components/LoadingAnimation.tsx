"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingAnimationProps {
  onComplete: () => void
}

// Animated squares for loading background
const LoadingSquares = () => {
  const squares = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 15,
    delay: Math.random() * 3,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {squares.map((square) => (
        <motion.div
          key={square.id}
          className="absolute border border-blue-400/30 rounded-sm"
          style={{
            left: `${square.x}%`,
            top: `${square.y}%`,
            width: square.size,
            height: square.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.6, 0.1],
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1],
            borderColor: ["rgba(59, 130, 246, 0.3)", "rgba(147, 197, 253, 0.5)", "rgba(59, 130, 246, 0.3)"],
          }}
          transition={{
            duration: 4,
            delay: square.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Animated logo for loading screen
const LoadingLogo = () => {
  const firstName = "ISSAM"
  const letters = Array.from(firstName)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  }

  const letterVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      rotateX: -90,
      scale: 0.5,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 1.5,
      },
    },
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div className="flex perspective-1000" variants={containerVariants} initial="hidden" animate="visible">
        {letters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className="text-white font-bold text-5xl md:text-7xl inline-block"
            variants={letterVariants}
            style={{ transformOrigin: "center bottom" }}
            whileHover={{
              scale: 1.1,
              color: "#3b82f6",
              transition: { duration: 0.2 },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.span
        className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-500 ml-2"
        variants={dotVariants}
        initial="hidden"
        animate="visible"
        animate={{
          scale: [1, 1.2, 1],
          backgroundColor: ["#3b82f6", "#60a5fa", "#3b82f6"],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

// Enhanced progress bar component
const ProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1.5
      })
    }, 40)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-80 md:w-96">
      <div className="flex justify-between text-sm text-gray-300 mb-3">
        <span className="font-medium">Loading Portfolio</span>
        <motion.span key={progress} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="font-bold text-blue-400">
          {progress}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  )
}

// Enhanced loading text animation
const LoadingText = () => {
  const texts = [
    "Initializing Systems...",
    "Loading Experience...",
    "Preparing Projects...",
    "Setting Up Animations...",
    "Almost Ready...",
  ]
  const [currentText, setCurrentText] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 700)

    return () => clearInterval(timer)
  }, [texts.length])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="text-gray-200 text-xl md:text-2xl font-medium"
        key={currentText}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        {texts[currentText]}
      </motion.div>
    </AnimatePresence>
  )
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 1000) // Wait for exit animation
    }, 4000) // Show loading for 4 seconds

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: { duration: 1, ease: "easeInOut" },
          }}
        >
          {/* Enhanced background squares */}
          <LoadingSquares />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center space-y-16">
            {/* Animated logo */}
            <LoadingLogo />

            {/* Enhanced subtitle */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl text-blue-300 font-semibold mb-3">Software Engineer & Developer</h2>
              <p className="text-gray-300 text-base md:text-lg">Welcome to my digital portfolio</p>
            </motion.div>

            {/* Loading text */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.6 }}>
              <LoadingText />
            </motion.div>

            {/* Enhanced progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <ProgressBar />
            </motion.div>
          </div>

          {/* Enhanced decorative elements */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.6 }}
          >
            <div className="flex space-x-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 1, 0.4],
                    backgroundColor: ["#3b82f6", "#60a5fa", "#3b82f6"],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
