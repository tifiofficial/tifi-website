'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
        { src: '/videos/web/hero-01-ncg.mp4', label: 'New City Gas, Montreal', startAt: 110 },
        { src: '/videos/web/hero-02-dprtmnt-1.mp4', label: 'Dprtmnt, Toronto', startAt: 74 },
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
  const [nextReady, setNextReady] = useState(false)
  const [pendingAdvance, setPendingAdvance] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const coverStart = playlist[0].startAt ?? 0
  const coverDuration = 14
  const coverEnd = coverStart + coverDuration
  const getNextIndex = (index: number) => {
    if (index === 0) return 1
    if (index < playlist.length - 1) return index + 1
    return 1
  }
  const nextVideoIndex = getNextIndex(currentVideo)

  useEffect(() => {
    if (reduceMotion) return
    const video = videoRef.current
    if (!video) return

    const isCover = currentVideo === 0
    const startAt = playlist[currentVideo]?.startAt ?? 0
    setVideoFailed(false)
    setPendingAdvance(false)

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

    const goToNextVideo = () => {
      setCurrentVideo((prev) => {
        if (prev < playlist.length - 1) return prev + 1
        return 1
      })
    }

    const handleError = () => {
      setVideoFailed(true)
      goToNextVideo()
    }

    if (video.readyState >= 1) {
      seekToStart()
    } else {
      video.addEventListener('loadedmetadata', seekToStart)
    }
    video.addEventListener('timeupdate', keepCoverClipLoop)
    video.addEventListener('ended', goToNextVideo)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('loadedmetadata', seekToStart)
      video.removeEventListener('timeupdate', keepCoverClipLoop)
      video.removeEventListener('ended', goToNextVideo)
      video.removeEventListener('error', handleError)
    }
  }, [coverEnd, coverStart, currentVideo, playlist, reduceMotion])

  useEffect(() => {
    if (reduceMotion || playlist.length < 2) return

    const delay = currentVideo === 0 ? coverDuration * 1000 : 7000
    const cycleTimer = window.setTimeout(() => {
      if (nextReady) {
        setCurrentVideo(nextVideoIndex)
      } else {
        setPendingAdvance(true)
      }
    }, delay)

    return () => window.clearTimeout(cycleTimer)
  }, [coverDuration, currentVideo, nextReady, nextVideoIndex, playlist.length, reduceMotion])

  useEffect(() => {
    if (!pendingAdvance || !nextReady) return
    setPendingAdvance(false)
    setCurrentVideo(nextVideoIndex)
  }, [nextReady, nextVideoIndex, pendingAdvance])

  return (
    <section className="relative min-h-[100svh] overflow-hidden" aria-labelledby="hero-title">
      <motion.div style={{ y }} className="absolute inset-0">
        {!reduceMotion && !videoFailed ? (
          <div className="absolute inset-0">
            <video
              key={`${currentVideo}-${playlist[currentVideo]?.src}`}
              ref={videoRef}
              src={playlist[currentVideo]?.src}
              muted
              autoPlay
              playsInline
              preload={currentVideo === 0 ? 'auto' : 'metadata'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                videoFailed ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <video
              key={`preload-${nextVideoIndex}-${playlist[nextVideoIndex]?.src}`}
              src={playlist[nextVideoIndex]?.src}
              muted
              preload="auto"
              playsInline
              onLoadedData={() => setNextReady(true)}
              className="hidden"
              aria-hidden
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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow text-[11px] text-cream/80"
          >
            {tifiContent.brand.location}
          </motion.p>

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

          <div className="-mt-12 md:-mt-16">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-1 h-px w-28 origin-center bg-cream/70 md:w-40"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="eyebrow mx-auto max-w-xl text-sm text-cream/85 md:text-base"
            >
              {tifiContent.brand.tagline}
            </motion.p>

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
