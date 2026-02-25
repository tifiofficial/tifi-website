'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timeout = window.setTimeout(() => {
      setShow(false)
      window.setTimeout(onDone, reduceMotion ? 100 : 560)
    }, reduceMotion ? 240 : 2200)

    return () => clearTimeout(timeout)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ y: 95, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(70vw,460px)]"
          >
            <Image
              src="/images/tifi-logo-cropped.png"
              alt="TIFI"
              width={800}
              height={280}
              priority
              sizes="(max-width: 768px) 70vw, 460px"
              className="h-auto w-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
