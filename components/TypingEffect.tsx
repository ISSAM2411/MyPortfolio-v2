"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

interface TypingEffectProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  showCursor?: boolean
  cursorChar?: string
  onComplete?: () => void
  loop?: boolean
  pauseDuration?: number
}

export default function TypingEffect({
  text,
  className = "",
  speed = 100,
  delay = 0,
  showCursor = true,
  cursorChar = "|",
  onComplete,
  loop = false,
  pauseDuration = 2000,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCursorState, setShowCursorState] = useState(true)
  const controls = useAnimation()

  // Cursor blinking animation
  useEffect(() => {
    if (!showCursor) return

    const cursorInterval = setInterval(() => {
      setShowCursorState((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [showCursor])

  // Typing animation logic
  useEffect(() => {
    if (!text) return

    const startTyping = () => {
      setIsTyping(true)
      setCurrentIndex(0)
      setDisplayedText("")

      const typeInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= text.length) {
            clearInterval(typeInterval)
            setIsTyping(false)

            // Instead of calling onComplete directly, schedule it for the next tick
            if (onComplete) {
              const timer = setTimeout(() => {
                onComplete()
              }, 0)
              return () => clearTimeout(timer)
            }

            if (loop) {
              setTimeout(() => {
                // Erase text
                const eraseInterval = setInterval(() => {
                  setDisplayedText((prevText) => {
                    const newText = prevText.slice(0, -1)
                    if (newText === "") {
                      clearInterval(eraseInterval)
                      setTimeout(startTyping, 500)
                    }
                    return newText
                  })
                }, speed / 2)
              }, pauseDuration)
            }
            return prevIndex
          }

          setDisplayedText(text.slice(0, prevIndex + 1))
          return prevIndex + 1
        })
      }, speed)

      return () => clearInterval(typeInterval)
    }

    const timer = setTimeout(startTyping, delay)
    return () => clearTimeout(timer)
  }, [text, speed, delay, onComplete, loop, pauseDuration])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayedText}
      {showCursor && (
        <motion.span
          className="inline-block"
          animate={{
            opacity: showCursorState ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
          style={{ color: "inherit" }}
        >
          {cursorChar}
        </motion.span>
      )}
    </motion.span>
  )
}
