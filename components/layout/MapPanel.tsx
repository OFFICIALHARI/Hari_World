"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { WorldMap } from "@/components/map/WorldMap"
import { useNavigationStore, sections, continentNames, continentTaglines, continentLabels } from "@/store/useNavigationStore"
import { Home } from "lucide-react"

interface MapPanelProps {
  className?: string
}

export function MapPanel({ className }: MapPanelProps) {
  const { currentIndex, goToLanding, prev, next } = useNavigationStore()
  const currentSection = sections[currentIndex]
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null

  return (
    <div
      className={cn(
        "relative h-full bg-[#0B0F14] border-r border-[#4FC3F7]/10 overflow-hidden",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0E1A24] via-[#0B0F14] to-[#09131C]" />
      
      {/* Home button */}
      <motion.button
        onClick={goToLanding}
        className="absolute top-4 left-4 z-20 p-2 rounded-full border border-[#4FC3F7]/20 bg-[#0B0F14]/80 hover:border-[#4FC3F7]/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to landing"
      >
        <Home className="w-4 h-4 text-[#4FC3F7]/70" />
      </motion.button>
      
      {/* Continent name and tagline */}
      <div className="absolute top-4 left-14 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-white/90">
              {continentNames[currentSection]}
            </h2>
            <p className="text-xs text-[#4FC3F7]/70 mt-1 tracking-wide">
              {continentTaglines[currentSection]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* World Map */}
      <div className="relative h-full">
        <WorldMap />
      </div>
      
      {/* Navigation hints - Previous/Next */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between text-xs">
          {/* Previous */}
          <motion.button
            onClick={prev}
            disabled={!prevSection}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
              prevSection 
                ? "text-white/50 hover:text-white/80 hover:bg-white/5 cursor-pointer" 
                : "text-white/20 cursor-not-allowed"
            )}
            whileHover={prevSection ? { x: -2 } : {}}
          >
            <span>←</span>
            <span className="hidden sm:inline">
              {prevSection ? continentLabels[prevSection] : ""}
            </span>
          </motion.button>
          
          {/* Section indicator */}
          <div className="flex items-center gap-1.5">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                onClick={() => useNavigationStore.getState().goTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-[#FF3B3B] w-4" 
                    : "bg-white/20 hover:bg-white/40"
                )}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to ${continentLabels[section]}`}
              />
            ))}
          </div>
          
          {/* Next */}
          <motion.button
            onClick={next}
            disabled={!nextSection}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
              nextSection 
                ? "text-white/50 hover:text-white/80 hover:bg-white/5 cursor-pointer" 
                : "text-white/20 cursor-not-allowed"
            )}
            whileHover={nextSection ? { x: 2 } : {}}
          >
            <span className="hidden sm:inline">
              {nextSection ? continentLabels[nextSection] : ""}
            </span>
            <span>→</span>
          </motion.button>
        </div>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-[#4FC3F7]/10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-[#4FC3F7]/10 pointer-events-none" />
    </div>
  )
}
