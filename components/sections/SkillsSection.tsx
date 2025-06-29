"use client"

import { motion } from "framer-motion"
import Squares from "@/components/Squares"
import AnimatedTitle from "@/components/AnimatedTitle"
import TechLogos from "@/components/TechLogos"

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-black relative">
      <Squares
        speed={0.2}
        squareSize={25}
        direction="left"
        borderColor="rgba(148, 163, 184, 0.12)"
        hoverFillColor="rgba(59, 130, 246, 0.06)"
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
            title="Skills & Technologies"
            subtitle="Explore my technical expertise through interactive technology cards"
            className="mb-6"
            titleClassName="font-heading text-5xl font-bold text-white tracking-tight"
            subtitleClassName="text-gray-300 text-xl max-w-3xl mx-auto"
            variant="typing"
            showSubtitleAfterTitle={true}
          />
          <div className="w-32 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <TechLogos />
      </div>
    </section>
  )
}
