"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedLogoProps {
  className?: string
}

export default function AnimatedLogo({ className }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Split the name into individual letters for animation
  const firstName = "ISSAM"
  const letters = Array.from(firstName)

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // Animation variants for each letter
  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  // Hover animation for each letter
  const letterHoverVariants = {
    hover: (i: number) => ({
      y: [0, -10, 0],
      color: ["#ffffff", "#3b82f6", "#ffffff"],
      transition: {
        y: {
          duration: 0.5,
          delay: i * 0.05,
          ease: "easeInOut",
        },
        color: {
          duration: 0.5,
          delay: i * 0.05,
          ease: "easeInOut",
        },
      },
    }),
  }

  // Animation for the dot
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 0.8,
      },
    },
    hover: {
      scale: [1, 1.5, 1],
      rotate: [0, 180, 360],
      backgroundColor: ["#3b82f6", "#60a5fa", "#3b82f6"],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div
      className={cn("flex items-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex" variants={containerVariants} initial="hidden" animate="visible">
        {letters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className="text-white font-bold text-xl md:text-2xl inline-block font-heading tracking-wider"
            variants={letterVariants}
            animate={isHovered ? "hover" : "visible"}
            custom={i}
            whileHover={letterHoverVariants.hover(i)}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.span
        className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-500 ml-1"
        variants={dotVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      />
    </div>
  )
}
