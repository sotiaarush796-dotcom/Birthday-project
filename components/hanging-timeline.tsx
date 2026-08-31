'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { Polaroid } from './polaroid'
import { SectionHeading } from './section-heading'
import type { Memory } from '@/lib/memories'

export function HangingTimeline({ memories, onSelect }: { memories: Memory[]; onSelect?: (m: Memory) => void }) {
  const timelineEggTriggeredRef = useRef(false)

  function handleTimelineThreadReveal() {
    if (timelineEggTriggeredRef.current) return
    timelineEggTriggeredRef.current = true
    if (window.__discoverEasterEgg) {
      window.__discoverEasterEgg('egg-timeline-thread')
    }
  }

  return (
    <section className="relative overflow-hidden bg-secondary/40 px-6 py-24">
      <SectionHeading kicker="the way it happened" title="Strung Together, One Day at a Time" subtitle="A little clothesline of the days that made us us. Tap any memory to see more." />
      <div className="relative mx-auto mt-16 max-w-6xl">
        <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-3 h-6">
          <svg className="h-full w-full" viewBox="0 0 1000 24" preserveAspectRatio="none">
            <path d="M0 4 Q 250 24 500 8 T 1000 6" fill="none" stroke="var(--cocoa)" strokeOpacity="0.5" strokeWidth="2" />
          </svg>
        </div>
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto px-2 pb-6 pt-2">
          {memories.map((m, i) => (
            <motion.figure
              key={m.id}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative flex w-44 shrink-0 snap-center flex-col items-center"
            >
              {/* Clip/tape element */}
              <span
                className="z-10 h-4 w-2 rounded-sm bg-caramel shadow-sm"
                onMouseEnter={i === 0 ? handleTimelineThreadReveal : undefined}
                onFocus={i === 0 ? handleTimelineThreadReveal : undefined}
                onTouchStart={i === 0 ? handleTimelineThreadReveal : undefined}
                aria-label={i === 0 ? 'Hidden thread detail' : undefined}
              />
              <span className="-mt-1 h-3 w-3 rounded-full bg-caramel/70" />

              {/* Photo with swaying animation and click handler */}
              <motion.button
                onClick={() => onSelect?.(m)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-1 w-full cursor-pointer appearance-none bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
                aria-label={`View memory: ${m.title}`}
                type="button"
              >
                <div className="animate-sway [--sway-from:-2deg] [--sway-to:2deg]">
                  <Polaroid src={m.src} alt={m.title} rotate={0} />
                </div>
              </motion.button>

              {/* Date and title caption */}
              <figcaption className="mt-3 text-center">
                <p className="font-serif text-sm font-medium text-ink">{m.title}</p>
                <p className="text-xs uppercase tracking-wider text-cocoa/70">{m.date}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
      <style jsx>{`.hide-scrollbar{scrollbar-width:thin;scrollbar-color:var(--caramel) transparent}.hide-scrollbar::-webkit-scrollbar{height:6px}.hide-scrollbar::-webkit-scrollbar-thumb{background:var(--caramel);border-radius:9999px}`}</style>
    </section>
  )
}
