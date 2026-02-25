'use client'

import { tifiContent } from '@/content/tifi'

const repeated = [...tifiContent.venues, ...tifiContent.venues]

export function Venues() {
  return (
    <section id="venues" className="px-5 py-24 md:px-10" aria-labelledby="venues-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-5">
          <h2 id="venues-title" className="font-display text-5xl md:text-6xl">
            Venues
          </h2>
          <p className="text-[11px] uppercase tracking-[0.2em] text-cream/60">Marquee archive</p>
        </div>
      </div>

      <div className="group overflow-hidden border-y border-ice/10 py-6">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {repeated.map((venue, idx) => (
            <div key={`${venue.name}-${idx}`} className="rounded-sm border border-ice/20 bg-ink-soft/60 px-4 py-3">
              <p className="font-display text-2xl leading-none">{venue.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-cream/60">{venue.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
