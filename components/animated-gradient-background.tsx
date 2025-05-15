"use client"

import { useEffect, useRef } from "react"

interface AnimatedGradientBackgroundProps {
  className?: string
}

export function AnimatedGradientBackground({ className = "" }: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    resize()

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(159, 122, 234, 0.2)")
    gradient.addColorStop(0.5, "rgba(213, 63, 140, 0.2)")
    gradient.addColorStop(1, "rgba(66, 153, 225, 0.2)")

    const draw = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw flowing waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()

        const amplitude = 50 + i * 20
        const frequency = 0.002 - i * 0.0005
        const speed = time * (0.5 + i * 0.2)
        const opacity = 0.1 - i * 0.02
        const lineWidth = 20 + i * 10

        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * frequency + speed) * amplitude + canvas.height / 2
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = `rgba(159, 122, 234, ${opacity})`
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      animationFrameId = window.requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 z-0 ${className}`} />
}
