'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionHeading } from './section-heading'
import type { Memory } from '@/lib/memories'

export function MontageReel({ memories }: { memories: Memory[] }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  useEffect(() => { if (!playing) return; const id = window.setTimeout(() => setIndex((i) => (i + 1) % memories.length), 3600); return () => window.clearTimeout(id) }, [index, playing, memories.length])
  const current = memories[index]
  return <section className="relative bg-ink px-6 py-24">
    <div className="[&_*]:text-cream/90"><SectionHeading kicker="roll the film" title="A Little Montage of Us" /></div>
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="relative overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-cream/10">
        <div className="absolute inset-y-0 left-0 z-20 flex w-6 flex-col items-center justify-around bg-black/80">{Array.from({ length: 8 }).map((_, i) => <span key={i} className="h-3 w-3 rounded-sm bg-cream/70" />)}</div>
        <div className="absolute inset-y-0 right-0 z-20 flex w-6 flex-col items-center justify-around bg-black/80">{Array.from({ length: 8 }).map((_, i) => <span key={i} className="h-3 w-3 rounded-sm bg-cream/70" />)}</div>
        <div className="film-grain relative mx-6 aspect-video overflow-hidden"><AnimatePresence mode="popLayout"><motion.img key={current.id} src={current.src} alt={current.title} crossOrigin="anonymous" initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1.02 }} exit={{ opacity: 0, scale: 1 }} transition={{ opacity: { duration: 0.9 }, scale: { duration: 3.8, ease: 'linear' } }} className="absolute inset-0 h-full w-full object-cover sepia-[0.15]" /></AnimatePresence><span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" /><AnimatePresence mode="wait"><motion.p key={current.id + '-cap'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-script absolute bottom-4 left-6 right-6 z-10 text-center text-3xl text-cream drop-shadow">{current.caption}</motion.p></AnimatePresence></div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4"><button onClick={() => setPlaying((p) => !p)} className="rounded-full border border-cream/30 px-6 py-2 font-serif text-base italic text-cream transition-colors hover:bg-cream/10" aria-pressed={playing}>{playing ? 'pause' : 'play'}</button><div className="flex gap-2" role="tablist" aria-label="Montage frames">{memories.map((m, i) => <button key={m.id} onClick={() => setIndex(i)} aria-label={`Go to ${m.title}`} aria-selected={i === index} className={`h-2 w-2 rounded-full transition-all ${i === index ? 'w-6 bg-rose' : 'bg-cream/40 hover:bg-cream/70'}`} />)}</div></div>
    </div>
  </section>
}
