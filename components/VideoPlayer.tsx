'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  className?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
}

export function VideoPlayer({
  src,
  poster,
  title,
  className = '',
  autoplay = false,
  loop = false,
  muted = true,
  controls = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPoster, setShowPoster] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user interaction required
      })
    }
  }, [autoplay])

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
      setShowPoster(false)
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="relative aspect-video overflow-hidden bg-navy/50">
        {showPoster && poster && (
          <div className="absolute inset-0 z-10">
            <Image
              src={poster}
              alt={title || 'Video thumbnail'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
            />
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 z-20 flex items-center justify-center bg-navy/20 hover:bg-navy/40 transition-colors"
                aria-label="Play video"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-ice-blue/90 flex items-center justify-center backdrop-blur-sm"
                >
                  <svg
                    className="w-8 h-8 text-navy ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </button>
            )}
          </div>
        )}

        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onPlay={() => {
            setIsPlaying(true)
            setShowPoster(false)
          }}
          onPause={() => setIsPlaying(false)}
          preload="metadata"
        />

        {title && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent">
            <p className="text-white font-display text-lg">{title}</p>
          </div>
        )}
      </div>
    </div>
  )
}
