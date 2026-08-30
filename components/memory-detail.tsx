'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Polaroid } from './polaroid'
import type { Memory } from '@/lib/memories'

export function MemoryDetail({ memory, onClose }: { memory: Memory | null; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    if (memory) { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden' }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [memory, onClose])

  return <AnimatePresence>{memory && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label={memory.title}>
    <motion.div initial={{ scale: 0.85, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ type: 'spring', stiffness: 240, damping: 24 }} onClick={(e) => e.stopPropagation()} className="relative grid max-h-[85svh] w-full max-w-3xl gap-6 overflow-auto rounded-lg bg-card p-6 shadow-2xl ring-1 ring-black/10 md:grid-cols-[1fr_1.1fr] md:p-8">
      <button onClick={onClose} className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-cocoa transition-colors hover:bg-rose hover:text-primary-foreground" aria-label="Close"><span className="text-lg leading-none">×</span></button>
      <div className="mx-auto w-full max-w-xs"><Polaroid src={memory.src} alt={memory.title} rotate={-3} tape /></div>
      <div className="flex flex-col justify-center"><p className="text-xs uppercase tracking-[0.25em] text-caramel">{memory.date}</p><h3 className="mt-2 font-serif text-3xl font-light italic text-ink">{memory.title}</h3><span className="mt-4 block h-px w-16 bg-caramel/60" /><p className="text-script mt-5 text-2xl leading-snug text-rose">{memory.caption}</p><p className="mt-4 text-pretty font-serif text-base leading-relaxed text-cocoa">{memory.note}</p></div>
    </motion.div>
  </motion.div>}</AnimatePresence>
}
