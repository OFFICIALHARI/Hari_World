"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

const projectsData = [
  {
    title: "Xprofile",
    tech: ["Spring Boot", "React", "MongoDB", "JWT"],
    description:
      "Full-stack resume generation platform with authentication, secure password hashing, email verification, and subscription payments.",
    highlights: [
      "JWT authentication & bcrypt security",
      "Razorpay payment integration",
      "Cloudinary image storage",
      "Scalable REST API architecture",
    ],
    link: "",
    github: "",
  },

  {
    title: "AI Code Tutor",
    tech: ["React", "TypeScript", "FastAPI", "Gemini AI"],
    description:
      "Intelligent code tutoring system powered by Google Gemini AI with anti-cheat detection and automated mentor notifications.",
    highlights: [
      "AI-powered code analysis & feedback",
      "Anti-cheat & paste detection",
      "Automated email reports to mentors",
      "LeetCode-style interface",
    ],
    link: "",
    github: "",
  },

  {
    title: "Civic Pulse",
    tech: ["React", "Spring Boot", "MySQL", "AI Integration"],
    description:
      "Grievance management system with complaint categorization, officer assignment, and analytics dashboard.",
    highlights: [
      "AI-based complaint classification",
      "SLA analytics dashboard",
      "Role-based workflow system",
    ],
    link: "",
    github: "",
  },

  {
    title: "Eco-Friendly Shopping Assistant",
    tech: ["React", "OpenAI API", "Web Scraping"],
    description:
      "Browser extension that evaluates products based on eco-friendliness using AI-powered sustainability analysis.",
    highlights: [
      "AI product analysis",
      "Automated data scraping",
      "Sustainability scoring system",
    ],
    link: "",
    github: "",
  },
]

export function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 md:p-12 max-w-4xl"
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        Projects
      </h2>
      <p className="text-white/50 mb-6">
        Featured work and side projects
      </p>

      {/* GitHub Profile Link */}
      <motion.a
        href="https://github.com/officialhari"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full
          bg-[#6e5494]/10 border border-[#6e5494]/30 hover:border-[#6e5494]/60
          text-[#6e5494] hover:text-white transition-all duration-300"
      >
        <Github className="w-4 h-4" />
        <span className="text-sm font-medium">Check out all my projects</span>
      </motion.a>

      <div className="space-y-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15 }}
            className="group relative p-6 md:p-8 rounded-2xl 
              bg-linear-to-br from-[#0E1A24]/80 to-[#0E1A24]/40
              border border-[#4FC3F7]/10 
              hover:border-[#4FC3F7]/30 
              hover:shadow-[0_0_40px_rgba(79,195,247,0.08)]
              transition-all duration-500"
          >
            {/* Project number badge */}
            <div className="absolute top-6 right-6 text-xs font-mono text-white/20">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Title and links */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-[#4FC3F7] transition-colors">
                {project.title}
              </h3>
              
              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Github className="w-4 h-4 text-white/40 hover:text-white/80" />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-white/40 hover:text-white/80" />
                  </a>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full 
                    bg-[#4FC3F7]/10 text-[#4FC3F7]/90 
                    border border-[#4FC3F7]/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-2">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B3B] shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#4FC3F7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
