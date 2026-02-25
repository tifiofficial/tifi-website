'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VideoPlayer } from './VideoPlayer'
import { Video } from '@/content/videos'
import Image from 'next/image'

interface VideoGalleryProps {
  videos: Video[]
  columns?: 1 | 2 | 3
}

export function VideoGallery({ videos, columns = 2 }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {videos.map((video, index) => (
          <motion.div
            key={video.src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(index)}
          >
            <div className="relative aspect-video overflow-hidden bg-navy/50">
              {video.poster ? (
                <Image
                  src={video.poster}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-ice-blue/20 to-teal-accent/10 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-ice-blue/40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-ice-blue/90 flex items-center justify-center backdrop-blur-sm">
                  <svg
                    className="w-8 h-8 text-navy ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {video.title && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-display text-lg">{video.title}</p>
                  {video.description && (
                    <p className="text-white/70 text-sm mt-1">{video.description}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-navy/80 hover:bg-navy text-ice-blue text-2xl transition-colors"
                aria-label="Close"
              >
                ×
              </button>

              <VideoPlayer
                src={videos[selectedVideo].src}
                poster={videos[selectedVideo].poster}
                title={videos[selectedVideo].title}
                controls
                autoplay
                muted={false}
              />

              {videos.length > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() =>
                      setSelectedVideo(
                        selectedVideo === 0 ? videos.length - 1 : selectedVideo - 1
                      )
                    }
                    className="px-6 py-2 border border-ice-blue/30 text-ice-blue hover:bg-ice-blue hover:text-navy transition-colors uppercase tracking-wider text-sm"
                  >
                    Previous
                  </button>
                  <span className="text-white/60 text-sm">
                    {selectedVideo + 1} / {videos.length}
                  </span>
                  <button
                    onClick={() =>
                      setSelectedVideo(
                        selectedVideo === videos.length - 1 ? 0 : selectedVideo + 1
                      )
                    }
                    className="px-6 py-2 border border-ice-blue/30 text-ice-blue hover:bg-ice-blue hover:text-navy transition-colors uppercase tracking-wider text-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
