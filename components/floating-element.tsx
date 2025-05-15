"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  yOffset?: number
  xOffset?: number
  rotateOffset?: number
  scale?: number
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 4,
  className = "",
  yOffset = 10,
  xOffset = 0,
  rotateOffset = 0,
  scale = 1,
}: FloatingElementProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const floatVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: scale * 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: scale,
      transition: {
        duration: 0.8,
        delay: delay,
      },
    },
  }

  const floatingAnimation = {
    y: [0, -yOffset, 0, yOffset, 0],
    x: xOffset ? [0, xOffset, 0, -xOffset, 0] : 0,
    rotate: rotateOffset ? [0, rotateOffset, 0, -rotateOffset, 0] : 0,
    transition: {
      duration: duration,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop" as const,
      ease: "easeInOut",
      delay: delay,
    },
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={floatVariants} className={className}>
      <motion.div animate={floatingAnimation}>{children}</motion.div>
    </motion.div>
  )
}
