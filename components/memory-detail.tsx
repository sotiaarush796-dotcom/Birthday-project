'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Polaroid } from './polaroid'
import type { Memory } from '@/lib/memories'

export function MemoryDetail({ memory, onClose }: { memory: Memory | null; onClose: () => void }) {
  const [photoIndex, setPhotoIndex] = useState(0)

  // Reset to first photo when a new memory is selected
  useEffect(() => {
    if (memory) {
      setPhotoIndex(0)
    }
  }, [memory])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && memory) setPhotoIndex((i) => (i - 1 + memory.photos.length) % memory.photos.length)
      if (e.key === 'ArrowRight' && memory) setPhotoIndex((i) => (i + 1) % memory.photos.length)
    }
    if (memory) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [memory, onClose])

  if (!memory) return null

  const currentPhoto = memory.photos[photoIndex]
  const hasMultiplePhotos = memory.photos.length > 1

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={memory.title}
        >
          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[85svh] w-full max-w-4xl gap-6 overflow-auto rounded-lg bg-card p-6 shadow-2xl ring-1 ring-black/10 md:grid-cols-[1fr_1.2fr] md:p-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-cocoa transition-colors hover:bg-rose hover:text-primary-foreground"
              aria-label="Close"
            >
              <span className="text-lg leading-none">×</span>
            </button>

            {/* Photo gallery section */}
            <div className="mx-auto w-full max-w-xs">
              <div className="relative">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`photo-${photoIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={currentPhoto.src}
                      alt={currentPhoto.alt}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Photo caption */}
                {currentPhoto.caption && (
                  <motion.p
                    key={`caption-${photoIndex}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-center font-serif text-sm italic text-cocoa"
                  >
                    {currentPhoto.caption}
                  </motion.p>
                )}

                {/* Photo navigation */}
                {hasMultiplePhotos && (
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <button
                      onClick={() =>
                        setPhotoIndex(
                          (i) =>
                            (i - 1 + memory.photos.length) % memory.photos.length
                        )
                      }
                      className="rounded-full border border-caramel/30 bg-secondary/50 px-3 py-2 text-sm font-medium text-cocoa transition-colors hover:bg-secondary hover:text-ink"
                      aria-label="Previous photo"
                    >
                      ← Prev
                    </button>
                    <span className="text-xs text-cocoa/70">
                      {photoIndex + 1} / {memory.photos.length}
                    </span>
                    <button
                      onClick={() =>
                        setPhotoIndex((i) => (i + 1) % memory.photos.length)
                      }
                      className="rounded-full border border-caramel/30 bg-secondary/50 px-3 py-2 text-sm font-medium text-cocoa transition-colors hover:bg-secondary hover:text-ink"
                      aria-label="Next photo"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Memory metadata section */}
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.25em] text-caramel">{memory.date}</p>
              <h3 className="mt-2 font-serif text-3xl font-light italic text-ink">{memory.title}</h3>
              <span className="mt-4 block h-px w-16 bg-caramel/60" />
              <p className="text-script mt-5 text-2xl leading-snug text-rose">{memory.caption}</p>
              <p className="mt-4 text-pretty font-serif text-base leading-relaxed text-cocoa">{memory.note}</p>

              {/* Location and people info */}
              {(memory.location || memory.people) && (
                <div className="mt-6 space-y-2 border-t border-caramel/20 pt-4">
                  {memory.location && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-caramel/70">Location</p>
                      <p className="font-serif text-sm text-cocoa">{memory.location}</p>
                    </div>
                  )}
                  {memory.people && memory.people.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-caramel/70">People</p>
                      <p className="font-serif text-sm text-cocoa">{memory.people.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Clue display */}
              {memory.clue && (
                <div className="mt-6 rounded-lg bg-rose/10 p-3">
                  <p className="text-xs uppercase tracking-wider text-rose/70">Secret Clue</p>
                  <p className="mt-1 font-serif text-sm text-rose/90">{memory.clue}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
