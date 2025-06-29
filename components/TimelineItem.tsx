"use client"

import { motion } from "framer-motion"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLast?: boolean
}

export default function TimelineItem({ year, title, description, isLast = false }: TimelineItemProps) {
  return (
    <motion.div
      className="relative flex items-start group"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ x: 10 }}
    >
      <div className="flex flex-col items-center mr-6">
        <motion.div
          className="w-5 h-5 bg-blue-500 rounded-full border-4 border-black shadow-lg relative z-10"
          whileHover={{
            scale: 1.3,
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
          }}
          transition={{ duration: 0.3 }}
        />
        {!isLast && (
          <motion.div className="w-0.5 h-16 bg-gray-700 mt-2 group-hover:bg-blue-500" transition={{ duration: 0.3 }} />
        )}
      </div>
      <motion.div
        className="pb-8"
        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm font-semibold text-blue-400">{year}</span>
        <h4 className="font-heading text-xl font-semibold text-white mt-1 group-hover:text-blue-300 transition-colors duration-300 tracking-tight">
          {title}
        </h4>
        <p className="font-body text-gray-300 mt-2 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  )
}
