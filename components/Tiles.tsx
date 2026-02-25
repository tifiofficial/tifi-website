'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const tiles = [
  {
    title: 'Sound',
    subtitle: 'Catalog + edits + originals',
    href: '/music',
    image: '/images/hero-1.png',
  },
  {
    title: 'Shows',
    subtitle: 'Venue history + booking',
    href: '/#venues',
    image: '/images/X PHOTO NCG (3).JPG',
  },
  {
    title: 'Press Kit',
    subtitle: 'Bio + stats + PDF',
    href: '/press-kit',
    image: '/images/epk-cover.png',
  },
]

export function Tiles() {
  return (
    <section className="px-5 py-20 md:px-10" aria-label="Featured sections">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.48, delay: i * 0.08 }}
          >
            <Link href={tile.href} className="group relative block overflow-hidden rounded-sm border border-ice/20 bg-ink-soft p-6">
              <div className="relative z-10 flex min-h-56 flex-col justify-between">
                <div>
                  <h3 className="font-display text-4xl leading-none transition-transform duration-300 group-hover:translate-x-1">
                    {tile.title}
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-cream/65">{tile.subtitle}</p>
                </div>
                <span className="inline-block w-fit border-b border-ice/50 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 group-hover:border-ice group-hover:text-ice">
                  Explore
                </span>
              </div>

              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-0 transition duration-500 group-hover:translate-x-1 group-hover:opacity-25"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
