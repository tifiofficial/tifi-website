'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  download?: boolean
  onClick?: () => void
  variant?: Variant
  type?: 'button' | 'submit' | 'reset'
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-cream text-ink hover:bg-ice',
  secondary: 'border border-ice/45 text-ice hover:border-ice hover:bg-ice/10',
  ghost: 'border border-transparent text-cream hover:text-ice',
}

function Inner({ children, className, variant }: { children: React.ReactNode; className: string; variant: Variant }) {
  const ref = useRef<HTMLSpanElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const sx = useSpring(mx, { stiffness: 220, damping: 16 })
  const sy = useSpring(my, { stiffness: 220, damping: 16 })

  const onMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    mx.set(dx * 0.22)
    my.set(dy * 0.22)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-sm px-6 py-3 text-xs uppercase tracking-[0.18em] transition ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.span>
  )
}

export function MagneticButton({
  children,
  className = '',
  href,
  target,
  rel,
  download,
  onClick,
  variant = 'primary',
  type = 'button',
}: MagneticButtonProps) {
  if (href) {
    const isExternal = href.startsWith('http')
    if (isExternal || download) {
      return (
        <a href={href} target={target} rel={rel} download={download} className="inline-flex">
          <Inner variant={variant} className={className}>{children}</Inner>
        </a>
      )
    }

    return (
      <Link href={href} className="inline-flex">
        <Inner variant={variant} className={className}>{children}</Inner>
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className="inline-flex">
      <Inner variant={variant} className={className}>{children}</Inner>
    </button>
  )
}
