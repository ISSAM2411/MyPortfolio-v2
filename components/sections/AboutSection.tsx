"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Squares from "@/components/Squares"
import TypingEffect from "@/components/TypingEffect"
import AnimatedTitle from "@/components/AnimatedTitle"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-black relative">
      <Squares
        speed={0.3}
        squareSize={30}
        direction="up"
        borderColor="rgba(148, 163, 184, 0.15)"
        hoverFillColor="rgba(59, 130, 246, 0.08)"
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
            title="About Me"
            className="mb-6"
            titleClassName="font-heading text-5xl font-bold text-white tracking-tight"
            variant="split"
          />
          <div className="w-32 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <TypingEffect
                text="Biography"
                className="font-heading text-3xl font-semibold text-white mb-8 tracking-tight"
                speed={100}
                delay={500}
                showCursor={false}
              />
            </motion.div>

            <motion.p
              className="font-body text-gray-300 leading-loose mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ color: "#e5e7eb" }}
            >
              I'm a passionate software engineer and 4th-year student at the Higher National School of Computer Science
              (ESI). With a strong foundation in both frontend and backend technologies, I specialize in creating
              innovative solutions and leading technical teams.
            </motion.p>

            <motion.p
              className="font-body text-gray-300 leading-loose mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              whileHover={{ color: "#e5e7eb" }}
            >
              Currently serving as President of the CSE Club at ESI, I combine my technical expertise with leadership
              skills to drive innovation and foster collaboration within the tech community.
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg shadow-lg hover:shadow-blue-500/25">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="bg-gray-900 border border-gray-700 rounded-xl aspect-video relative overflow-hidden"
              whileHover={{
                borderColor: "#3b82f6",
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/Me.JPG"
                alt="Profile Photo"
                fill
                className="object-cover"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}