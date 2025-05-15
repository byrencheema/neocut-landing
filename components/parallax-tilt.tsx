"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface ParallaxTiltProps {
  children: React.ReactNode
  className?: string
  perspective?: number
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  scale?: number
  glareOpacity?: number
  transitionDuration?: number
}

export function ParallaxTilt({
  children,
  className = "",
  perspective = 1000,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.05,
  glareOpacity = 0.2,
  transitionDuration = 0.2,
}: ParallaxTiltProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const tiltX = (mouseY / (rect.height / 2)) * tiltMaxAngleX
    const tiltY = (mouseX / (rect.width / 2)) * tiltMaxAngleY * -1

    setTilt({ x: tiltX, y: tiltY })

    // Calculate glare position (opposite to tilt)
    const glareX = (mouseX / rect.width) * 100
    const glareY = (mouseY / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovering ? scale : 1,
      }}
      transition={{
        duration: transitionDuration,
        ease: "easeOut",
      }}
    >
      {children}

      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareOpacity}), transparent 70%)`,
          mixBlendMode: "overlay",
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          duration: transitionDuration,
        }}
      />
    </motion.div>
  )
}
