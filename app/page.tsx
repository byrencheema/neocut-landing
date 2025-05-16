"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Play,
  ChevronRight,
  Check,
  X,
  Zap,
  Sparkles,
  Clock,
  Cloud,
  Code,
  Scissors,
  Upload,
  MessageSquare,
  Download,
  Star,
  Wand2,
  Layers,
  Cpu,
} from "lucide-react"
import { FloatingElement } from "@/components/floating-element"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { ParallaxTilt } from "@/components/parallax-tilt"
import { AnimatedText } from "@/components/animated-text"
import { GlowButton } from "@/components/glow-button"

export default function Home() {
  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const heroControls = useAnimation()

  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])

  // Floating particles state
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      delay: number
    }>
  >([])

  // Generate floating particles - reduced from 20 to 8 particles
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2, // Reduced max size
      color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 100}, ${Math.random() * 155 + 100}, ${Math.random() * 0.3 + 0.1})`, // Reduced opacity
      delay: Math.random() * 3, // Reduced delay
    }))
    setParticles(newParticles)
  }, [])

  // Trigger hero animations when in view
  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible")
    }
  }, [heroControls, heroInView])

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full pointer-events-none z-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
            opacity: [0.2, 0.5, 0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image src="/images/neocut-logo.png" alt="NeoCut Logo" width={120} height={60} className="h-10 w-auto" />
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            {["How It Works", "Features", "Pricing", "Join Waitlist"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link
                  href={item === "Join Waitlist" ? "#join-waitlist" : `#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-gray-300 hover:text-white transition relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <Link href="#join-waitlist" className="hidden md:flex">
            <GlowButton
              className="shadow-[0_0_15px_rgba(159,122,234,0.5)]"
              glowColor="rgba(159, 122, 234, 0.7)"
            >
              Join Waitlist
            </GlowButton>
          </Link>
          <motion.button className="md:hidden text-white" whileTap={{ scale: 0.95 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center justify-center"
      >
        {/* Removed purple wave background */}

        {/* Simplified gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#120D1E] to-[#0D0D0D] opacity-50"></div>

        {/* Reduced floating orbs to just one */}
        <FloatingElement
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-2xl"
          yOffset={10}
          duration={8}
        >
          <div />
        </FloatingElement>

        <motion.div className="container mx-auto px-6 relative z-10 max-w-7xl" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatedText
                text="Edit videos by chatting."
                className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white"
                staggerChildren={0.05}
              />
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              NeoCut will turn your words into precise edits — instantly, locally, and without a timeline. Coming soon.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="#join-waitlist">
                <GlowButton className="shadow-[0_0_25px_rgba(159,122,234,0.5)]" glowColor="rgba(159, 122, 234, 0.7)">
                  Join Waitlist
                </GlowButton>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative max-w-5xl mx-auto mt-16"
          >
            <ParallaxTilt className="rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-blue-600/20 rounded-xl blur-md"></div>
              <div className="relative border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(159,122,234,0.3)]">
                <Image
                  src="/images/neocut-screenshot.png"
                  alt="NeoCut Interface"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-auto rounded-xl"
                />

                {/* Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-xl"></div>

                {/* Animated highlight */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                    repeatDelay: 5,
                  }}
                />
              </div>
            </ParallaxTilt>

            {/* Floating features */}
            <FloatingElement
              className="absolute -top-10 -left-10 md:top-10 md:-left-20 bg-gray-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl p-3 shadow-lg"
              yOffset={10}
              xOffset={5}
              rotateOffset={2}
              delay={1}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center">
                  <Wand2 size={16} className="text-purple-300" />
                </div>
                <span className="text-sm font-medium">AI-Powered Editing</span>
              </div>
            </FloatingElement>

            <FloatingElement
              className="absolute -bottom-10 -right-10 md:-bottom-5 md:-right-20 bg-gray-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl p-3 shadow-lg"
              yOffset={15}
              xOffset={8}
              rotateOffset={-2}
              delay={1.5}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
                  <Zap size={16} className="text-blue-300" />
                </div>
                <span className="text-sm font-medium">Instant Results</span>
              </div>
            </FloatingElement>

            <FloatingElement
              className="absolute top-1/2 -translate-y-1/2 -right-10 md:-right-24 bg-gray-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl p-3 shadow-lg"
              yOffset={12}
              xOffset={6}
              delay={2}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-600/30 flex items-center justify-center">
                  <MessageSquare size={16} className="text-pink-300" />
                </div>
                <span className="text-sm font-medium">Chat to Edit</span>
              </div>
            </FloatingElement>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold inline-block">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Drop your video",
                description: "Drag & drop interface or select file",
                icon: <Upload size={24} className="text-purple-300" />,
                delay: 0.2,
              },
              {
                title: "Describe your edits",
                description: '"Trim intro", "Mute background", etc.',
                icon: <MessageSquare size={24} className="text-pink-300" />,
                delay: 0.4,
              },
              {
                title: "Done in seconds",
                description: "Export clean, lossless clip instantly",
                icon: <Download size={24} className="text-blue-300" />,
                delay: 0.6,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: step.delay }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <ParallaxTilt className="h-full">
                  <div className="bg-gray-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center h-full">
                    <div className="relative mb-6 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-xl"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl mx-auto relative z-10 shadow-[0_0_20px_rgba(159,122,234,0.5)]">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>

                    {/* Step number */}
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </ParallaxTilt>
              </motion.div>
            ))}
          </div>

          {/* Process flow */}
          <motion.div
            className="max-w-5xl mx-auto mt-20 relative px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform -translate-y-1/2 rounded-full hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { label: "Upload", icon: <Upload size={20} /> },
                { label: "Analyze", icon: <Cpu size={20} /> },
                { label: "Chat", icon: <MessageSquare size={20} /> },
                { label: "Process", icon: <Layers size={20} /> },
                { label: "Export", icon: <Download size={20} /> },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <FloatingElement yOffset={10} delay={index * 0.2} className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_15px_rgba(159,122,234,0.5)]">
                      {step.icon}
                    </div>
                  </FloatingElement>
                  <span className="mt-3 font-medium">{step.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Demo */}
      <section id="try-it" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold inline-block">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                See It In Action
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
              A preview of what's coming
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ParallaxTilt className="max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-blue-600/20 rounded-xl blur-md"></div>
              <div className="relative bg-gray-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(159,122,234,0.2)]">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-400 ml-2">NeoCut Demo</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                      <Image
                        src="/images/neocut-screenshot.png"
                        alt="Video preview"
                        width={600}
                        height={400}
                        className="rounded-lg w-full h-full object-cover"
                      />

                      {/* Video controls overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/80 backdrop-blur-sm flex items-center px-2">
                        <div className="w-full bg-gray-700 h-1.5 rounded-full">
                          <div className="bg-purple-500 h-1.5 w-[30%] rounded-full relative">
                            <motion.div
                              className="absolute -top-4 left-[10%] w-2 h-full bg-purple-500"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full"></div>
                            </motion.div>
                            <motion.div
                              className="absolute -top-4 left-[70%] w-2 h-full bg-purple-500"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                            >
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full"></div>
                            </motion.div>
                            <motion.div
                              className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 bg-white rounded-full"
                              animate={{
                                boxShadow: [
                                  "0 0 5px rgba(255,255,255,0.5)",
                                  "0 0 10px rgba(255,255,255,0.8)",
                                  "0 0 5px rgba(255,255,255,0.5)",
                                ],
                              }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            />
                          </div>
                        </div>
                        <span className="text-xs text-gray-300 ml-2">0:15 / 0:50</span>
                      </div>

                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-purple-600/80 flex items-center justify-center cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(159,122,234,0.5)",
                              "0 0 30px rgba(159,122,234,0.8)",
                              "0 0 20px rgba(159,122,234,0.5)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Play size={30} className="text-white ml-1" />
                        </motion.div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 flex flex-col">
                      <div className="flex-1 space-y-4 overflow-y-auto max-h-[200px] mb-4">
                        <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Cut the first 10 seconds</p>
                        </div>
                        <motion.div
                          className="bg-purple-900/50 rounded-lg p-3 max-w-[80%] ml-auto"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <p className="text-sm">Marked segment from 0:00 to 0:10. Ready to export.</p>
                        </motion.div>
                        <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Add a fade in effect at 0:15</p>
                        </div>
                        <motion.div
                          className="bg-purple-900/50 rounded-lg p-3 max-w-[80%] ml-auto"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <p className="text-sm">Added fade in effect at 0:15. Anything else?</p>
                        </motion.div>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type your edit request..."
                          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            Send
                          </motion.div>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <GlowButton className="shadow-[0_0_15px_rgba(159,122,234,0.5)]">Export Video</GlowButton>
                  </div>
                </div>
              </div>
            </ParallaxTilt>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            className="max-w-4xl mx-auto mt-10 flex flex-wrap justify-center gap-3 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              "Coming soon: Trim with chat",
              "Future: AI effects",
              "Planned: Smart editing",
              "Upcoming: Auto subtitles",
              "Launching: Noise removal",
            ].map((action, index) => (
              <motion.div
                key={action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="bg-gray-800/80 backdrop-blur-sm border border-purple-500/20 rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-purple-900/30 transition-all">
                  {action}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Competitive Advantage - Enhanced Version */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold inline-block">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Why NeoCut?
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
              Revolutionizing video editing with AI-powered simplicity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ParallaxTilt className="h-full">
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl -z-10"></div>
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0"
                        animate={{
                          boxShadow: [
                            "0 0 10px rgba(159,122,234,0.3)",
                            "0 0 20px rgba(159,122,234,0.6)",
                            "0 0 10px rgba(159,122,234,0.3)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Sparkles size={24} className="text-purple-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">AI-Powered Editing</h3>
                    </div>

                    <ul className="space-y-6">
                      {[
                        {
                          title: "Natural Language Processing",
                          description: "Simply describe what you want to do in plain English",
                          icon: <Zap size={18} className="text-purple-400" />,
                        },
                        {
                          title: "Smart Scene Detection",
                          description: "AI automatically identifies scenes, faces, and objects",
                          icon: <Scissors size={18} className="text-purple-400" />,
                        },
                        {
                          title: "Contextual Understanding",
                          description: "The AI understands the content of your video",
                          icon: <Sparkles size={18} className="text-purple-400" />,
                        },
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <FloatingElement
                            className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0 mt-1"
                            yOffset={5}
                            delay={index * 0.2}
                          >
                            {item.icon}
                          </FloatingElement>
                          <div>
                            <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                            <p className="text-gray-300">{item.description}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ParallaxTilt>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ParallaxTilt className="h-full">
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl -z-10"></div>
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0"
                        animate={{
                          boxShadow: [
                            "0 0 10px rgba(66,153,225,0.3)",
                            "0 0 20px rgba(66,153,225,0.6)",
                            "0 0 10px rgba(66,153,225,0.3)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Zap size={24} className="text-blue-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">Lightning Fast Workflow</h3>
                    </div>

                    <ul className="space-y-6">
                      {[
                        {
                          title: "Local Processing",
                          description: "All edits happen on your device - no cloud uploads",
                          icon: <Cloud size={18} className="text-blue-400" />,
                        },
                        {
                          title: "Instant Results",
                          description: "See changes immediately without rendering delays",
                          icon: <Clock size={18} className="text-blue-400" />,
                        },
                        {
                          title: "Developer API",
                          description: "Integrate NeoCut into your existing workflow",
                          icon: <Code size={18} className="text-blue-400" />,
                        },
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <FloatingElement
                            className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1"
                            yOffset={5}
                            delay={index * 0.2}
                          >
                            {item.icon}
                          </FloatingElement>
                          <div>
                            <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                            <p className="text-gray-300">{item.description}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ParallaxTilt>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ParallaxTilt>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-2xl blur-xl -z-10"></div>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-8 text-center">Traditional Editing vs NeoCut</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                        <X size={20} className="text-red-500" />
                        Traditional Video Editors
                      </h4>

                      {[
                        {
                          title: "Complex Timelines",
                          description: "Steep learning curve with complicated interfaces",
                        },
                        {
                          title: "Slow Rendering",
                          description: "Long wait times for previews and exports",
                        },
                        {
                          title: "Resource Intensive",
                          description: "Requires powerful hardware and large installs",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          viewport={{ once: true, amount: 0.3 }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 20px rgba(245, 101, 101, 0.2)",
                          }}
                        >
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <X size={16} className="text-red-500" />
                          </div>
                          <div>
                            <h5 className="font-medium">{item.title}</h5>
                            <p className="text-sm text-gray-400">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                        <Check size={20} className="text-green-500" />
                        NeoCut Advantage
                      </h4>

                      {[
                        {
                          title: "Conversational Editing",
                          description: "Just type what you want in plain language",
                        },
                        {
                          title: "Instant Results",
                          description: "See changes immediately with no rendering",
                        },
                        {
                          title: "Browser-Based",
                          description: "No installation required, works on any device",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4 flex items-start gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          viewport={{ once: true, amount: 0.3 }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 20px rgba(72, 187, 120, 0.2)",
                          }}
                        >
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <Check size={16} className="text-green-500" />
                          </div>
                          <div>
                            <h5 className="font-medium">{item.title}</h5>
                            <p className="text-sm text-gray-400">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ParallaxTilt>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold inline-block">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                How We Compare
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
              See how NeoCut stacks up against traditional video editors
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto overflow-x-auto"
          >
            <ParallaxTilt>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-xl blur-xl -z-10"></div>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                  <Table className="w-full border-collapse">
                    <TableHeader>
                      <TableRow className="bg-gray-900/50">
                        <TableHead className="text-left p-4 text-gray-300 font-medium">Feature</TableHead>
                        <TableHead className="p-4 text-purple-400 font-medium">NeoCut</TableHead>
                        <TableHead className="p-4 text-gray-300 font-medium">Adobe Premiere</TableHead>
                        <TableHead className="p-4 text-gray-300 font-medium">Descript</TableHead>
                        <TableHead className="p-4 text-gray-300 font-medium">CapCut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          feature: "Natural language",
                          neocut: true,
                          premiere: false,
                          descript: "🟡 Transcript-only",
                          capcut: false,
                        },
                        {
                          feature: "Runs locally",
                          neocut: true,
                          premiere: false,
                          descript: false,
                          capcut: "✅ (mobile only)",
                        },
                        {
                          feature: "Requires install",
                          neocut: false,
                          premiere: true,
                          descript: false,
                          capcut: true,
                        },
                        {
                          feature: "Free tier",
                          neocut: true,
                          premiere: "❌ ($23/mo)",
                          descript: true,
                          capcut: true,
                        },
                      ].map((row, index) => (
                        <motion.tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/10"}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * index }}
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <TableCell className="p-4 border-t border-gray-800">{row.feature}</TableCell>
                          <TableCell className="p-4 border-t border-gray-800 text-center">
                            {typeof row.neocut === "boolean" ? (
                              row.neocut ? (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                                >
                                  <Check size={18} className="text-green-500 mx-auto" />
                                </motion.div>
                              ) : (
                                <X size={18} className="text-red-500 mx-auto" />
                              )
                            ) : (
                              row.neocut
                            )}
                          </TableCell>
                          <TableCell className="p-4 border-t border-gray-800 text-center">
                            {typeof row.premiere === "boolean" ? (
                              row.premiere ? (
                                <Check size={18} className="text-green-500 mx-auto" />
                              ) : (
                                <X size={18} className="text-red-500 mx-auto" />
                              )
                            ) : (
                              row.premiere
                            )}
                          </TableCell>
                          <TableCell className="p-4 border-t border-gray-800 text-center">
                            {typeof row.descript === "boolean" ? (
                              row.descript ? (
                                <Check size={18} className="text-green-500 mx-auto" />
                              ) : (
                                <X size={18} className="text-red-500 mx-auto" />
                              )
                            ) : (
                              row.descript
                            )}
                          </TableCell>
                          <TableCell className="p-4 border-t border-gray-800 text-center">
                            {typeof row.capcut === "boolean" ? (
                              row.capcut ? (
                                <Check size={18} className="text-green-500 mx-auto" />
                              ) : (
                                <X size={18} className="text-red-500 mx-auto" />
                              )
                            ) : (
                              row.capcut
                            )}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </ParallaxTilt>
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <GlowButton variant="outline" className="flex items-center gap-2 mx-auto" icon={<ChevronRight size={16} />}>
              See Full Feature List
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold inline-block">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                What People Are Saying
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
              Early feedback from our beta testers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {[
              {
                quote: "I can't wait to cut my YouTube videos 5x faster with NeoCut. The preview looks amazing!",
                author: "@editingmom",
                avatar: "/placeholder.svg?height=50&width=50",
                stars: 5,
              },
              {
                quote: "The concept is revolutionary. No more wasting hours on complex timelines - just tell it what you want!",
                author: "@techreviewer",
                avatar: "/placeholder.svg?height=50&width=50",
                stars: 5,
              },
              {
                quote: "As a content creator, I'm excited to try NeoCut when it launches. The waitlist is worth it!",
                author: "@contentcreator",
                avatar: "/placeholder.svg?height=50&width=50",
                stars: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <ParallaxTilt>
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl blur-xl -z-10"></div>
                    <div className="bg-gray-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={50}
                          height={50}
                          className="rounded-full border-2 border-purple-500"
                        />
                        <div>
                          <span className="font-medium text-purple-300">{testimonial.author}</span>
                          <div className="flex mt-1">
                            {Array.from({ length: testimonial.stars }).map((_, i) => (
                              <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 italic">"{testimonial.quote}"</p>

                      {/* Decorative quote mark */}
                      <div className="absolute -bottom-3 -right-3 text-6xl text-purple-500/20 font-serif">"</div>
                    </div>
                  </div>
                </ParallaxTilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold inline-block">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Future Pricing
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
              Planned pricing tiers for when we launch
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-full p-1 inline-flex">
              <button className="px-6 py-2 rounded-full bg-purple-600 text-white text-sm font-medium">Monthly</button>
              <button className="px-6 py-2 rounded-full text-gray-300 text-sm font-medium">Yearly</button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Everything you need to get started.",
                features: [
                  "Up to 10 videos per month",
                  "720p export quality",
                  "Basic editing commands",
                  "5-minute max video length",
                  "Community support",
                ],
              },
              {
                name: "Creator",
                price: "$10",
                description: "Power tools for indie creators.",
                features: [
                  "Unlimited videos",
                  "1080p export quality",
                  "Advanced editing commands",
                  "30-minute max video length",
                  "Priority support",
                  "Custom export settings",
                ],
                popular: true,
              },
              {
                name: "Studio",
                price: "$25",
                description: "Multi-project support + AI boosts.",
                features: [
                  "Everything in Creator",
                  "4K export quality",
                  "Team collaboration",
                  "Unlimited video length",
                  "Advanced AI effects",
                  "White-label exports",
                  "API access",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <ParallaxTilt className="h-full">
                  <div
                    className={`relative bg-gray-900/30 backdrop-blur-sm border ${plan.popular ? "border-purple-500" : "border-gray-800"} rounded-xl p-6 flex flex-col h-full ${plan.popular ? "shadow-[0_0_30px_rgba(159,122,234,0.3)]" : ""}`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.price !== "Free" && <span className="text-gray-400">/month</span>}
                    </div>
                    <p className="text-gray-400 mb-6">{plan.description}</p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-purple-500" />
                          </div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <Link href="#join-waitlist">
                        <GlowButton className="shadow-[0_0_25px_rgba(159,122,234,0.5)]">Join Waitlist</GlowButton>
                      </Link>
                    </motion.div>
                  </div>
                </ParallaxTilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join-waitlist" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="max-w-2xl mx-auto text-center bg-purple-900/20 border border-purple-500/30 rounded-xl p-12">
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Ready to revolutionize your video editing?
              </motion.h2>
              <div id="getWaitlistContainer" data-waitlist_id="28401" data-widget_type="WIDGET_3"></div>
              <link rel="stylesheet" type="text/css" href="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css"/>
              <script src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js"></script>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <motion.div
              className="mb-6 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/images/neocut-logo.png" alt="NeoCut Logo" width={120} height={60} className="h-10 w-auto" />
            </motion.div>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {[
                <svg
                  key="twitter"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>,
                <svg
                  key="instagram"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>,
                <svg
                  key="linkedin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>,
              ].map((icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col md:flex-row justify-center gap-8 mt-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {["About", "Contact", "Privacy", "Terms"].map((item, index) => (
              <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#" className="text-gray-400 hover:text-white transition relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8 text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>Made by students at UC Irvine 🐜</p>
            <p className="text-sm mt-2">© {new Date().getFullYear()} NeoCut. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
