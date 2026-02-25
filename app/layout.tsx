import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { CursorFollower } from '@/components/CursorFollower'

export const metadata: Metadata = {
  title: 'TIFI | Producer / DJ',
  description:
    'TIFI is an international DJ and producer blending Melodic Afro House and Indie-Dance Soul for elevated spaces.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-ink text-cream antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <CursorFollower />
        <div aria-hidden className="grain-overlay" />
      </body>
    </html>
  )
}
