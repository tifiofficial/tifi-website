'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { tifiContent } from '@/content/tifi'

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const mv = useMotionValue(0)
  const sv = useSpring(mv, { damping: 24, stiffness: 85 })
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (ref.current) ref.current.textContent = Math.floor(sv.get()).toLocaleString()
    const unsub = sv.on('change', (latest) => {
      if (ref.current) ref.current.textContent = Math.floor(latest).toLocaleString()
    })
    return unsub
  }, [sv])

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  return <span ref={ref}>0</span>
}

export function Stats() {
  return (
    <section id="stats" className="border-y border-ice/10 bg-ink-soft/40 px-5 py-20 md:px-10" aria-labelledby="stats-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 id="stats-title" className="font-display text-5xl md:text-6xl">
            Key Stats
          </h2>
          <p className="text-[11px] uppercase tracking-[0.2em] text-cream/65">{tifiContent.stats.asOf}</p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {tifiContent.stats.items.map((stat, i) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-sm border border-ice/20 bg-ink/40 p-4"
            >
              <p className="font-display text-3xl leading-none sm:text-4xl md:text-5xl">
                <Counter value={stat.value} />
                {stat.suffix ?? ''}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-cream/65">{stat.label}</p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
