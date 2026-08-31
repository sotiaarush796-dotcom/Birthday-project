'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useExperience } from '@/lib/experience-context'
import { loveLetterContent } from '@/lib/love-letter'

export function LoveLetter() {
  const [open, setOpen] = useState(false)
  const { isFinalUnlockComplete } = useExperience()
  const openClickCountRef = useRef(0)
  const isUnlocked = isFinalUnlockComplete()

  function handleOpenClick() {
    if (!open) {
      setOpen(true)
      return
    }

    // Trigger the easter egg on second open (if not already complete)
    if (!isUnlocked) {
      openClickCountRef.current++
      if (openClickCountRef.current >= 2) {
        // Note: This is the easter egg trigger for the love letter
        // but the P.S. will only show when isFinalUnlockComplete() is true
        if (window.__discoverEasterEgg) {
          window.__discoverEasterEgg('egg-love-letter-signature')
        }
      }
    }
  }

  return (
    <section className="paper-bg film-grain relative flex min-h-svh flex-col items-center justify-center px-6 py-24">
      <p className="text-script text-3xl text-rose">{loveLetterContent.tagline}</p>
      <h2 className="mt-1 text-balance text-center font-serif text-4xl font-light italic text-ink md:text-5xl">
        {loveLetterContent.heading}
      </h2>
      <div className="relative mt-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="closed"
              onClick={handleOpenClick}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -4 }}
              className="relative mx-auto flex h-52 w-full max-w-sm cursor-pointer items-center justify-center rounded-lg bg-blush shadow-xl ring-1 ring-rose/30"
              aria-label="Open the love letter"
            >
              <span className="absolute inset-x-0 top-0 h-0 w-0 border-x-[calc(50vw)] border-t-[104px] border-x-transparent border-t-rose/60 [border-x-width:min(50vw,190px)]" />
              <span className="z-10 rounded-full bg-cream px-4 py-2 text-sm font-medium uppercase tracking-widest text-rose shadow">
                read my letter
              </span>
            </motion.button>
          ) : (
            <motion.article
              key="open"
              initial={{ opacity: 0, y: 30, rotateX: -12 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-lg bg-card p-8 shadow-2xl ring-1 ring-black/5 md:p-10"
            >
              <span className="tape left-6 -top-3 rotate-[-6deg] rounded-[1px]" />
              <span className="tape right-6 -top-3 rotate-[5deg] rounded-[1px]" />
              <p className="text-script text-3xl text-rose">{loveLetterContent.opening}</p>
              <div className="mt-4 space-y-4 font-serif text-base leading-relaxed text-cocoa">
                {loveLetterContent.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <p className="text-script mt-6 text-right text-3xl text-ink">
                {loveLetterContent.closing}
              </p>

              {/* Hidden final message — revealed when ALL discoveries complete */}
              <AnimatePresence>
                {isUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 border-t border-caramel/30 pt-4"
                  >
                    <p className="text-xs uppercase tracking-widest text-caramel/70">
                      {loveLetterContent.postscript.label}
                    </p>
                    <p className="mt-3 font-serif text-sm leading-relaxed italic text-cocoa/90">
                      {loveLetterContent.postscript.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Close button */}
              <motion.button
                onClick={() => {
                  setOpen(false)
                  openClickCountRef.current = 0
                }}
                className="mt-6 w-full rounded-full border border-caramel/30 bg-secondary/30 py-2 text-sm font-medium uppercase tracking-wider text-cocoa transition-colors hover:bg-secondary/60"
              >
                Close the Letter
              </motion.button>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center text-xs uppercase tracking-[0.3em] text-cocoa/60"
      >
        {loveLetterContent.footer}
      </motion.p>
    </section>
  )
}
