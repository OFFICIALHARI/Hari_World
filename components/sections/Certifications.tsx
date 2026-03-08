"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"

const certificationsData = [
  {
    name: "Cyber Security Essentials",
    issuer: "Cisco",
    year: "2025",
    link: "",
  },
  {
    name: "Generative AI Professional",
    issuer: "Oracle",
    year: "2025",
    link: "",
  },
  {
    name: "Java Foundation",
    issuer: "Infosys Springboard",
    year: "2025",
    link: "",
  },
  {
    name: "Postman API Student Expert",
    issuer: "Postman",
    year: "2025",
    link: "",
  },
  {
    name: "Crypto 101",
    issuer: "Blockchain Council",
    year: "2024",
    link: "",
  },
]

export function Certifications() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 md:p-12 max-w-3xl"
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        Certifications
      </h2>
      <p className="text-white/50 mb-10">
        Professional certifications and credentials
      </p>

      <div className="grid gap-4">
        {certificationsData.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="group relative p-6 rounded-2xl 
              bg-[#0E1A24]/50 border border-[#4FC3F7]/10 
              hover:border-[#4FC3F7]/30 hover:shadow-[0_0_30px_rgba(79,195,247,0.08)]
              transition-all duration-300"
          >
            <div className="flex items-start gap-5">
              {/* Certificate icon */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-[#4FC3F7]/20 to-[#4FC3F7]/5 border border-[#4FC3F7]/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#4FC3F7]" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#4FC3F7] transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-white/50 mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-white/30">
                      {cert.year}
                    </span>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-white/40 hover:text-[#4FC3F7]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-[#4FC3F7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Total count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <span className="text-4xl font-bold text-[#4FC3F7]">{certificationsData.length}</span>
        <p className="text-sm text-white/40 mt-1">Professional Certifications</p>
      </motion.div>
    </motion.div>
  )
}
