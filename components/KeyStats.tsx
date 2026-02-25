'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { tifiContent } from '@/content/tifi'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted = Math.floor(latest).toLocaleString()
        ref.current.textContent = formatted + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export function KeyStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="stats" className="py-32 px-6 md:px-12 bg-navy/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">
            {tifiContent.stats.label}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-display mb-2">
              <AnimatedCounter value={tifiContent.stats.spotifyStreams} />
            </div>
            <p className="text-sm uppercase tracking-wider text-white/60">Spotify Streams</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-display mb-2">
              <AnimatedCounter value={tifiContent.stats.soundcloudStreams} />
            </div>
            <p className="text-sm uppercase tracking-wider text-white/60">SoundCloud Streams</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-display mb-2">
              <AnimatedCounter value={tifiContent.stats.instagramFollowers} />
            </div>
            <p className="text-sm uppercase tracking-wider text-white/60">Instagram Followers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-display mb-2">
              <AnimatedCounter value={tifiContent.stats.tiktokViews} />
            </div>
            <p className="text-sm uppercase tracking-wider text-white/60">TikTok Views</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
