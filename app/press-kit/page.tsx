import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PressKitContent } from '@/components/PressKitContent'

export const metadata = {
  title: 'Press Kit | TIFI',
  description: 'EPK profile and PDF download for TIFI.',
}

export default function PressKitPage() {
  return (
    <>
      <Navigation />
      <main>
        <PressKitContent />
      </main>
      <Footer />
    </>
  )
}
