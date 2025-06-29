"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import TypingEffect from "./TypingEffect"

interface MultiLineTypingEffectProps {
  lines: string[]
  className?: string
  lineClassName?: string
  speed?: number
  lineDelay?: number
  showCursor?: boolean
  onComplete?: () => void
}

export default function MultiLineTypingEffect({
  lines,
  className = "",
  lineClassName = "",
  speed = 80,
  lineDelay = 500,
  showCursor = true,
  onComplete,
}: MultiLineTypingEffectProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [completedLines, setCompletedLines] = useState<number[]>([])

  const handleLineComplete = (lineIndex: number) => {
    // Use setTimeout to ensure this doesn't happen during rendering
    setTimeout(() => {
      setCompletedLines((prev) => [...prev, lineIndex])

      if (lineIndex < lines.length - 1) {
        setTimeout(() => {
          setCurrentLineIndex(lineIndex + 1)
        }, lineDelay)
      } else if (onComplete) {
        onComplete()
      }
    }, 0)
  }

  useEffect(() => {
    setCurrentLineIndex(0)
    setCompletedLines([])
  }, [lines])

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          className={lineClassName}
          initial={{ opacity: 0 }}
          animate={{ opacity: index <= currentLineIndex ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          {index < currentLineIndex ? (
            <span>{line}</span>
          ) : index === currentLineIndex ? (
            <TypingEffect
              text={line}
              speed={speed}
              showCursor={showCursor && index === lines.length - 1}
              onComplete={() => handleLineComplete(index)}
            />
          ) : (
            <span className="opacity-30">{line}</span>
          )}
        </motion.div>
      ))}
    </div>
  )
}
