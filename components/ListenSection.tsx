'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { tifiContent } from '@/content/tifi'
import { ModalPlayer } from '@/components/ModalPlayer'

export function ListenSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = tifiContent.embeds.find((embed) => embed.id === activeId) ?? null

  return (
    <section className="px-5 py-24 md:px-10" aria-labelledby="listen-watch-title">
      <div className="mx-auto max-w-7xl">
        <h2 id="listen-watch-title" className="font-display text-5xl md:text-6xl">
          Listen / Watch
        </h2>
        <p className="mt-4 max-w-xl text-cream/75">Open platform players in a modal for a focused preview experience.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {tifiContent.embeds.map((embed, i) => (
            <motion.button
              key={embed.id}
              type="button"
              onClick={() => setActiveId(embed.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.38, delay: i * 0.06 }}
              className="rounded-sm border border-ice/25 bg-ink-soft p-5 text-left transition hover:border-ice hover:bg-ink"
            >
              <p className="font-display text-3xl">{embed.label}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-cream/60">Open Player</p>
            </motion.button>
          ))}
        </div>
      </div>

      <ModalPlayer player={active} onClose={() => setActiveId(null)} />
    </section>
  )
}
