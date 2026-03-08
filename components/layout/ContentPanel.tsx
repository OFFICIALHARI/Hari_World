"use client"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useNavigationStore, sections, continentLabels } from "@/store/useNavigationStore"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Education } from "@/components/sections/Education"
import { Achievements } from "@/components/sections/Achievements"
import { Certifications } from "@/components/sections/Certifications"
import { Connect } from "@/components/sections/Connect"

interface ContentPanelProps {
  className?: string
}

function SectionContent({ section }: { section: string }) {
  switch (section) {
    case "asia":
      return <About />
    case "europe":
      return <Skills />
    case "northAmerica":
      return <Projects />
    case "southAmerica":
      return <Education />
    case "africa":
      return <Achievements />
    case "australia":
      return <Certifications />
    case "antarctica":
      return <Connect />
    default:
      return <About />
  }
}

export function ContentPanel({ className }: ContentPanelProps) {
  const { currentIndex } = useNavigationStore()
  const currentSection = sections[currentIndex]
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full bg-[#0B0F14] overflow-hidden",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-bl from-[#0E1A24] via-[#0B0F14] to-[#09131C]" />
      
      {/* Section label */}
      <div className="absolute top-4 left-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-mono text-[#4FC3F7]/50">
              {String(currentIndex + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
            </span>
            <span className="w-8 h-px bg-[#4FC3F7]/30" />
            <span className="text-sm font-medium uppercase tracking-widest text-white/60">
              {continentLabels[currentSection]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Scrollable content area */}
      <div className="relative h-full pt-12 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="pb-8"
          >
            <SectionContent section={currentSection} />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation hint at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-white/30">
        <span>←→</span>
        <span>Arrow keys to navigate</span>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#4FC3F7]/5 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#4FC3F7]/5 pointer-events-none" />
    </div>
  )
}
