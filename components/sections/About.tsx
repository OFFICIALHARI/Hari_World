"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const aboutData = {
  name: "HARIKRISHNAN S",
  role: "Backend Software Developer",
  location: "Chennai, India",
  image: "/mydp_whitebackgroud.jpeg",

  description: `Backend Developer specializing in Java & Spring Boot. I build scalable APIs, secure systems, and full-stack applications with 300+ DSA problems solved. Passionate about clean architecture and continuous learning.`,

  highlights: [
    "Java & Spring Boot Specialist",
    "300+ DSA Problems Solved",
    "Full-Stack Development",
    "REST API & Authentication Expert",
  ],
}

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 md:p-12 max-w-3xl"
    >
      {/* Profile section */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative shrink-0"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-linear-to-br from-[#4FC3F7]/20 to-[#29B6F6]/10 border border-[#4FC3F7]/30 flex items-center justify-center overflow-hidden">
            {aboutData.image ? (
              <Image
                src={aboutData.image}
                alt={aboutData.name}
                width={144}
                height={144}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-4xl md:text-5xl font-bold text-[#4FC3F7]/60">
                {aboutData.name.charAt(0)}
              </span>
            )}
          </div>
          {/* Decorative ring */}
          <motion.div
            className="absolute -inset-1 rounded-2xl border border-[#4FC3F7]/20"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Name and role */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {aboutData.name}
          </h1>
          <p className="text-lg md:text-xl text-[#4FC3F7] mt-2 font-medium">
            {aboutData.role}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-sm text-white/50">{aboutData.location}</p>
          </div>
        </motion.div>
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <p className="text-white/70 leading-relaxed whitespace-pre-line text-base">
          {aboutData.description}
        </p>
      </motion.div>

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10"
      >
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4FC3F7]/70 mb-5">
          Highlights
        </h3>
        <div className="grid gap-3">
          {aboutData.highlights.map((highlight, index) => (
            <motion.div
              key={highlight}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#0E1A24]/50 border border-[#4FC3F7]/10 hover:border-[#4FC3F7]/30 transition-colors group"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF3B3B] group-hover:scale-125 transition-transform" />
              <span className="text-white/80 text-sm">{highlight}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
