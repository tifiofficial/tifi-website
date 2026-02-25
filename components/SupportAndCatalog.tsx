'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { tifiContent } from '@/content/tifi'

export function SupportAndCatalog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Support */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display mb-8">Supported By</h2>
            <div className="space-y-4">
              {tifiContent.support.map((name, index) => (
                <motion.p
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-xl text-white/80"
                >
                  {name}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Catalog */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl font-display mb-8">Best Performing</h2>
            <div className="space-y-4">
              {tifiContent.catalog.map((track, index) => (
                <CatalogCard key={track.title} track={track} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CatalogCard({
  track,
  index,
  isInView,
}: {
  track: typeof tifiContent.catalog[0]
  index: number
  isInView: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border border-ice-blue/20 hover:border-ice-blue/40 transition-all cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-display text-lg mb-1">{track.title}</h3>
            <p className="text-sm text-white/60 mb-2">{track.artists}</p>
            <p className="text-xs uppercase tracking-wider text-ice-blue/80">
              {track.streams.toLocaleString()} streams
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-ice-blue/60 ml-4"
          >
            ↓
          </motion.div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-ice-blue/10">
            <span className="text-xs uppercase tracking-wider text-white/60">{track.type}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
