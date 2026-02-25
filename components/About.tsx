'use client'

import { motion } from 'framer-motion'
import { tifiContent } from '@/content/tifi'

export function About() {
  return (
    <section className="px-5 py-24 md:px-10" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.56 }}
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-ice/70">About</p>
          <h2 id="about-title" className="mt-4 font-display text-5xl md:text-6xl">
            Editorial Bio
          </h2>
        </motion.div>

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.56, delay: 0.06 }}
            className="text-lg leading-relaxed text-cream/80"
          >
            {tifiContent.about.summary}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-90px' }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            className="flex flex-wrap gap-2"
          >
            {tifiContent.about.descriptors.map((item) => (
              <motion.span
                key={item}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="rounded-sm border border-ice/30 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ice"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
