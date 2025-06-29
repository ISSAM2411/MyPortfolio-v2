"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Mail, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Squares from "@/components/Squares"
import BlurText from "@/components/BlurText"
import TrueFocus from "@/components/TrueFocus" 

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [nameComplete, setNameComplete] = useState(false)
  const [titleComplete, setTitleComplete] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle TrueFocus animation timing
  React.useEffect(() => {
    // Set a timeout to trigger the next animation after TrueFocus completes its cycle
    const timer = setTimeout(() => {
      setNameComplete(true)
    }, 4000) // Adjust timing based on your TrueFocus animation duration

    return () => clearTimeout(timer)
  }, [])

  // Handle BlurText animation completion
  const handleTitleAnimationComplete = () => {
    setTitleComplete(true)
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      <Squares
        speed={0.6}
        squareSize={45}
        direction="diagonal"
        borderColor="rgba(59, 130, 246, 0.4)"
        hoverFillColor="rgba(59, 130, 246, 0.15)"
      />

      {/* Interactive background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* TrueFocus Name Animation */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="font-heading font-bold text-white tracking-tighter">
              <TrueFocus 
                sentence="BOUSSEBATA ISSAM"
                manualMode={false}
                blurAmount={8}
                borderColor="rgba(59, 130, 246, 0.8)"
                glowColor="rgba(59, 130, 246, 0.6)"
                animationDuration={1.5}
                pauseBetweenAnimations={0.8}
              />
            </div>
          </motion.div>

          {/* Animated Title with BlurText */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: nameComplete ? 1 : 0.3,
              y: nameComplete ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: nameComplete ? 0 : 0.6 }}
          >
            {nameComplete && (
              <div className="flex justify-center">
                <BlurText
                text="Software Engineer & Full-Stack Developer"
                delay={80}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleTitleAnimationComplete}
                className="font-heading text-2xl md:text-3xl text-blue-400 font-semibold tracking-tight"
              />
              </div>
            )}
          </motion.div>

          {/* Description */}
          <motion.p
            className="font-body text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-loose"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: titleComplete ? 1 : 0,
              y: titleComplete ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: titleComplete ? 0.3 : 0 }}
          >
            4th Year Student at Higher National School of Computer Science | President of CSE Club | Frontend Developer
            at Ourquilane
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: titleComplete ? 1 : 0,
              y: titleComplete ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: titleComplete ? 0.6 : 0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: titleComplete ? 1 : 0,
                x: titleComplete ? 0 : -20,
              }}
              transition={{ duration: 0.5, delay: titleComplete ? 0.8 : 0 }}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: titleComplete ? 1 : 0,
                x: titleComplete ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: titleComplete ? 1.0 : 0 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
                onClick={() => scrollToSection("projects")}
              >
                <MousePointer2 className="mr-2 h-5 w-5" />
                View Projects
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: titleComplete ? 1 : 0,
            y: titleComplete ? [0, 15, 0] : 0,
          }}
          transition={{
            opacity: { delay: titleComplete ? 1.4 : 0, duration: 0.5 },
            y: {
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: titleComplete ? 1.4 : 0,
            },
          }}
        >
          <ArrowDown className="h-8 w-8 text-blue-400" />
        </motion.div>
      </div>
    </section>
  )
}