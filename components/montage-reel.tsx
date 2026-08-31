'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionHeading } from './section-heading'
import { VideoPlayer } from './video-player'
import { videos, getVideosByCategory } from '@/lib/videos'
import type { Memory } from '@/lib/memories'

export function MontageReel({ memories }: { memories: Memory[] }) {
  const [showPhotos, setShowPhotos] = useState(true)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [montageEggTriggered, setMontageEggTriggered] = useState(false)

  const mainVideo = videos.find((v) => v.category === 'main')
  const familyVideos = getVideosByCategory('family')
  const friendVideos = getVideosByCategory('friends')

  function handleMainVideoEnded() {
    if (!montageEggTriggered && window.__discoverEasterEgg) {
      window.__discoverEasterEgg('egg-montage-final-frame')
      setMontageEggTriggered(true)
    }
  }

  // Photo slideshow logic
  useEffect(() => {
    if (!showPhotos || !playing) return
    const id = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % memories.length)
    }, 3600)
    return () => window.clearTimeout(id)
  }, [index, playing, memories.length, showPhotos])

  const current = memories[index]

  return (
    <section className="relative bg-ink px-6 py-24">
      <div className="[&_*]:text-cream/90">
        <SectionHeading
          kicker="people who love you"
          title="A Little Film Festival of Our Love"
          subtitle="Watch the moments and messages that make this day special."
        />
      </div>
      <div className="mx-auto mt-12 max-w-4xl space-y-12">
        {/* Main montage video */}
        {mainVideo && (
          <div>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-cream/70">Main Montage</p>
              <h3 className="mt-1 font-serif text-2xl font-light italic text-cream">
                {mainVideo.name}
              </h3>
            </div>
            <VideoPlayer video={mainVideo} onEnded={handleMainVideoEnded} />
          </div>
        )}

        {/* Photo slideshow fallback or alternative */}
        {showPhotos && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-cream/70">Photo Gallery</p>
                <h3 className="mt-1 font-serif text-xl font-light italic text-cream">
                  A Montage of Memories
                </h3>
              </div>
              <button
                onClick={() => setShowPhotos(false)}
                className="text-xs uppercase tracking-wider text-rose hover:text-rose/80 transition-colors"
              >
                Hide Photos
              </button>
            </div>

            <div className="relative overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-cream/10">
              <div className="absolute inset-y-0 left-0 z-20 flex w-6 flex-col items-center justify-around bg-black/80">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="h-3 w-3 rounded-sm bg-cream/70" />
                ))}
              </div>
              <div className="absolute inset-y-0 right-0 z-20 flex w-6 flex-col items-center justify-around bg-black/80">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="h-3 w-3 rounded-sm bg-cream/70" />
                ))}
              </div>
              <div className="film-grain relative mx-6 aspect-video overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={current.id}
                    src={current.src}
                    alt={current.title}
                    crossOrigin="anonymous"
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1.02 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{
                      opacity: { duration: 0.9 },
                      scale: { duration: 3.8, ease: 'linear' },
                    }}
                    className="absolute inset-0 h-full w-full object-cover sepia-[0.15]"
                  />
                </AnimatePresence>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.id + '-cap'}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-script absolute bottom-4 left-6 right-6 z-10 text-center text-3xl text-cream drop-shadow"
                  >
                    {current.caption}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="rounded-full border border-cream/30 px-6 py-2 font-serif text-base italic text-cream transition-colors hover:bg-cream/10"
                aria-pressed={playing}
              >
                {playing ? 'pause' : 'play'}
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Montage frames">
                {memories.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setIndex(i)
                      setPlaying(false)
                    }}
                    aria-label={`Go to ${m.title}`}
                    aria-selected={i === index}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === index ? 'w-6 bg-rose' : 'bg-cream/40 hover:bg-cream/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Individual family messages */}
        {familyVideos.length > 0 && (
          <div>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-cream/70">Family Messages</p>
              <h3 className="mt-1 font-serif text-xl font-light italic text-cream">
                From Those Who Raised You
              </h3>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {familyVideos.map((video) => (
                <VideoPlayer key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* Friend messages */}
        {friendVideos.length > 0 && (
          <div>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-cream/70">Friend Messages</p>
              <h3 className="mt-1 font-serif text-xl font-light italic text-cream">
                From Your Chosen Family
              </h3>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {friendVideos.map((video) => (
                <VideoPlayer key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
