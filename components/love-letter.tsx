'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function LoveLetter() {
  const [open, setOpen] = useState(false)
  return (
    <section className="paper-bg film-grain relative flex min-h-svh flex-col items-center justify-center px-6 py-24">
      <p className="text-script text-3xl text-rose">and finally…</p>
      <h2 className="mt-1 text-balance text-center font-serif text-4xl font-light italic text-ink md:text-5xl">One Last Letter</h2>
      <div className="relative mt-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button key="closed" onClick={() => setOpen(true)} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -4 }} className="relative mx-auto flex h-52 w-full max-w-sm cursor-pointer items-center justify-center rounded-lg bg-blush shadow-xl ring-1 ring-rose/30" aria-label="Open the love letter">
              <span className="absolute inset-x-0 top-0 h-0 w-0 border-x-[calc(50vw)] border-t-[104px] border-x-transparent border-t-rose/60 [border-x-width:min(50vw,190px)]" />
              <span className="z-10 rounded-full bg-cream px-4 py-2 text-sm font-medium uppercase tracking-widest text-rose shadow">read my letter</span>
            </motion.button>
          ) : (
            <motion.article key="open" initial={{ opacity: 0, y: 30, rotateX: -12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.7 }} className="relative rounded-lg bg-card p-8 shadow-2xl ring-1 ring-black/5 md:p-10">
              <span className="tape left-6 -top-3 rotate-[-6deg] rounded-[1px]" /><span className="tape right-6 -top-3 rotate-[5deg] rounded-[1px]" />
              <p className="text-script text-3xl text-rose">My dearest birthday girl,</p>
              <div className="mt-4 space-y-4 font-serif text-base leading-relaxed text-cocoa">
                <p>Twenty-one years ago the world got a little brighter, though it had no idea yet. I do now. Every single day I get to love you, I understand it a little more.</p>
                <p>Thank you for your laugh that I would recognize in any crowd, for the way you make ordinary Tuesdays feel like something worth remembering, and for letting me keep all these little moments pressed safely between these pages.</p>
                <p>Here is to twenty-one, and to every messy, golden, wildflower year that comes after it. I will be right here, holding your hand through all of them.</p>
              </div>
              <p className="text-script mt-6 text-right text-3xl text-ink">always yours {'\u2665'}</p>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-16 text-center text-xs uppercase tracking-[0.3em] text-cocoa/60">happy 21st birthday</motion.p>
    </section>
  )
}
