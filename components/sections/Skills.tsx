"use client"

import { motion } from "framer-motion"

const skillsData = {
  programming: ["Java", "C++", "JavaScript", "C", "TypeScript", "Python"],

  backend: [
    "Spring Boot",
    "REST APIs",
    "JWT Authentication",
    "MVC Architecture",
    "Node.js",
    "Express.js",
  ],

  frontend: ["React", "Next.js", "Tailwind CSS","Framer Motion"],

  databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],

  tools: ["Git", "Docker", "Maven", "Postman", "GitHub", "VS Code", "IntelliJ IDEA"],

  concepts: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Operating Systems",
    "Database Design",
    "System Design",
    "RESTful API Design",
  ],
}

const categoryLabels: Record<string, string> = {
  programming: "Programming Languages",
  backend: "Backend Technologies",
  frontend: "Frontend Development",
  databases: "Databases",
  tools: "Tools & DevOps",
  concepts: "Core Concepts",
}

const categoryIcons: Record<string, string> = {
  programming: "⌨️",
  backend: "🔧",
  frontend: "🎨",
  databases: "🗄️",
  tools: "🛠️",
  concepts: "💡",
}

export function Skills() {
  const categories = Object.keys(skillsData) as (keyof typeof skillsData)[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 md:p-12 max-w-4xl"
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        Skills
      </h2>
      <p className="text-white/50 mb-10">
        Technologies and tools I work with
      </p>

      <div className="grid gap-8">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + categoryIndex * 0.1 }}
            className="group"
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg">{categoryIcons[category]}</span>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4FC3F7]/70">
                {categoryLabels[category]}
              </h3>
              <div className="flex-1 h-px bg-linear-to-r from-[#4FC3F7]/20 to-transparent" />
            </div>

            {/* Skills grid */}
            <div className="flex flex-wrap gap-2">
              {skillsData[category].map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 text-sm rounded-lg 
                    bg-[#0E1A24]/60 border border-[#4FC3F7]/10 
                    text-white/80 
                    hover:border-[#4FC3F7]/40 hover:bg-[#0E1A24] 
                    hover:text-[#4FC3F7] hover:shadow-[0_0_20px_rgba(79,195,247,0.1)]
                    transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 pt-8 border-t border-[#4FC3F7]/10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Languages", value: skillsData.programming.length },
            { label: "Backend Tech", value: skillsData.backend.length },
            { label: "Frontend Tech", value: skillsData.frontend.length },
            { label: "Total Skills", value: Object.values(skillsData).flat().length },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              className="text-center"
            >
              <span className="text-3xl font-bold text-[#4FC3F7]">{stat.value}</span>
              <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
