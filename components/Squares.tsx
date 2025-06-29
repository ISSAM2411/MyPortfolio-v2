"use client"

import { useEffect, useRef } from "react"

interface SquaresProps {
  speed?: number
  squareSize?: number
  direction?: "up" | "down" | "left" | "right" | "diagonal"
  borderColor?: string
  hoverFillColor?: string
}

export default function Squares({
  speed = 0.5,
  squareSize = 40,
  direction = "diagonal",
  borderColor = "#fff",
  hoverFillColor = "#222",
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const squares: Array<{
      x: number
      y: number
      vx: number
      vy: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const getVelocity = () => {
      switch (direction) {
        case "up":
          return { vx: 0, vy: -speed }
        case "down":
          return { vx: 0, vy: speed }
        case "left":
          return { vx: -speed, vy: 0 }
        case "right":
          return { vx: speed, vy: 0 }
        case "diagonal":
        default:
          return { vx: speed * 0.7, vy: -speed * 0.7 }
      }
    }

    const createSquare = () => {
      const { vx, vy } = getVelocity()
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx,
        vy,
        opacity: Math.random() * 0.5 + 0.1,
      }
    }

    const initSquares = () => {
      const numSquares = Math.floor((canvas.width * canvas.height) / (squareSize * squareSize * 100))
      squares.length = 0
      for (let i = 0; i < numSquares; i++) {
        squares.push(createSquare())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      squares.forEach((square, index) => {
        // Update position
        square.x += square.vx
        square.y += square.vy

        // Reset square if it goes off screen
        if (
          square.x < -squareSize ||
          square.x > canvas.width + squareSize ||
          square.y < -squareSize ||
          square.y > canvas.height + squareSize
        ) {
          squares[index] = createSquare()
          // Start from appropriate edge based on direction
          if (direction === "up") {
            squares[index].y = canvas.height + squareSize
          } else if (direction === "down") {
            squares[index].y = -squareSize
          } else if (direction === "left") {
            squares[index].x = canvas.width + squareSize
          } else if (direction === "right") {
            squares[index].x = -squareSize
          } else {
            squares[index].x = -squareSize
            squares[index].y = canvas.height + squareSize
          }
        }

        // Draw square
        ctx.save()
        ctx.globalAlpha = square.opacity
        ctx.strokeStyle = borderColor
        ctx.lineWidth = 1
        ctx.strokeRect(square.x, square.y, squareSize, squareSize)
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      squares.forEach((square) => {
        const dx = mouseX - (square.x + squareSize / 2)
        const dy = mouseY - (square.y + squareSize / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < squareSize * 2) {
          ctx.save()
          ctx.fillStyle = hoverFillColor
          ctx.globalAlpha = 0.3
          ctx.fillRect(square.x, square.y, squareSize, squareSize)
          ctx.restore()
        }
      })
    }

    resizeCanvas()
    initSquares()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initSquares()
    })
    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [speed, squareSize, direction, borderColor, hoverFillColor])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
