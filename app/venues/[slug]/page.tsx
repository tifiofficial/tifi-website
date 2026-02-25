import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { VenueGallery } from '@/components/VenueGallery'
import { VideoGallery } from '@/components/VideoGallery'
import { venuePhotos } from '@/content/venuePhotos'
import { videosByVenue } from '@/content/videos'
import { tifiContent } from '@/content/tifi'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MagneticButton } from '@/components/MagneticButton'

const venueSlugs: Record<string, string> = {
  'new-city-gas': 'New City Gas',
  'beachclub': 'Beachclub',
  'coffee-party': 'Coffee Party',
}

export async function generateStaticParams() {
  return Object.keys(venueSlugs).map((slug) => ({
    slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const venueName = venueSlugs[params.slug]
  if (!venueName) return {}

  return {
    title: `${venueName} | TIFI`,
    description: `Performance photos and videos from TIFI's show at ${venueName}.`,
  }
}

export default function VenuePage({ params }: { params: { slug: string } }) {
  const venueName = venueSlugs[params.slug]
  const photos = venueName ? venuePhotos[venueName as keyof typeof venuePhotos] : null
  const videos = venueName ? videosByVenue[venueName] || [] : []

  if (!venueName || !photos) {
    notFound()
  }

  const venueInfo = tifiContent.venues.find((v) => 
    v.name.toLowerCase() === venueName.toLowerCase() || 
    (venueName === 'Coffee Party' && v.name === 'NØMAD')
  )

  return (
    <>
      <Navigation />
      <main className="pt-32 min-h-screen">
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/#venues" 
              className="inline-block mb-8 text-ice-blue/80 hover:text-ice-blue transition-colors uppercase tracking-wider text-sm"
            >
              ← Back to Venues
            </Link>

            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-display mb-4">{venueName}</h1>
              {venueInfo && (
                <p className="text-xl text-white/60 uppercase tracking-wider mb-6">
                  {venueInfo.city}
                </p>
              )}
              <p className="text-lg text-white/70 max-w-2xl">
                Performance photos and videos from TIFI&apos;s show at {venueName}.
              </p>
            </div>

            {photos && photos.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-display mb-8">Photos</h2>
                <VenueGallery images={photos} venueName={venueName} />
              </div>
            )}

            {videos && videos.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-display mb-8">Videos</h2>
                <VideoGallery videos={videos} columns={2} />
              </div>
            )}

            <div className="mt-16 pt-16 border-t border-ice-blue/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-display mb-2">Book TIFI</h2>
                  <p className="text-white/70">
                    Interested in booking TIFI for your venue?
                  </p>
                </div>
                <MagneticButton href="/contact" variant="primary">
                  Contact for Booking
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
