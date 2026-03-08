"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Send, Download } from "lucide-react"

const connectData = {
  email: "harikrishnan777h@gmail.com",
  phone: "+91 9092044292",
  github: "https://github.com/officialhari",
  linkedin: "https://www.linkedin.com/in/harikrishnan2006/",
  location: "Chennai, India",
  resumeLink: "/Securin.pdf",

  message:
    "I'm open to internships, backend developer roles, and collaboration opportunities. Let's build something amazing together!",
}

const socialLinks = [
  {
    name: "Email",
    href: `mailto:${connectData.email}`,
    icon: Mail,
    label: connectData.email,
    color: "#EA4335",
  },
  {
    name: "Phone",
    href: `tel:${connectData.phone}`,
    icon: Phone,
    label: connectData.phone,
    color: "#34A853",
  },
  {
    name: "GitHub",
    href: connectData.github,
    icon: Github,
    label: "github.com/officialhari",
    color: "#6e5494",
  },
  {
    name: "LinkedIn",
    href: connectData.linkedin,
    icon: Linkedin,
    label: "linkedin.com/in/harikrishnan2006",
    color: "#0077B5",
  },
]

export function Connect() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 md:p-12 max-w-3xl"
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        Connect
      </h2>
      <p className="text-white/50 mb-6">
        Let's get in touch
      </p>

      {/* Message card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-linear-to-br from-[#4FC3F7]/10 to-transparent border border-[#4FC3F7]/20 mb-10"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#4FC3F7]/10">
            <Send className="w-5 h-5 text-[#4FC3F7]" />
          </div>
          <p className="text-white/70 leading-relaxed">
            {connectData.message}
          </p>
        </div>
      </motion.div>

      {/* Contact links */}
      <div className="grid gap-4">
        {socialLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" && link.name !== "Phone" ? "_blank" : undefined}
              rel={link.name !== "Email" && link.name !== "Phone" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ x: 8 }}
              className="group flex items-center gap-5 p-5 rounded-2xl 
                bg-[#0E1A24]/50 border border-[#4FC3F7]/10 
                hover:border-[#4FC3F7]/30 hover:shadow-[0_0_30px_rgba(79,195,247,0.08)]
                transition-all duration-300"
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${link.color}15` }}
              >
                <Icon 
                  className="w-5 h-5 transition-colors"
                  style={{ color: link.color }}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-xs text-white/40 mb-1">{link.name}</p>
                <p className="text-white/80 group-hover:text-white transition-colors">
                  {link.label}
                </p>
              </div>

              {/* Arrow */}
              <span className="text-white/20 group-hover:text-[#4FC3F7] transition-colors">
                →
              </span>
            </motion.a>
          )
        })}

        {/* Location (non-clickable) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-5 p-5 rounded-2xl bg-[#0E1A24]/30 border border-white/5"
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white/40" />
          </div>
          <div>
            <p className="text-xs text-white/30 mb-1">Location</p>
            <p className="text-white/50">{connectData.location}</p>
          </div>
        </motion.div>
      </div>

      {/* Download resume CTA */}
      {connectData.resumeLink && (
        <motion.a
          href={connectData.resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 flex items-center justify-center gap-3 w-full p-4 rounded-xl
            bg-linear-to-r from-[#4FC3F7]/20 to-[#29B6F6]/20
            border border-[#4FC3F7]/30 hover:border-[#4FC3F7]/50
            text-[#4FC3F7] hover:text-white
            transition-all duration-300"
        >
          <Download className="w-5 h-5" />
          <span className="font-medium">Download Resume</span>
        </motion.a>
      )}

      {/* Footer message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 text-center text-white/30 text-sm"
      >
        Looking forward to hearing from you! 🚀
      </motion.p>
    </motion.div>
  )
}
