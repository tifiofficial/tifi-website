import Link from 'next/link'
import { tifiContent } from '@/content/tifi'

const socials = [
  { name: 'Instagram', href: tifiContent.socials.instagram },
  { name: 'Spotify', href: tifiContent.socials.spotify },
  { name: 'SoundCloud', href: tifiContent.socials.soundcloud },
  { name: 'YouTube', href: tifiContent.socials.youtube },
]

export function Footer() {
  return (
    <footer className="border-t border-ice/10 px-5 py-12 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <p className="text-xs uppercase tracking-[0.18em] text-cream/55">© {new Date().getFullYear()} TIFI</p>
        <div className="flex flex-wrap gap-5">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-cream/60 hover:text-ice"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
