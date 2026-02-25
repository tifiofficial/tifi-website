'use client'

import Link from 'next/link'
import Image from 'next/image'
import { tifiContent } from '@/content/tifi'
import { MagneticButton } from '@/components/MagneticButton'

export function PressKitContent() {
  return (
    <section className="px-5 pb-20 pt-28 md:px-10" aria-labelledby="press-title">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-sm border border-ice/20 bg-ink-soft/55 p-6 md:p-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ice/75">Electronic Press Kit</p>
          <h1 id="press-title" className="mt-3">
            <Image
              src="/images/tifi-logo-cropped.png"
              alt={tifiContent.brand.name}
              width={800}
              height={280}
              sizes="(max-width: 768px) 80vw, 460px"
              className="h-auto w-[min(80vw,460px)] object-contain"
            />
          </h1>
          <p className="mt-4 max-w-3xl text-cream/78">{tifiContent.about.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href={tifiContent.epk.publicPdfPath} download variant="primary">
              Download EPK
            </MagneticButton>
            <MagneticButton href={tifiContent.epk.publicPdfPath} target="_blank" rel="noreferrer" variant="secondary">
              View EPK
            </MagneticButton>
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-sm border border-ice/20 bg-ink-soft/35 p-6">
            <h2 className="font-display text-4xl">Quick Facts</h2>
            <dl className="mt-4 space-y-3 text-cream/80">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-cream/60">Location</dt>
                <dd>{tifiContent.brand.location}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-cream/60">Genre</dt>
                <dd>{tifiContent.brand.genre}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-cream/60">Stats Reference</dt>
                <dd>{tifiContent.stats.asOf}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-sm border border-ice/20 bg-ink-soft/35 p-6">
            <h2 className="font-display text-4xl">Press / Booking</h2>
            <p className="mt-4 text-cream/76">Booking: {tifiContent.contact.bookingEmail}</p>
            <p className="mt-1 text-cream/76">Management: {tifiContent.contact.managementEmail}</p>
            <Link href="/contact" className="mt-6 inline-flex text-[11px] uppercase tracking-[0.2em] text-ice hover:text-cream">
              Open contact form
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
