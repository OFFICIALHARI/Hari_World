"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award } from "lucide-react"

const educationData = [
  {
    degree: "B.E. Computer Science and Engineering",
    institution: "RMK College of Engineering and Technology",
    duration: "2023 – 2027",
    score: "CGPA: 8.62 / 10",
    location: "Chennai, India",
    icon: GraduationCap,
    current: true,
  },
  {
    degree: "Higher Secondary Education (12th Grade)",
    institution: "ISHA VIDHYA SCHOOL - Tamil Nadu State Board",
    duration: "2023",
    score: "87%",
    location: "",
    icon: Award,
    current: false,
  },
]

export function Education() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 md:p-12 max-w-3xl"
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        Education
      </h2>
      <p className="text-white/50 mb-10">
        Academic journey and qualifications
      </p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-[#4FC3F7]/40 via-[#4FC3F7]/20 to-transparent" />

        <div className="space-y-8">
          {educationData.map((edu, index) => {
            const Icon = edu.icon
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                className="relative pl-16 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 flex items-center justify-center">
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center
                      ${edu.current 
                        ? 'bg-[#4FC3F7]/20 border-2 border-[#4FC3F7]/50' 
                        : 'bg-[#0E1A24] border border-[#4FC3F7]/20'
                      }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className={`w-5 h-5 ${edu.current ? 'text-[#4FC3F7]' : 'text-white/50'}`} />
                  </motion.div>
                  {edu.current && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-[#4FC3F7]/20"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Content card */}
                <div className="p-6 rounded-2xl bg-[#0E1A24]/50 border border-[#4FC3F7]/10 hover:border-[#4FC3F7]/30 transition-all group-hover:shadow-[0_0_30px_rgba(79,195,247,0.08)]">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#4FC3F7] transition-colors">
                      {edu.degree}
                    </h3>
                    {edu.current && (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-white/60 mb-3">
                    {edu.institution}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-white/40">{edu.duration}</span>
                    <span className="px-3 py-1 rounded-full bg-[#4FC3F7]/10 text-[#4FC3F7] font-medium">
                      {edu.score}
                    </span>
                  </div>

                  {edu.location && (
                    <p className="text-xs text-white/30 mt-3">{edu.location}</p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
