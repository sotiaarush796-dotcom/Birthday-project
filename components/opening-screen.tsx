'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Polaroid } from './polaroid'

export function OpeningScreen({ onEnter }: { onEnter: () => void }) {
  const [opened, setOpened] = useState(false)
  return <section className="paper-bg film-grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-16">
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40"><div className="absolute left-0 right-0 top-10 h-px bg-cocoa/40" /><div className="absolute left-[12%] top-6 animate-sway [--sway-from:-3deg] [--sway-to:1deg]"><MiniHang src="/photos/memory-2.png" rotate={-6} /></div><div className="absolute right-[14%] top-4 animate-sway [--sway-from:2deg] [--sway-to:-2deg]"><MiniHang src="/photos/memory-6.png" rotate={5} /></div></div>
    <motion.img src="/illustrations/teddy.png" alt="" aria-hidden crossOrigin="anonymous" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 0.9 }} transition={{ delay: 0.4, duration: 1 }} className="pointer-events-none absolute bottom-0 left-2 w-28 mix-blend-multiply md:left-10 md:w-40" />
    <div className="relative z-20 flex w-full max-w-xl flex-col items-center text-center">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-script text-3xl text-rose">a little something for you</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.9 }} className="mt-2 text-balance font-serif text-6xl font-light italic leading-[0.95] tracking-tight text-ink md:text-8xl">Twenty&#8209;One</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.9 }} className="mt-4 max-w-sm text-pretty font-serif text-base leading-relaxed text-cocoa">A scrapbook of us — every polaroid, every song, every folded note, stitched together by hand just for your birthday.</motion.p>
      <div className="mt-10 flex flex-col items-center"><AnimatePresence mode="wait">{!opened ? <motion.button key="envelope" onClick={() => setOpened(true)} whileHover={{ scale: 1.03, rotate: -1 }} whileTap={{ scale: 0.97 }} exit={{ scale: 0.6, opacity: 0 }} className="group relative h-28 w-44 cursor-pointer rounded-md bg-blush shadow-lg ring-1 ring-rose/30" aria-label="Open the envelope"><span className="absolute inset-x-0 top-0 h-0 w-0 border-x-[88px] border-t-[56px] border-x-transparent border-t-rose/70" /><span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream px-3 py-1 text-xs font-medium uppercase tracking-widest text-rose shadow">open me</span></motion.button> : <motion.button key="enter" initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} onClick={onEnter} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="cursor-pointer rounded-full bg-rose px-8 py-3 font-serif text-lg italic text-primary-foreground shadow-lg ring-1 ring-rose/40 transition-shadow hover:shadow-xl">open the scrapbook</motion.button>}</AnimatePresence></div>
    </div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center text-xs uppercase tracking-[0.3em] text-cocoa/60">scroll gently</motion.div>
  </section>
}

function MiniHang({ src, rotate }: { src: string; rotate: number }) { return <div className="flex flex-col items-center"><span className="h-6 w-px bg-cocoa/40" /><span className="-mb-1 h-2 w-2 rounded-full bg-rose/70 shadow" /><div className="w-20 md:w-24"><Polaroid src={src} alt="" rotate={rotate} /></div></div> }
