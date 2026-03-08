"use client"

import { motion } from "framer-motion"
import { HEADER_QUOTE, APP_NAME } from "@/lib/constants"
import { Globe } from "lucide-react"

export function QuoteHeader() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-14 flex items-center justify-between px-6 border-b border-[#4FC3F7]/10 bg-[#0B0F14]/95 backdrop-blur-sm"
    >
      {/* Logo and brand */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Globe className="w-5 h-5 text-[#4FC3F7]" />
          <motion.div
            className="absolute inset-0 bg-[#4FC3F7]/30 rounded-full blur-md"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <span className="text-sm font-bold tracking-wider text-white">
          {APP_NAME.toUpperCase()}
        </span>
      </div>
      
      {/* Quote */}
      <p className="text-sm font-light text-[#4FC3F7]/70 tracking-wide italic font-serif">
        "{HEADER_QUOTE}"
      </p>
    </motion.header>
  )
}
