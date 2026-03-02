'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '@/components/MagneticButton'
import { tifiContent } from '@/content/tifi'

interface HeroVideoItem {
  src: string
  label: string
  startAt?: number
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, reduceMotion ? 0 : 40])
  const playlist = useMemo<HeroVideoItem[]>(
    () =>
      [
        { src: '/videos/web/hero-01-ncg.mp4', label: 'New City Gas, Montreal', startAt: 16 },
        { src: '/videos/web/hero-02-dprtmnt-1.mp4', label: 'Dprtmnt, Toronto' },
        { src: '/videos/web/hero-03-dprtmnt-2.mp4', label: 'Dprtmnt, Toronto' },
        { src: '/videos/web/hero-04-soluna.mp4', label: 'Soluna, Toronto' },
        { src: '/videos/web/hero-05-beachclub-1.mp4', label: 'Beachclub, Montreal' },
        { src: '/videos/web/hero-06-beachclub-2.mp4', label: 'Beachclub, Montreal' },
        { src: '/videos/web/hero-07-ncg.mp4', label: 'New City Gas, Montreal' },
        { src: '/videos/web/hero-08-coffee-party.mp4', label: 'Coffee Party, Toronto' },
      ],
    []
  )
  const [currentVideo, setCurrentVideo] = useState(0)
  const [videoFailed, setVideoFailed] = useState(false)
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0)
  const [slotVideoIndex, setSlotVideoIndex] = useState<[number, number]>([0, 1])
  const [pendingNextIndex, setPendingNextIndex] = useState<number | null>(null)
  const [preparingSlot, setPreparingSlot] = useState<0 | 1 | null>(null)
  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null])
  const coverStart = playlist[0].startAt ?? 0
  const coverDuration = 14
  const coverEnd = coverStart + coverDuration
  const getNextIndex = useCallback((index: number) => {
    if (index === 0) return 1
    if (index < playlist.length - 1) return index + 1
    return 1
  }, [playlist.length])
  const nextVideoIndex = getNextIndex(currentVideo)

  useEffect(() => {
    if (reduceMotion) return
    const video = videoRefs.current[activeSlot]
    if (!video) return

    const isCover = currentVideo === 0
    const startAt = playlist[currentVideo]?.startAt ?? 0
    setVideoFailed(false)

    const seekToStart = () => {
      try {
        video.currentTime = isCover ? coverStart : startAt
      } catch {
        // Fallback when seeking fails in some browsers/tunnels.
        video.currentTime = 0
      }
      video.play().catch(() => {
        // Browser autoplay policies can block playback on some devices.
      })
    }

    const keepCoverClipLoop = () => {
      if (!isCover) return
      if (video.currentTime >= coverEnd) {
        video.currentTime = coverStart
        video.play().catch(() => {
          // Browser autoplay policies can block playback on some devices.
        })
      }
    }

    const handleError = () => {
      setVideoFailed(true)
      setPendingNextIndex(getNextIndex(currentVideo))
    }

    if (video.readyState >= 1) {
      seekToStart()
    } else {
      video.addEventListener('loadedmetadata', seekToStart)
    }
    video.addEventListener('timeupdate', keepCoverClipLoop)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('loadedmetadata', seekToStart)
      video.removeEventListener('timeupdate', keepCoverClipLoop)
      video.removeEventListener('error', handleError)
    }
  }, [activeSlot, coverEnd, coverStart, currentVideo, getNextIndex, playlist, reduceMotion])

  useEffect(() => {
    if (reduceMotion || playlist.length < 2) return
    if (pendingNextIndex !== null || preparingSlot !== null) return

    const delay = currentVideo === 0 ? coverDuration * 1000 : 7000
    const cycleTimer = window.setTimeout(() => {
      setPendingNextIndex(nextVideoIndex)
    }, delay)

    return () => window.clearTimeout(cycleTimer)
  }, [coverDuration, currentVideo, nextVideoIndex, pendingNextIndex, playlist.length, preparingSlot, reduceMotion])

  useEffect(() => {
    if (pendingNextIndex === null) return
    const inactive = (1 - activeSlot) as 0 | 1
    setSlotVideoIndex((prev) => {
      const next: [number, number] = [...prev] as [number, number]
      next[inactive] = pendingNextIndex
      return next
    })
    setPreparingSlot(inactive)
  }, [activeSlot, pendingNextIndex])

  useEffect(() => {
    if (preparingSlot === null || pendingNextIndex === null) return
    const video = videoRefs.current[preparingSlot]
    if (!video) return

    const startAt = playlist[pendingNextIndex]?.startAt ?? 0
    const isCover = pendingNextIndex === 0

    const startPreparedVideo = () => {
      try {
        video.currentTime = isCover ? coverStart : startAt
      } catch {
        video.currentTime = 0
      }
      video
        .play()
        .then(() => {
          setActiveSlot(preparingSlot)
          setCurrentVideo(pendingNextIndex)
          setPendingNextIndex(null)
          setPreparingSlot(null)
        })
        .catch(() => {
          setPendingNextIndex(getNextIndex(pendingNextIndex))
          setPreparingSlot(null)
        })
    }

    const handleError = () => {
      setPendingNextIndex(getNextIndex(pendingNextIndex))
      setPreparingSlot(null)
    }

    if (video.readyState >= 1) {
      startPreparedVideo()
    } else {
      video.addEventListener('loadedmetadata', startPreparedVideo, { once: true })
    }
    video.addEventListener('error', handleError, { once: true })

    return () => {
      video.removeEventListener('loadedmetadata', startPreparedVideo)
      video.removeEventListener('error', handleError)
    }
  }, [coverStart, getNextIndex, pendingNextIndex, playlist, preparingSlot])

  return (
    <section className="relative min-h-[100svh] overflow-hidden" aria-labelledby="hero-title">
      <motion.div style={{ y }} className="absolute inset-0">
        {!reduceMotion && !videoFailed ? (
          <div className="absolute inset-0">
            <video
              ref={(el) => {
                videoRefs.current[0] = el
              }}
              src={playlist[slotVideoIndex[0]]?.src}
              muted
              autoPlay
              playsInline
              preload="auto"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                activeSlot === 0 && !videoFailed ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <video
              ref={(el) => {
                videoRefs.current[1] = el
              }}
              src={playlist[slotVideoIndex[1]]?.src}
              muted
              preload="auto"
              autoPlay
              playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                activeSlot === 1 && !videoFailed ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        ) : (
          <Image
            src="/images/epk-cover.png"
            alt="TIFI hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/25" />
      </motion.div>

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 pt-24 md:px-10">
        <div className="mx-auto w-full max-w-5xl text-center">
          <motion.h1 id="hero-title" className="mt-3" aria-label={tifiContent.brand.name}>
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-[min(86vw,700px)]"
            >
              <Image
                src="/images/tifi-logo-cropped.png"
                alt="TIFI"
                width={800}
                height={280}
                priority
                sizes="(max-width: 768px) 86vw, 700px"
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </motion.h1>

          <div className="-mt-8 md:-mt-10">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg"
            >
              {tifiContent.brand.soundDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-wrap justify-center gap-3"
            >
              <MagneticButton href="/contact" variant="primary">
                Book / Inquire
              </MagneticButton>
              <MagneticButton href="/press-kit" variant="secondary">
                Download EPK
              </MagneticButton>
              <MagneticButton href="/music" variant="ghost">
                Listen
              </MagneticButton>
            </motion.div>

            <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-sm border border-cream/25 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-cream/80 backdrop-blur-sm">
              <span>Now Playing</span>
              <span className="h-1 w-1 rounded-full bg-cream/80" />
              <span>{playlist[currentVideo]?.label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
