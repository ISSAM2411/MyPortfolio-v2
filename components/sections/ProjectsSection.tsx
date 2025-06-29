"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Squares from "@/components/Squares"
import AnimatedTitle from "@/components/AnimatedTitle"
import ProjectPage from "@/components/ProjectPage"
import ProjectGalleryView from "@/components/ProjectGalleryView"
import { projectsData, type ProjectData } from "@/data/projects"
import ProjectImageGallery from "@/components/ProjectImageGallery"

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "gallery">("grid")

  // Show individual project page if a project is selected
  if (selectedProject) {
    return <ProjectPage project={selectedProject} onBack={() => setSelectedProject(null)} />
  }

  // Filter projects based on category and search query
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeFilter === "all" || project.category.toLowerCase() === activeFilter.toLowerCase()
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(projectsData.map((project) => project.category)))]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web":
        return "🌐"
      case "Mobile":
        return "📱"
      case "Desktop":
        return "💻"
      case "Platform":
        return "🚀"
      default:
        return "📁"
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <section id="projects" className="py-20 bg-black relative">
      <Squares
        speed={0.6}
        squareSize={45}
        direction="down"
        borderColor="rgba(148, 163, 184, 0.1)"
        hoverFillColor="rgba(59, 130, 246, 0.05)"
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <AnimatedTitle
            title="📁 Mes Projets"
            subtitle="Découvrez mes projets qui démontrent mon expertise technique et ma passion pour l'innovation"
            className="mb-6"
            titleClassName="font-heading text-5xl font-bold text-white tracking-tight"
            subtitleClassName="text-gray-300 text-xl max-w-3xl mx-auto"
            variant="typing"
            showSubtitleAfterTitle={true}
          />
          <div className="w-32 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        {/* Search and filter controls */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Search input */}
            <motion.div
              className="relative w-full md:w-96"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <input
                type="text"
                placeholder="Rechercher un projet ou une technologie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </motion.div>

            {/* View mode toggle */}
            <motion.div
              className="flex bg-gray-900 rounded-lg border border-gray-700 p-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {[
                {
                  mode: "grid",
                  icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
                  title: "Affichage en grille",
                },
                { mode: "list", icon: "M4 6h16M4 12h16M4 18h16", title: "Affichage en liste" },
                {
                  mode: "gallery",
                  icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
                  title: "Affichage en galerie",
                },
              ].map(({ mode, icon, title }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as "grid" | "list" | "gallery")}
                  className={`p-2 rounded-md transition-all ${viewMode === mode ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                  aria-label={title}
                  title={title}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-2 mt-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {category === "all" ? "Tous" : category}
                {category !== "all" && (
                  <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">
                    {projectsData.filter((p) => p.category === category).length}
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Results count */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-400">
            {filteredProjects.length === 0
              ? "Aucun projet trouvé"
              : `${filteredProjects.length} projet${filteredProjects.length > 1 ? "s" : ""} trouvé${filteredProjects.length > 1 ? "s" : ""}`}
          </p>
        </motion.div>

        {/* Projects display */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Card className="overflow-hidden transition-all duration-300 bg-gray-900 border-gray-700 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 h-full">
                    <div className="relative overflow-hidden group">
                      <ProjectImageGallery images={project.images} projectTitle={project.title} />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge className={getStatusBadgeClass(project.status)}>{project.status}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">{getCategoryIcon(project.category)}</span>
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed flex-grow line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
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
                      <div className="flex justify-between items-center">
                        {project.year && <span className="text-sm text-gray-400">{project.year}</span>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : viewMode === "gallery" ? (
            <ProjectGalleryView projects={filteredProjects} onSelectProject={setSelectedProject} />
          ) : (
            <motion.div
              key="list"
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  className="cursor-pointer rounded-xl p-4"
                  onClick={() => setSelectedProject(project)}
                >
                  <Card className="overflow-hidden transition-all duration-300 bg-gray-900 border-gray-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 relative overflow-hidden rounded-lg">
                          <ProjectImageGallery images={project.images} projectTitle={project.title} />
                        </div>
                        <div className="md:w-3/4 flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{getCategoryIcon(project.category)}</span>
                              <h3 className="text-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                                {project.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusBadgeClass(project.status)}>{project.status}</Badge>
                              {project.year && (
                                <Badge variant="outline" className="border-gray-600 text-gray-300">
                                  {project.year}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4 leading-relaxed line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
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
                          <div className="mt-auto flex justify-end">
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/25"
                            >
                              Voir détails
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-400">Essayez de modifier vos critères de recherche ou de filtrage</p>
            <Button
              className="mt-6 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setActiveFilter("all")
                setSearchQuery("")
              }}
            >
              Réinitialiser les filtres
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
