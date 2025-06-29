"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Squares from "@/components/Squares"
import AnimatedTitle from "@/components/AnimatedTitle"
import TimelineItem from "@/components/TimelineItem"

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState("education")

  const tabs = [
    { id: "education", label: "Education", icon: "🎓" },
    { id: "activities", label: "Activities", icon: "🏆" },
    { id: "work", label: "Work Experience", icon: "💼" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "education":
        return (
          <motion.div
            key="education"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TimelineItem year="2020/2021" title="Baccalauréat" description="Graduated with 18.41 average" />
            <TimelineItem
              year="2021/2022"
              title="1CP - ESI"
              description="First year preparatory class at Higher National School of Computer Science"
            />
            <TimelineItem year="2022/2023" title="2CP - ESI" description="Second year preparatory class" />
            <TimelineItem year="2023/2024" title="1CS - ESI" description="First year superior cycle" />
            <TimelineItem
              year="2024/2025"
              title="2CS - ESI"
              description="Second year superior cycle - Information Systems & Technologies specialization"
              isLast={true}
            />
          </motion.div>
        )
      case "activities":
        return (
          <motion.div
            key="activities"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TimelineItem
              year="2022/2023"
              title="CSE Club Member"
              description="Joined the Scientific Club of ESI (Club Scientifique de l'ESI)"
            />
            <TimelineItem
              year="2023/2024"
              title="Dev Assistant & Marketing Manager"
              description="Development Assistant at CSE Club and Marketing Manager at SEC Club"
            />
            <TimelineItem
              year="2024/2025"
              title="CSE Club President"
              description="Currently serving as President of the Scientific Club of ESI"
              isLast={true}
            />
          </motion.div>
        )
      case "work":
        return (
          <motion.div
            key="work"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TimelineItem
              year="Jul-Sep 2024"
              title="Internship at Ourquilane"
              description="3-month internship as Frontend Developer"
            />
            <TimelineItem
              year="Nov 2024 - Present"
              title="Frontend Developer"
              description="Currently working as Frontend Developer at Ourquilane"
              isLast={true}
            />
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <section id="experience" className="py-20 bg-black relative">
      <Squares
        speed={0.4}
        squareSize={35}
        direction="right"
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
            title="Experience"
            className="mb-6"
            titleClassName="font-heading text-5xl font-bold text-white tracking-tight"
            variant="reveal"
          />
          <div className="w-32 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex bg-gray-900 rounded-xl p-2 border border-gray-700">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gray-900/50 rounded-xl p-8 border border-gray-700"
            whileHover={{
              borderColor: "#3b82f6",
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
