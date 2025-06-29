"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

interface CursorState {
  isHovering: boolean
  isClicking: boolean
  cursorType: "default" | "hover" | "click" | "text" | "link"
  text?: string
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    cursorType: "default",
  })
  const [isVisible, setIsVisible] = useState(false)

  // Mouse position tracking with smooth spring animation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Cursor dot (follows immediately)
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const dotSpringConfig = { damping: 15, stiffness: 400, mass: 0.1 }
  const dotCursorX = useSpring(dotX, dotSpringConfig)
  const dotCursorY = useSpring(dotY, dotSpringConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }))
    }

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }))
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Add event listeners for interactive elements
    const addHoverListeners = () => {
      // Buttons and links
      const interactiveElements = document.querySelectorAll(
        'button, a, [role="button"], input, textarea, .cursor-pointer',
      )

      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          setCursorState((prev) => ({
            ...prev,
            isHovering: true,
            cursorType: element.tagName.toLowerCase() === "a" ? "link" : "hover",
          }))
        })

        element.addEventListener("mouseleave", () => {
          setCursorState((prev) => ({
            ...prev,
            isHovering: false,
            cursorType: "default",
          }))
        })
      })

      // Text elements
      const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div")
      textElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          if (window.getSelection()?.toString() || element.getAttribute("contenteditable")) {
            setCursorState((prev) => ({
              ...prev,
              cursorType: "text",
            }))
          }
        })

        element.addEventListener("mouseleave", () => {
          setCursorState((prev) => ({
            ...prev,
            cursorType: "default",
          }))
        })
      })

      // Tech cards with special effects
      const techCards = document.querySelectorAll("[data-tech-card]")
      techCards.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          const techName = element.getAttribute("data-tech-name")
          setCursorState((prev) => ({
            ...prev,
            isHovering: true,
            cursorType: "hover",
            text: techName || undefined,
          }))
        })

        element.addEventListener("mouseleave", () => {
          setCursorState((prev) => ({
            ...prev,
            isHovering: false,
            cursorType: "default",
            text: undefined,
          }))
        })
      })
    }

    // Initial setup
    addHoverListeners()

    // Re-run when DOM changes (for dynamic content)
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      observer.disconnect()
    }
  }, [mouseX, mouseY, dotX, dotY])

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none"
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [])

  if (!isVisible) return null

  const getCursorSize = () => {
    switch (cursorState.cursorType) {
      case "hover":
        return cursorState.text ? 80 : 60
      case "click":
        return 40
      case "link":
        return 70
      case "text":
        return 30
      default:
        return cursorState.isClicking ? 40 : 50
    }
  }

  const getCursorColor = () => {
    switch (cursorState.cursorType) {
      case "hover":
        return "rgba(59, 130, 246, 0.3)"
      case "link":
        return "rgba(34, 197, 94, 0.3)"
      case "text":
        return "rgba(168, 85, 247, 0.3)"
      default:
        return "rgba(59, 130, 246, 0.2)"
    }
  }

  const getBorderColor = () => {
    switch (cursorState.cursorType) {
      case "hover":
        return "#3b82f6"
      case "link":
        return "#22c55e"
      case "text":
        return "#a855f7"
      default:
        return "#3b82f6"
    }
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative rounded-full border-2 flex items-center justify-center"
          animate={{
            width: getCursorSize(),
            height: getCursorSize(),
            backgroundColor: getCursorColor(),
            borderColor: getBorderColor(),
            scale: cursorState.isClicking ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Cursor text */}
          {cursorState.text && (
            <motion.span
              className="text-white text-xs font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {cursorState.text}
            </motion.span>
          )}

          {/* Cursor icon based on type */}
          {!cursorState.text && (
            <motion.div
              className="text-white text-lg"
              animate={{
                rotate: cursorState.cursorType === "link" ? 45 : 0,
                scale: cursorState.isClicking ? 0.8 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {cursorState.cursorType === "link" && "↗"}
              {cursorState.cursorType === "text" && "|"}
              {cursorState.cursorType === "hover" && "✦"}
            </motion.div>
          )}

          {/* Animated border particles */}
          {cursorState.isHovering && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8) * (getCursorSize() / 2 + 10),
                    y: Math.sin((i * Math.PI * 2) / 8) * (getCursorSize() / 2 + 10),
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor dot (center point) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotCursorX,
          y: dotCursorY,
        }}
      >
        <motion.div
          className="w-2 h-2 bg-blue-400 rounded-full"
          style={{
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: cursorState.isClicking ? 1.5 : 1,
            backgroundColor: getBorderColor(),
          }}
          transition={{
            type: "spring",
            stiffness: 1000,
            damping: 35,
          }}
        />
      </motion.div>

      {/* Trailing particles */}
      {cursorState.isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
              style={{
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
                opacity: [0.6, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  )
}
