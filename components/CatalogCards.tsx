'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { tifiContent } from '@/content/tifi'

export function CatalogCards() {
  return (
    <section className="px-5 py-24 md:px-10" aria-labelledby="support-title">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-ice/70">Network</p>
          <h2 id="support-title" className="mt-3 font-display text-5xl md:text-6xl">
            Supported By
          </h2>
          <ul className="mt-8 space-y-3">
            {tifiContent.support.map((name, i) => (
              <motion.li
                key={name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="text-xl text-cream/82"
              >
                {name}
              </motion.li>
            ))}
          </ul>

          <h3 className="mt-12 font-display text-4xl md:text-5xl">Shared the Stage With</h3>
          <ul className="mt-6 space-y-3">
            {tifiContent.sharedStageWith.map((name, i) => (
              <motion.li
                key={name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="text-xl text-cream/82"
              >
                {name}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-ice/70">Performance</p>
          <h3 className="mt-3 font-display text-5xl md:text-6xl">Key Releases</h3>
          <div className="mt-8 space-y-3">
            {tifiContent.catalog.map((track, i) => (
              <ExpandableCard key={track.title} index={i} track={track} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExpandableCard({
  track,
  index,
}: {
  index: number
  track: (typeof tifiContent.catalog)[number]
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={() => setExpanded((prev) => !prev)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="w-full rounded-sm border border-ice/20 bg-gradient-to-br from-ink-soft to-ink p-4 text-left transition hover:border-ice/45 hover:shadow-glow"
      aria-expanded={expanded}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-2xl leading-tight">{track.title}</p>
          <p className="mt-1 text-sm text-cream/65">{track.note ?? `On ${track.artists}`}</p>
          {track.streams > 0 && (
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ice/85">{track.streams.toLocaleString()} streams</p>
          )}
        </div>
        <span className="mt-1 text-xs uppercase tracking-[0.18em] text-ice/70">{expanded ? 'Less' : 'More'}</span>
      </div>

      {expanded && (
        <div className="mt-4 border-t border-ice/15 pt-3 text-[11px] uppercase tracking-[0.2em] text-cream/65">
          Type: {track.type}
          {track.link && (
            <a
              href={track.link}
              target="_blank"
              rel="noreferrer"
              className="ml-4 text-ice underline-offset-4 hover:underline"
            >
              Open Track
            </a>
          )}
        </div>
      )}
    </motion.button>
  )
}
