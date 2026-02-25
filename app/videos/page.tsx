import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { VideoGallery } from '@/components/VideoGallery'
import { videos } from '@/content/videos'

export const metadata = {
  title: 'Videos | TIFI',
  description: 'Watch TIFI\'s live performances and DJ sets.',
}

export default function VideosPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32 min-h-screen">
        <section className="py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-display mb-4">Videos</h1>
            <p className="text-lg text-white/70 mb-12 max-w-2xl">
              Watch TIFI&apos;s live performances, DJ sets, and behind-the-scenes content.
            </p>

            {videos.length > 0 ? (
              <VideoGallery videos={videos} columns={2} />
            ) : (
              <div className="py-32 text-center">
                <p className="text-white/60 text-lg mb-4">No videos uploaded yet.</p>
                <p className="text-white/40 text-sm">
                  Add videos to <code className="text-ice-blue/60">/content/videos.ts</code>
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
