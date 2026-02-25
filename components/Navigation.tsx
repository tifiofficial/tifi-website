'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/press-kit', label: 'Press Kit' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ice/10 bg-ink/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-10" aria-label="Primary">
        <Link href="/" className="block w-[132px] md:w-[150px]" aria-label="TIFI home">
          <Image
            src="/images/tifi-logo-cropped.png"
            alt="TIFI"
            width={800}
            height={280}
            priority
            sizes="(max-width: 768px) 132px, 150px"
            className="h-auto w-full object-contain"
          />
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="relative text-[11px] uppercase tracking-[0.24em] text-cream/80 hover:text-cream">
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-px w-full bg-ice"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
