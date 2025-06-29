"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface TechItem {
  name: string
  icon: string
  color: string
  description: string
}

const technologies: TechItem[] = [
  { name: "React", icon: "/techsLogos/react-2.svg", color: "#61DAFB", description: "Frontend Library" },
  {
    name: "Next.js",
    icon: "/techsLogos/nextjs-icon-svgrepo-com.svg",
    color: "#000000",
    description: "React Framework",
  },
  { name: "Angular", icon: "/techsLogos/angular-icon.svg", color: "#DD0031", description: "Frontend Framework" },
  { name: "Python", icon: "/techsLogos/python-5.svg", color: "#3776AB", description: "Programming Language" },
  { name: "JavaScript", icon: "/techsLogos/javascript-1.svg", color: "#F7DF1E", description: "Programming Language" },
  { name: "TypeScript", icon: "/techsLogos/typescript.svg", color: "#3178C6", description: "Typed JavaScript" },
  { name: "Node.js", icon: "/techsLogos/nodejs-1.svg", color: "#339933", description: "Runtime Environment" },
  { name: "Flutter", icon: "/techsLogos/flutter.svg", color: "#02569B", description: "Mobile Framework" },
  { name: "Firebase", icon: "/techsLogos/firebase-1.svg", color: "#FFCA28", description: "Backend Platform" },
  { name: "GraphQL", icon: "/techsLogos/graphql-logo-2.svg", color: "#E10098", description: "Query Language" },
  { name: "Java", icon: "/techsLogos/java-4.svg", color: "#ED8B00", description: "Programming Language" },
  { name: "GitHub", icon: "/techsLogos/github-icon-1.svg", color: "#181717", description: "Version Control" },
  { name: "Spring Boot", icon: "/techsLogos/springboot.svg", color: "#6DB33F", description: "Java Framework" },
]

interface TechLogosProps {
  className?: string
}

export default function TechLogos({ className }: TechLogosProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      className={`flex flex-wrap justify-center gap-4 md:gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="relative group cursor-pointer"
          variants={itemVariants}
          whileHover={{
            scale: 1.15,
            y: -8,
            transition: { duration: 0.3 },
          }}
          onHoverStart={() => setHoveredTech(tech.name)}
          onHoverEnd={() => setHoveredTech(null)}
          data-tech-card="true"
          data-tech-name={tech.name}
        >
          <motion.div
            className="relative bg-gray-900 border border-gray-700 rounded-xl p-4 md:p-6 overflow-hidden"
            style={{
              background: hoveredTech === tech.name ? `linear-gradient(135deg, ${tech.color}15, transparent)` : "",
              borderColor: hoveredTech === tech.name ? tech.color : "",
            }}
            animate={{
              borderColor: hoveredTech === tech.name ? tech.color : "#374151",
              boxShadow:
                hoveredTech === tech.name
                  ? `0 0 30px ${tech.color}40, 0 0 60px ${tech.color}20`
                  : "0 0 0px transparent",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at center, ${tech.color}10, transparent 70%)`,
              }}
              animate={{
                scale: hoveredTech === tech.name ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Tech icon */}
            <motion.div
              className="text-3xl md:text-4xl mb-2 relative z-10 flex items-center justify-center"
              animate={{
                rotate: hoveredTech === tech.name ? [0, 10, -10, 0] : 0,
                scale: hoveredTech === tech.name ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={tech.icon || "/placeholder.svg"}
                alt={`${tech.name} logo`}
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
                style={{
                  filter:
                    hoveredTech === tech.name
                      ? `brightness(1.2) drop-shadow(0 0 8px ${tech.color}60)`
                      : tech.name === "Next.js" || tech.name === "GitHub"
                        ? "brightness(0) invert(1)"
                        : "none",
                }}
              />
            </motion.div>

            {/* Tech name */}
            <motion.h3
              className="text-white font-semibold text-sm md:text-base mb-1 relative z-10"
              animate={{
                color: hoveredTech === tech.name ? tech.color : "#ffffff",
              }}
              transition={{ duration: 0.3 }}
            >
              {tech.name}
            </motion.h3>

            {/* Tech description */}
            <motion.p
              className="text-gray-400 text-xs md:text-sm relative z-10"
              animate={{
                color: hoveredTech === tech.name ? "#e5e7eb" : "#9ca3af",
              }}
              transition={{ duration: 0.3 }}
            >
              {tech.description}
            </motion.p>

            {/* Floating particles effect */}
            {hoveredTech === tech.name && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{ backgroundColor: tech.color }}
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 0,
                    }}
                    animate={{
                      x: `${50 + (Math.random() - 0.5) * 100}%`,
                      y: `${50 + (Math.random() - 0.5) * 100}%`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
