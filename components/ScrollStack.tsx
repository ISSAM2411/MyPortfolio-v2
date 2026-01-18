"use client"

import { ReactNode, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Lenis from "lenis"

interface ScrollStackProps {
  children: ReactNode
}

interface ScrollStackItemProps {
  children: ReactNode
  index?: number
  total?: number
}

export function ScrollStackItem({ children, index = 0, total = 1 }: ScrollStackItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1, 0.8]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 1, 0]
  )

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [100, 0, -100]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        y,
      }}
      className="sticky top-[10vh] h-[80vh] flex items-center justify-center mb-[20vh]"
    >
      <div className="w-full max-w-4xl mx-auto px-4">
        {children}
      </div>
    </motion.div>
  )
}

export default function ScrollStack({ children }: ScrollStackProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative bg-black min-h-screen py-20">
      {children}
    </div>
  )
}
