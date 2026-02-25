'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const tiles = [
  {
    title: 'Sound',
    description: 'Afro / Melodic House',
    href: '/music',
    image: '/images/hero-1.png',
  },
  {
    title: 'Shows',
    description: 'Live Performances',
    href: '/#venues',
    image: '/images/hero-1.png',
  },
  {
    title: 'Press Kit',
    description: 'Download EPK',
    href: '/press-kit',
    image: '/images/hero-1.png',
  },
]

export function FeaturedTiles() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {tiles.map((tile, index) => (
            <FeaturedTile key={tile.title} tile={tile} index={index} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedTile({
  tile,
  index,
  isInView,
}: {
  tile: typeof tiles[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={tile.href} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-navy/50">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-ice-blue/10 to-teal-accent/5"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
            <h3 className="text-3xl font-display mb-2 group-hover:text-ice-blue transition-colors">
              {tile.title}
            </h3>
            <p className="text-sm uppercase tracking-wider text-white/60">
              {tile.description}
            </p>
          </div>
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
