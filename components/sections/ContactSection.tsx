"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Squares from "@/components/Squares"
import AnimatedTitle from "@/components/AnimatedTitle"
import TypingEffect from "@/components/TypingEffect"

export default function ContactSection() {
  const contactItems = [
    { icon: Mail, text: "issam.boussebata@example.com", color: "#3b82f6" },
    { icon: Github, text: "github.com/issamboussebata", color: "#6b7280" },
    { icon: Linkedin, text: "linkedin.com/in/issamboussebata", color: "#0077b5" },
  ]

  return (
    <section id="contact" className="py-20 bg-black relative">
      <Squares
        speed={0.3}
        squareSize={50}
        direction="diagonal"
        borderColor="rgba(148, 163, 184, 0.12)"
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
            title="Get In Touch"
            subtitle="Ready to collaborate? Let's discuss your next project or just have a chat about technology"
            className="mb-6"
            titleClassName="font-heading text-5xl font-bold text-white tracking-tight"
            subtitleClassName="font-body text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            variant="split"
          />
          <div className="w-32 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
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
                text="Let's Connect"
                className="font-heading text-3xl font-semibold text-white mb-8 tracking-tight"
                speed={100}
                delay={500}
                showCursor={false}
              />
            </motion.div>

            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-gray-300 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, color: item.color }}
                >
                  <motion.div whileHover={{ scale: 1.2, color: item.color }} transition={{ duration: 0.3 }}>
                    <item.icon className="h-6 w-6 mr-4 text-blue-400 group-hover:text-current" />
                  </motion.div>
                  <span className="text-lg group-hover:text-current">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all duration-300"
                    ></textarea>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold shadow-lg hover:shadow-blue-500/25">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
