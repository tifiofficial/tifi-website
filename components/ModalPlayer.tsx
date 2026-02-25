'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { TifiEmbed } from '@/content/tifi'

interface ModalPlayerProps {
  player: TifiEmbed | null
  onClose: () => void
}

export function ModalPlayer({ player, onClose }: ModalPlayerProps) {
  useEffect(() => {
    if (!player) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, player])

  return (
    <AnimatePresence>
      {player && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center bg-black/75 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${player.label} player`}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-sm border border-ice/30 bg-ink-soft p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-3xl">{player.label}</h3>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-ice/25 text-ice hover:bg-ice/10"
                aria-label="Close player"
              >
                <span aria-hidden>x</span>
              </button>
            </div>

            <iframe
              title={`${player.label} embed`}
              src={player.embedUrl}
              loading="lazy"
              className="h-[380px] w-full border-0 md:h-[420px]"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
