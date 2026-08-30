'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type Heart = { id: number; x: number; y: number; hue: number }
const SECRETS = ['psst… you found me. I love you more than yesterday.','secret #2: you are my favorite hello and hardest goodbye.','secret #3: happy 21st, my whole heart.','keep tapping… I have endless reasons to adore you.']

export function EasterEggs() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [secretIndex, setSecretIndex] = useState(-1)
  const spawn = useCallback((x: number, y: number) => { const id = Date.now() + Math.random(); setHearts((h) => [...h, { id, x, y, hue: Math.random() * 30 }]); window.setTimeout(() => setHearts((h) => h.filter((heart) => heart.id !== id)), 1400) }, [])
  useEffect(() => { function onClick(e: MouseEvent) { spawn(e.clientX, e.clientY) }; window.addEventListener('click', onClick); return () => window.removeEventListener('click', onClick) }, [spawn])
  return <>
    <div className="pointer-events-none fixed inset-0 z-[60]"><AnimatePresence>{hearts.map((h) => <motion.span key={h.id} initial={{ opacity: 0.9, scale: 0.4, x: h.x - 10, y: h.y - 10 }} animate={{ opacity: 0, scale: 1.3, y: h.y - 90 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: 'easeOut' }} className="absolute text-2xl" style={{ color: `oklch(0.72 0.12 ${18 + h.hue})` }} aria-hidden>♥</motion.span>)}</AnimatePresence></div>
    <button onClick={(e) => { e.stopPropagation(); setSecretIndex((i) => (i + 1) % SECRETS.length) }} className="fixed bottom-4 right-4 z-[61] flex h-14 w-14 items-center justify-center rounded-full bg-card/70 shadow-lg ring-1 ring-rose/20 backdrop-blur transition-transform hover:scale-110" aria-label="A hidden surprise"><img src="/illustrations/teddy.png" alt="" aria-hidden crossOrigin="anonymous" className="h-10 w-10 object-contain mix-blend-multiply" /></button>
    <AnimatePresence>{secretIndex >= 0 && <motion.div key={secretIndex} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="text-script fixed bottom-20 right-4 z-[61] max-w-[220px] rounded-lg bg-rose px-4 py-3 text-center text-xl leading-tight text-primary-foreground shadow-xl">{SECRETS[secretIndex]}</motion.div>}</AnimatePresence>
  </>
}
