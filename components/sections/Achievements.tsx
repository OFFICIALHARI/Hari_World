"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, Code, Rocket } from "lucide-react"

const achievementsData = [
  {
    title: "Participated in multiple hackathons & corporate events",
    icon: Rocket,
    color: "#9C27B0",
  },
  {
    title: "Internal SIH Hackathon Selected",
    icon: Trophy,
    color: "#FFD700",
  },
  {
    title: "Ranked Top-10 in CSE Department",
    icon: Medal,
    color: "#C0C0C0",
  },
  {
    title: "3rd Place — National Science Day Hackathon (2024)",
    icon: Medal,
    color: "#CD7F32",
  },
  {
    title: "Solved 300+ Data Structures & Algorithms problems",
    icon: Code,
    color: "#4FC3F7",
  },
  {
    title: "Built multiple production-style full-stack applications",
    icon: Rocket,
    color: "#FF3B3B",
  },
]

export function Achievements() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 md:p-12 max-w-3xl"
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        Achievements
      </h2>
      <p className="text-white/50 mb-10">
        Milestones and recognitions
      </p>

      <div className="grid gap-4">
        {achievementsData.map((achievement, index) => {
          const Icon = achievement.icon
          return (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ x: 10 }}
              className="group flex items-center gap-5 p-5 rounded-2xl 
                bg-linear-to-r from-[#0E1A24]/80 to-transparent
                border border-[#4FC3F7]/10 hover:border-[#4FC3F7]/30 
                transition-all duration-300 cursor-default"
            >
              {/* Icon with glow */}
              <div className="relative shrink-0">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${achievement.color}15` }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: achievement.color }}
                  />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: achievement.color }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-white/80 group-hover:text-white transition-colors">
                  {achievement.title}
                </p>
              </div>

              {/* Number badge */}
              <div className="shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <span className="text-sm font-mono text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Stats summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 p-6 rounded-2xl bg-[#0E1A24]/30 border border-[#4FC3F7]/10"
      >
        <p className="text-center text-white/40 text-sm">
          Continuously striving for excellence and growth
        </p>
      </motion.div>
    </motion.div>
  )
}
