"use client"

import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion"
import { useNavigationStore, sections, continentLabels } from "@/store/useNavigationStore"
import { useEffect, useState, memo, useMemo } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
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
  antarctica: [0, -75],      // Antarctica
}

// Cinematic zoom views
const continentViews: Record<string, { center: [number, number]; zoom: number }> = {
  asia: { center: [100, 35], zoom: 2.5 },
  europe: { center: [15, 50], zoom: 4 },
  northAmerica: { center: [-100, 45], zoom: 2.8 },
  southAmerica: { center: [-60, -15], zoom: 2.5 },
  africa: { center: [20, 5], zoom: 2.5 },
  australia: { center: [135, -25], zoom: 3.5 },
  antarctica: { center: [0, -75], zoom: 1.8 },
}

// Default view showing whole world
const defaultView = { center: [0, 20] as [number, number], zoom: 1 }

// Continent highlight sizes (radius in degrees roughly)
const continentHighlightSize: Record<string, number> = {
  asia: 40,
  europe: 18,
  northAmerica: 30,
  southAmerica: 25,
  africa: 30,
  australia: 22,
  antarctica: 35,
}

// Continent highlight component - animated glowing area for active continent
const ContinentHighlight = memo(function ContinentHighlight({
  coordinates,
  isActive,
  size,
  id,
}: {
  coordinates: [number, number]
  isActive: boolean
  size: number
  id: string
}) {
  if (!isActive) return null
  
  return (
    <Marker coordinates={coordinates}>
      <defs>
        <radialGradient id={`continentGlow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#4FC3F7" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#29B6F6" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#29B6F6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Outer pulsing ring */}
      <motion.circle
        r={size * 1.2}
        fill="none"
        stroke="#4FC3F7"
        strokeWidth={0.8}
        strokeOpacity={0.4}
        strokeDasharray="8 4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Main glow fill */}
      <motion.circle
        r={size}
        fill={`url(#continentGlow-${id})`}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      
      {/* Inner bright ring */}
      <motion.circle
        r={size * 0.85}
        fill="none"
        stroke="#4FC3F7"
        strokeWidth={1.5}
        strokeOpacity={0.6}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      />
      
      {/* Rotating highlight accent */}
      <motion.circle
        r={size * 0.7}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={0.5}
        strokeOpacity={0.2}
        strokeDasharray="2 10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </Marker>
  )
})

// Pulsing pin component with label
const LocationPin = memo(function LocationPin({ 
  coordinates, 
  isActive, 
  onClick,
  label,
  displayLabel
}: { 
  coordinates: [number, number]
  isActive: boolean
  onClick: () => void
  label: string
  displayLabel: string
}) {
  return (
    <Marker coordinates={coordinates}>
      <g 
        className="cursor-pointer" 
        onClick={onClick}
        role="button"
        aria-label={`Navigate to ${label}`}
      >
        {/* Pulse rings - only shows on active */}
        {isActive && (
          <>
            <motion.circle
              r={6}
              fill="none"
              stroke="#FF3B3B"
              strokeWidth={0.8}
              initial={{ r: 6, opacity: 0 }}
              animate={{ r: 20, opacity: [0, 0.7, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.circle
              r={6}
              fill="none"
              stroke="#FF3B3B"
              strokeWidth={0.5}
              initial={{ r: 6, opacity: 0 }}
              animate={{ r: 30, opacity: [0, 0.4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
                ease: "easeOut",
              }}
            />
          </>
        )}
        
        {/* Outer glow */}
        <motion.circle
          r={isActive ? 10 : 7}
          fill={isActive ? "rgba(255, 59, 59, 0.25)" : "rgba(255, 59, 59, 0.1)"}
          initial={false}
          whileHover={{ r: 12, fill: "rgba(255, 59, 59, 0.2)" }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Pin dot - Red toggle style - BIGGER */}
        <motion.circle
          r={isActive ? 6 : 4}
          fill={isActive ? "#FF3B3B" : "rgba(255, 100, 100, 0.7)"}
          stroke={isActive ? "#FF6B6B" : "rgba(255, 255, 255, 0.3)"}
          strokeWidth={isActive ? 1 : 0.5}
          initial={false}
          animate={{ 
            r: isActive ? 6 : 4,
          }}
          whileHover={{ 
            scale: 1.3,
            fill: "#FF3B3B",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        
        {/* Label text */}
        <text
          x={12}
          y={4}
          fill={isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)"}
          fontSize={isActive ? 8 : 6}
          fontWeight={isActive ? 600 : 400}
          fontFamily="Inter, sans-serif"
          style={{
            textShadow: isActive ? "0 0 10px rgba(79, 195, 247, 0.5)" : "none",
          }}
        >
          {displayLabel}
        </text>
      </g>
    </Marker>
  )
})

// Travel line between locations
function TravelLine({ 
  from, 
  to, 
  isVisible 
}: { 
  from: [number, number]
  to: [number, number]
  isVisible: boolean
}) {
  if (!isVisible) return null
  
  return (
    <Line
      from={from}
      to={to}
      stroke="#4FC3F7"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeDasharray="4 4"
      style={{
        opacity: 0.5,
      }}
    />
  )
}

export function WorldMap() {
  const { currentIndex, goTo } = useNavigationStore()
  const currentSection = sections[currentIndex]
  const view = continentViews[currentSection] || defaultView
  
  // Track previous index for travel line
  const [prevIndex, setPrevIndex] = useState(currentIndex)
  const [showTravelLine, setShowTravelLine] = useState(false)
  
  // Animated view state for smooth transitions
  const [animatedCenter, setAnimatedCenter] = useState<[number, number]>(view.center)
  const [animatedZoom, setAnimatedZoom] = useState(view.zoom)
  
  useEffect(() => {
    if (prevIndex !== currentIndex) {
      setShowTravelLine(true)
      const timer = setTimeout(() => {
        setShowTravelLine(false)
        setPrevIndex(currentIndex)
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, prevIndex])
  
  // Animate view changes
  useEffect(() => {
    setAnimatedCenter(view.center)
    setAnimatedZoom(view.zoom)
  }, [view.center, view.zoom])

  const prevSection = sections[prevIndex]
  const fromCoords = continentCoordinates[prevSection]
  const toCoords = continentCoordinates[currentSection]

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{
            scale: 160,
            center: [0, 0],
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ZoomableGroup
            center={animatedCenter}
            zoom={animatedZoom}
            minZoom={1}
            maxZoom={8}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth={0.3}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", stroke: "rgba(79, 195, 247, 0.4)" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            
            {/* Travel line */}
            <AnimatePresence>
              {showTravelLine && prevIndex !== currentIndex && (
                <TravelLine 
                  from={fromCoords} 
                  to={toCoords} 
                  isVisible={showTravelLine} 
                />
              )}
            </AnimatePresence>
            
            {/* Continent highlights - render first so they're behind pins */}
            {sections.map((section) => (
              <ContinentHighlight
                key={`highlight-${section}`}
                coordinates={continentCoordinates[section]}
                isActive={currentSection === section}
                size={continentHighlightSize[section]}
                id={section}
              />
            ))}
            
            {/* Location pins */}
            {sections.map((section, index) => (
              <LocationPin
                key={section}
                coordinates={continentCoordinates[section]}
                isActive={currentSection === section}
                onClick={() => goTo(index)}
                label={section}
                displayLabel={continentLabels[section]}
              />
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </motion.div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-[#4FC3F7]/3 to-transparent" />
      </div>
    </div>
  )
}
