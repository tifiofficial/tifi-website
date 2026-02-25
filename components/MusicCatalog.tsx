'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { tifiContent } from '@/content/tifi'
import { ModalPlayer } from '@/components/ModalPlayer'

export function MusicCatalog() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = tifiContent.embeds.find((embed) => embed.id === activeId) ?? null

  return (
    <section className="px-5 pb-16 pt-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-6xl md:text-7xl">Music</h1>
        <p className="mt-4 max-w-2xl text-cream/75">
          Best-performing cuts, edits, remixes, and originals. Open a platform player below to preview and stream.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {tifiContent.catalog.map((track, i) => (
            <motion.article
              key={track.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.36, delay: i * 0.04 }}
              className="rounded-sm border border-ice/20 bg-ink-soft p-5"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-ice/80">{track.type}</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">{track.title}</h2>
              <p className="mt-1 text-cream/68">{track.artists}</p>
              {track.link && (
                <a
                  href={track.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-[11px] uppercase tracking-[0.2em] text-ice hover:underline"
                >
                  Open on Spotify
                </a>
              )}
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-cream/60">{track.streams.toLocaleString()} streams</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {tifiContent.embeds.map((embed) => (
            <button
              key={embed.id}
              type="button"
              onClick={() => setActiveId(embed.id)}
              className="rounded-sm border border-ice/30 px-5 py-4 text-left text-xs uppercase tracking-[0.2em] text-ice transition hover:border-ice hover:bg-ice/10"
            >
              Open {embed.label}
            </button>
          ))}
        </div>
      </div>

      <ModalPlayer player={active} onClose={() => setActiveId(null)} />
    </section>
  )
}
