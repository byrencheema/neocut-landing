"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  glowColor?: string
  className?: string
  icon?: React.ReactNode
}

export function GlowButton({
  children,
  variant = "default",
  size = "default",
  glowColor = "rgba(159, 122, 234, 0.7)",
  className,
  icon,
  ...props
}: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const baseClasses = cn(
    "relative overflow-hidden transition-all duration-300 transform hover:scale-105",
    variant === "default" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none" : "",
    variant === "outline" ? "bg-transparent border border-purple-500 text-white hover:bg-purple-500/10" : "",
    variant === "secondary" ? "bg-gray-800 text-white hover:bg-gray-700" : "",
    size === "default" ? "px-8 py-6 rounded-full" : "",
    size === "sm" ? "px-4 py-2 rounded-full text-sm" : "",
    size === "lg" ? "px-10 py-8 rounded-full text-lg" : "",
    size === "icon" ? "p-2 rounded-full" : "",
    className,
  )

  return (
    <Button
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.span
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor} 0%, transparent 70%)`
            : "none",
        }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative flex items-center justify-center gap-2 z-10">
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </Button>
  )
}
