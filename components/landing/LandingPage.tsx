"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNavigationStore, sections, continentLabels, continentTaglines } from "@/store/useNavigationStore"
import { HEADER_QUOTE } from "@/lib/constants"
import { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"

// Using Natural Earth 110m land - continent outlines only, no country borders
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json"

// Real geographical coordinates for each continent (lon, lat)
const continentCoordinates: Record<string, [number, number]> = {
  asia: [100, 35],           // Central Asia
  europe: [15, 50],          // Central Europe
  northAmerica: [-100, 45],  // Central North America
  southAmerica: [-60, -15],  // Central South America
  africa: [20, 5],           // Central Africa
  australia: [135, -25],     // Central Australia
  antarctica: [0, -82],      // Antarctica
}

// Floating pin with pulse effect - works with react-simple-maps Marker
function LandingPin({ 
  coordinates, 
  label,
  tagline,
  delay,
  onHover,
  isHovered,
  onClick
}: { 
  coordinates: [number, number]
  label: string
  tagline: string
  delay: number
  onHover: (hovered: boolean) => void
  isHovered: boolean
  onClick: () => void
}) {
  return (
    <Marker coordinates={coordinates}>
      <g
        className="cursor-pointer"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={onClick}
      >
        {/* Pulse rings */}
        <motion.circle
          r={3}
          fill="none"
          stroke="#FF3B3B"
          strokeWidth={0.5}
          initial={{ r: 3, opacity: 0 }}
          animate={{ r: 15, opacity: [0, 0.6, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: delay,
            ease: "easeOut",
          }}
        />
        <motion.circle
          r={3}
          fill="none"
          stroke="#FF3B3B"
          strokeWidth={0.3}
          initial={{ r: 3, opacity: 0 }}
          animate={{ r: 25, opacity: [0, 0.3, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: delay + 0.5,
            ease: "easeOut",
          }}
        />
        
        {/* Pin dot */}
        <motion.circle
          r={isHovered ? 5 : 3}
          fill="#FF3B3B"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay * 0.5, duration: 0.5, ease: "backOut" }}
        />
        
        {/* Glow effect */}
        <motion.circle
          r={6}
          fill="#FF3B3B"
          opacity={0.2}
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ filter: "blur(6px)" }}
        />
        
        {/* Tooltip on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.g
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <rect
                x={-60}
                y={-42}
                width={120}
                height={34}
                rx={5}
                fill="#0B0F14"
                stroke="rgba(79, 195, 247, 0.3)"
                strokeWidth={1}
              />
              <text
                x={0}
                y={-27}
                fill="#F5F5F5"
                fontSize="8"
                fontWeight="600"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {label}
              </text>
              <text
                x={0}
                y={-15}
                fill="#4FC3F7"
                fontSize="5"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {tagline}
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </g>
    </Marker>
  )
}

export function LandingPage() {
  const { startJourney, goTo } = useNavigationStore()
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const handleGetStarted = () => {
    goTo(0)
    startJourney()
  }

  const handlePinClick = (index: number) => {
    goTo(index)
    startJourney()
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0B0F14]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0E1A24] via-[#0B0F14] to-[#09131C]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />
      
      {/* Quote Header - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-6 right-6 z-20"
      >
        <p className="text-sm font-light text-[#4FC3F7]/80 tracking-wide italic font-serif">
          "{HEADER_QUOTE}"
        </p>
      </motion.div>

      {/* World Map Container using react-simple-maps */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="w-[95%] max-w-7xl h-[70vh]">
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{
              scale: 180,
              center: [0, 10],
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            
            {/* Location pins with pulse effect */}
            {sections.map((section, index) => (
              <LandingPin
                key={section}
                coordinates={continentCoordinates[section]}
                label={continentLabels[section]}
                tagline={continentTaglines[section]}
                delay={index * 0.3}
                onHover={(hovered) => setHoveredSection(hovered ? section : null)}
                isHovered={hoveredSection === section}
                onClick={() => handlePinClick(index)}
              />
            ))}
          </ComposableMap>
        </div>
      </motion.div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        {/* Main title */}
        <motion.div
          className="text-center pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className="text-white">Welcome to </span>
            <span className="bg-linear-to-r from-[#4FC3F7] to-[#29B6F6] bg-clip-text text-transparent">
              HARI World
            </span>
          </motion.h1>
          
          <motion.p
            className="mt-6 text-lg md:text-xl text-white/60 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            Explore my journey across continents
          </motion.p>
        </motion.div>

        {/* Get Started button */}
        <motion.button
          onClick={handleGetStarted}
          className="mt-12 pointer-events-auto group relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button glow */}
          <div className="absolute inset-0 bg-[#4FC3F7]/20 rounded-full blur-xl group-hover:bg-[#4FC3F7]/30 transition-all duration-300" />
          
          <div className="relative px-10 py-4 rounded-full border border-[#4FC3F7]/40 bg-[#0B0F14]/80 backdrop-blur-sm group-hover:border-[#4FC3F7]/80 transition-all duration-300">
            <span className="text-lg font-medium text-[#4FC3F7] group-hover:text-white transition-colors">
              Get Started
            </span>
            
            {/* Arrow icon */}
            <motion.span
              className="inline-block ml-3"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </div>
        </motion.button>

        {/* Navigation hint */}
        <motion.p
          className="mt-8 text-xs text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          Hover on pins to preview • Click to explore
        </motion.p>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#4FC3F7]/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
      
      {/* Animated corner accents */}
      <motion.div
        className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-[#4FC3F7]/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-[#4FC3F7]/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
    </div>
  )
}
