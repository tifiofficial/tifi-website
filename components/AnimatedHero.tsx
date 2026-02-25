'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from './MagneticButton'
import { tifiContent } from '@/content/tifi'
import { heroVideos } from '@/content/videos'

export function AnimatedHero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    // Rotate videos every 8 seconds
    if (heroVideos.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Try to play current video
    const video = videoRefs.current[currentVideoIndex]
    if (video) {
      video.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [currentVideoIndex])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy" />
        
        {/* Video overlay - optional */}
        {heroVideos.length > 0 && (
          <>
            {heroVideos.map((src, index) => (
              <video
                key={src}
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                src={src}
                loop
                muted
                playsInline
                preload="metadata"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                onError={() => {
                  // Video failed to load, but that's okay
                }}
              />
            ))}
          </>
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/60 z-20" />
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.02] grain-overlay z-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-8 z-40 relative"
        >
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="text-8xl md:text-[12rem] font-display tracking-tight leading-none mb-4">
              {tifiContent.brand.name}
            </h1>
          </motion.div>

          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-2xl md:text-4xl text-ice-blue/90 uppercase tracking-[0.2em] font-light mb-8">
              {tifiContent.brand.tagline}
            </p>
          </motion.div>

          {/* Animated Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12"
          >
            {tifiContent.brand.description}
          </motion.p>

          {/* Animated CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href="/contact" variant="primary">
              Book / Inquire
            </MagneticButton>
            <MagneticButton href="/press-kit" variant="secondary">
              Download EPK
            </MagneticButton>
            <MagneticButton href="/music" variant="ghost">
              Listen
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-sm uppercase tracking-wider">Scroll</span>
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
