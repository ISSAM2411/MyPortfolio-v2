"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { ProjectData } from "@/data/projects"

interface ProjectGalleryViewProps {
  projects: ProjectData[]
  onSelectProject: (project: ProjectData) => void
}

export default function ProjectGalleryView({ projects, onSelectProject }: ProjectGalleryViewProps) {
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null)
  const [expandedProject, setExpandedProject] = useState<ProjectData | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Handle expanding an image
  const handleExpandImage = (project: ProjectData, imageIndex: number) => {
    setExpandedProject(project)
    setExpandedImageIndex(imageIndex)
    setCurrentImageIndex(imageIndex)
  }

  // Handle closing expanded image
  const handleCloseExpanded = () => {
    setExpandedImageIndex(null)
    setExpandedProject(null)
  }

  // Navigate to next image in expanded view
  const nextImage = () => {
    if (!expandedProject) return
    setCurrentImageIndex((prev) => (prev + 1) % expandedProject.images.length)
  }

  // Navigate to previous image in expanded view
  const prevImage = () => {
    if (!expandedProject) return
    setCurrentImageIndex((prev) => (prev - 1 + expandedProject.images.length) % expandedProject.images.length)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (expandedImageIndex === null) return
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") handleCloseExpanded()
  }

  return (
    <div className="w-full" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`cursor-pointer overflow-hidden rounded-xl ${
              index % 5 === 0 || index % 5 === 3 ? "md:col-span-2" : ""
            } ${index % 7 === 0 ? "row-span-2" : ""}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            onClick={() => {
              if (project.images.length > 1) {
                handleExpandImage(project, 0)
              } else {
                onSelectProject(project)
              }
            }}
          >
            <div className="group relative h-full">
              {/* Main image */}
              <img
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover aspect-video transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay with gradient and info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
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
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-gray-600 text-blue-300 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {project.year && <span className="text-sm text-gray-300">{project.year}</span>}
                    <div className="flex gap-2">
                      {project.images.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleExpandImage(project, 0)
                          }}
                        >
                          Voir images
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectProject(project)
                        }}
                      >
                        Voir détails
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category icon */}
              <div className="absolute top-4 left-4 bg-black/50 p-2 rounded-full backdrop-blur-sm">
                <span className="text-xl">
                  {project.category === "Web" && "🌐"}
                  {project.category === "Mobile" && "📱"}
                  {project.category === "Desktop" && "💻"}
                  {project.category === "Platform" && "🚀"}
                </span>
              </div>

              {/* Multiple images indicator */}
              {project.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm text-xs text-white">
                  {project.images.length} images
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded image view */}
      <AnimatePresence>
        {expandedImageIndex !== null && expandedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={handleCloseExpanded}
          >
            <div className="absolute top-4 right-4 z-50">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={handleCloseExpanded}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-50">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-50">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
              <div className="flex gap-2 justify-center">
                {expandedProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? "bg-blue-500 w-4" : "bg-gray-500"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex(idx)
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectProject(expandedProject)
                  }}
                >
                  Voir détails du projet
                </Button>
              </div>
            </div>

            <motion.div
              className="relative max-w-5xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={expandedProject.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${expandedProject.title} - Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-md backdrop-blur-sm text-sm text-white">
                {currentImageIndex + 1} / {expandedProject.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
