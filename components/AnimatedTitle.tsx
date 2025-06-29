"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import TypingEffect from "./TypingEffect"

interface AnimatedTitleProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  showSubtitleAfterTitle?: boolean
  variant?: "typing" | "reveal" | "split"
}

export default function AnimatedTitle({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  showSubtitleAfterTitle = true,
  variant = "typing",
}: AnimatedTitleProps) {
  const [titleComplete, setTitleComplete] = useState(false)

  // Handle title completion in a safe way
  const handleTitleComplete = () => {
    // Use setTimeout to ensure this doesn't happen during rendering
    setTimeout(() => {
      setTitleComplete(true)
    }, 0)
  }

  if (variant === "typing") {
    return (
      <div className={className}>
        <TypingEffect
          text={title}
          className={titleClassName}
          speed={100}
          showCursor={!subtitle || !showSubtitleAfterTitle}
          onComplete={handleTitleComplete}
        />
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: showSubtitleAfterTitle ? (titleComplete ? 1 : 0) : 1,
              y: showSubtitleAfterTitle ? (titleComplete ? 0 : 20) : 0,
            }}
            transition={{ duration: 0.5, delay: showSubtitleAfterTitle ? 0 : 0.5 }}
          >
            {showSubtitleAfterTitle && titleComplete ? (
              <TypingEffect text={subtitle} className={subtitleClassName} speed={80} delay={300} showCursor={true} />
            ) : (
              <span className={subtitleClassName}>{subtitle}</span>
            )}
          </motion.div>
        )}
      </div>
    )
  }

  if (variant === "reveal") {
    return (
      <div className={className}>
        <motion.h1
          className={titleClassName}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={subtitleClassName}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    )
  }

  if (variant === "split") {
    const words = title.split(" ")
    return (
      <div className={className}>
        <motion.h1 className={titleClassName}>
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={subtitleClassName}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: words.length * 0.1 + 0.3 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    )
  }

  return null
}
