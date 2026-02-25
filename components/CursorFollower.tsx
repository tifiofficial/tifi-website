'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CursorFollower() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const sx = useSpring(x, { damping: 22, stiffness: 260 })
  const sy = useSpring(y, { damping: 22, stiffness: 260 })

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer:fine)').matches
    if (reduceMotion || !finePointer) {
      return
    }

    const move = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setEnabled(true)
    }

    const leave = () => setEnabled(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] h-6 w-6 rounded-full border border-ice/70 bg-ice/10 mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  )
}
