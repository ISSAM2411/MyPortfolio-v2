"use client"

import { useState } from "react"
import SplashCursor from "@/components/SplashCursor"
import CustomCursor from "@/components/CustomCursor"
import LoadingAnimation from "@/components/LoadingAnimation"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import ExperienceSection from "@/components/sections/ExperienceSection"
import SkillsSection from "@/components/sections/SkillsSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ContactSection from "@/components/sections/ContactSection"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* <SplashCursor /> */}
      <CustomCursor />
      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}

      {!isLoading && (
        <>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </>
      )}
    </div>
  )
}