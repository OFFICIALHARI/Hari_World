"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigationStore, sections } from "@/store/useNavigationStore"
import { LandingPage } from "@/components/landing/LandingPage"
import { QuoteHeader } from "./QuoteHeader"
import { MapPanel } from "./MapPanel"
import { ContentPanel } from "./ContentPanel"

// Keyboard navigation hook - single instance in AppShell
function useKeyboardNavigation() {
  const { next, prev, isLanding } = useNavigationStore()
  
  useEffect(() => {
    if (isLanding) return // Don't handle keys on landing page
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key repeat events
      if (e.repeat) return
      
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "j":
          e.preventDefault()
          next()
          break
        case "ArrowLeft":
        case "ArrowUp":
        case "k":
          e.preventDefault()
          prev()
          break
        case "Home":
          e.preventDefault()
          useNavigationStore.getState().goTo(0)
          break
        case "End":
          e.preventDefault()
          useNavigationStore.getState().goTo(sections.length - 1)
          break
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [next, prev, isLanding])
}

export function AppShell() {
  const { isLanding } = useNavigationStore()
  
  // Single keyboard navigation handler
  useKeyboardNavigation()

  return (
    <AnimatePresence mode="wait">
      {isLanding ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-screen flex flex-col bg-[#0B0F14]"
        >
          <QuoteHeader />

          <div className="flex flex-1 overflow-hidden">
            {/* Desktop: Side by side */}
            <div className="hidden md:flex flex-1">
              <MapPanel className="w-[40%]" />
              <ContentPanel className="w-[60%]" />
            </div>

            {/* Mobile: Stacked with collapsible map */}
            <div className="flex md:hidden flex-col flex-1">
              <MapPanel className="h-[35%] border-b border-border/40" />
              <ContentPanel className="h-[65%]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
