import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { MusicCatalog } from '@/components/MusicCatalog'

export const metadata = {
  title: 'Music | TIFI',
  description: 'Best performing releases, edits, and remixes from TIFI.',
}

export default function MusicPage() {
  return (
    <>
      <Navigation />
      <main>
        <MusicCatalog />
      </main>
      <Footer />
    </>
  )
}
