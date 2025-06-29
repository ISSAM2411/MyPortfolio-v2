"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface CodeTypingEffectProps {
  code: string[]
  className?: string
  speed?: number
  delay?: number
  showLineNumbers?: boolean
  language?: string
}

export default function CodeTypingEffect({
  code,
  className = "",
  speed = 50,
  delay = 0,
  showLineNumbers = true,
  language = "javascript",
}: CodeTypingEffectProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [displayedCode, setDisplayedCode] = useState<string[]>([])

  useEffect(() => {
    if (currentLineIndex >= code.length) return

    const timer = setTimeout(() => {
      const currentLine = code[currentLineIndex]

      if (currentCharIndex < currentLine.length) {
        setDisplayedCode((prev) => {
          const newCode = [...prev]
          newCode[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
          return newCode
        })
        setCurrentCharIndex((prev) => prev + 1)
      } else {
        // Move to next line
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
        setDisplayedCode((prev) => [...prev, ""])
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentLineIndex, currentCharIndex, code, speed])

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setDisplayedCode([""])
      setCurrentLineIndex(0)
      setCurrentCharIndex(0)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  return (
    <motion.div
      className={`bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <div className="flex items-center mb-3 pb-2 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="ml-4 text-gray-400 text-xs">{language}</span>
      </div>

      <div className="space-y-1">
        {displayedCode.map((line, index) => (
          <motion.div
            key={index}
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {showLineNumbers && <span className="text-gray-500 mr-4 select-none w-6 text-right">{index + 1}</span>}
            <span className="text-green-400">
              {line}
              {index === currentLineIndex && (
                <motion.span
                  className="bg-green-400 w-2 h-5 inline-block ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
