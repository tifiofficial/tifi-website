'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface VenueGalleryProps {
  images: string[]
  venueName: string
}

export function VenueGallery({ images, venueName }: VenueGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={src}
              alt={`${venueName} performance ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-navy/80 hover:bg-navy text-ice-blue text-2xl transition-colors"
                aria-label="Close"
              >
                ×
              </button>
              
              <div className="relative w-full h-[80vh]">
                <Image
                  src={images[selectedImage]}
                  alt={`${venueName} performance ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {images.length > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev! - 1))}
                    className="px-6 py-2 border border-ice-blue/30 text-ice-blue hover:bg-ice-blue hover:text-navy transition-colors uppercase tracking-wider text-sm"
                  >
                    Previous
                  </button>
                  <span className="text-white/60 text-sm">
                    {selectedImage + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev! + 1))}
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
