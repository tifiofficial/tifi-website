'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Hero } from '@/components/Hero'
import { Tiles } from '@/components/Tiles'
import { About } from '@/components/About'
import { Stats } from '@/components/Stats'
import { Venues } from '@/components/Venues'
import { CatalogCards } from '@/components/CatalogCards'
import { ListenSection } from '@/components/ListenSection'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  const [ready, setReady] = useState(false)

  return (
    <>
      {!ready && <LoadingScreen onDone={() => setReady(true)} />}
      <Navigation />
      <main>
        <Hero />
        <Tiles />
        <About />
        <Stats />
        <Venues />
        <CatalogCards />
        <ListenSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
