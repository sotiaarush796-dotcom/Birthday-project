'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Polaroid } from './polaroid'
import { SectionHeading } from './section-heading'
import type { Memory } from '@/lib/memories'

export function PhotoGallery({ memories, onSelect }: { memories: Memory[]; onSelect: (m: Memory) => void }) {
  const [specialPhotoTaps, setSpecialPhotoTaps] = useState(0)
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openMemoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current)
      if (openMemoryTimeoutRef.current) clearTimeout(openMemoryTimeoutRef.current)
    }
  }, [])

  // Easter egg: rapid taps on the final memory (m8) trigger the hidden discovery.
  // A single tap still opens the memory normally; the secret sequence cancels the
  // delayed open so the modal never blocks the required 3 rapid taps.
  function handleSpecialMemoryTap(memory: Memory) {
    if (memory.id === 'm8') {
      if (openMemoryTimeoutRef.current) clearTimeout(openMemoryTimeoutRef.current)
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current)

      const nextTapCount = specialPhotoTaps + 1

      if (nextTapCount >= 3) {
        if (window.__discoverEasterEgg) {
          window.__discoverEasterEgg('egg-gallery-polaroid')
        }
        setSpecialPhotoTaps(0)
        tapTimeoutRef.current = null
        return
      }

      setSpecialPhotoTaps(nextTapCount)
      tapTimeoutRef.current = setTimeout(() => {
        setSpecialPhotoTaps(0)
      }, 2000)

      openMemoryTimeoutRef.current = setTimeout(() => {
        onSelect(memory)
      }, 220)
      return
    }

    onSelect(memory)
  }

  return (
    <section className="paper-bg film-grain relative px-6 py-24">
      <SectionHeading
        kicker="our little archive"
        title="Moments I Pressed Between Pages"
        subtitle="Tap any polaroid to unfold the story hiding behind it."
      />
      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
        {memories.map((m, i) => (
          <motion.button
            key={m.id}
            onClick={() => handleSpecialMemoryTap(m)}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: m.rotate }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            aria-label={`Open memory: ${m.title}`}
          >
            <Polaroid src={m.src} alt={m.title} caption={m.caption} tape={i % 3 === 0} />
          </motion.button>
        ))}
      </div>
    </section>
  )
}
