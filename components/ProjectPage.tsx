"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import ProjectCarousel from "@/components/ProjectCarousel"

interface ProjectData {
  id: string
  title: string
  description: string
  context?: string
  function: string
  technologies: string[]
  year?: string
  links?: {
    github?: string
    demo?: string
    website?: string
  }
  images: string[]
  category: string
  status: "Completed" | "In Progress" | "Archived"
  teamSize?: number
  duration?: string
  achievements?: string[]
  features?: string[]
  challenges?: string[]
  learnings?: string[]
  metrics?: {
    label: string
    value: number
    unit: string
    color: string
  }[]
}

interface ProjectPageProps {
  project: ProjectData
  onBack: () => void
}

// Interactive metrics component
const ProjectMetrics = ({ metrics }: { metrics: ProjectData["metrics"] }) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>([])

  useEffect(() => {
    if (!metrics) return

    const timer = setTimeout(() => {
      setAnimatedValues(metrics.map((metric) => metric.value))
    }, 500)

    return () => clearTimeout(timer)
  }, [metrics])

  if (!metrics || metrics.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -5 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h4 className="font-heading text-xl font-semibold text-white mb-2 tracking-tight">{metric.label}</h4>
          <div className="text-gray-300 text-lg">
            {animatedValues[index] !== undefined ? animatedValues[index] : metric.value}
            {metric.unit}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function ProjectPage({ project, onBack }: ProjectPageProps) {
  return (
    <motion.div
      className="min-h-screen bg-black text-white py-20 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" className="text-gray-300 hover:text-white" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </motion.div>

        {/* Project Title and Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-5xl font-bold text-white mb-4 tracking-tight">{project.title}</h2>
          <Badge
            className={`${
              project.status === "Completed"
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : project.status === "In Progress"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-gray-500/20 text-gray-400 border-gray-500/30"
            }`}
          >
            {project.status}
          </Badge>
        </motion.div>

        {/* Project Carousel */}
        <ProjectCarousel images={project.images} projectName={project.title} />

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="font-heading text-3xl font-semibold text-white mb-4 tracking-tight">Description</h3>
          <p className="text-gray-300 leading-relaxed text-pretty">{project.description}</p>
        </motion.div>

        {project.context && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="font-heading text-3xl font-semibold text-white mb-4 tracking-tight">Context</h3>
            <p className="text-gray-300 leading-relaxed text-pretty">{project.context}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="font-heading text-3xl font-semibold text-white mb-4 tracking-tight">Function</h3>
          <p className="text-gray-300 leading-relaxed text-pretty">{project.function}</p>
        </motion.div>

        {/* Technologies Used */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="font-heading text-3xl font-semibold text-white mb-4 tracking-tight">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs border-gray-600 text-blue-300 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Project Metrics */}
        {project.metrics && <ProjectMetrics metrics={project.metrics} />}

        {/* Links */}
        {project.links && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="font-heading text-3xl font-semibold text-white mb-4 tracking-tight">Links</h3>
            <div className="flex gap-4">
              {project.links.github && (
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              )}
              {project.links.demo && (
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    Demo
                  </a>
                </Button>
              )}
              {project.links.website && (
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <a href={project.links.website} target="_blank" rel="noopener noreferrer">
                    Website
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
