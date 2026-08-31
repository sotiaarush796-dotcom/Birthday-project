'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useExperience } from '@/lib/experience-context'

/**
 * Discovery progress indicator shown as a subtle UI element.
 * When all clues are discovered, shows a special "unlock complete" state.
 */

export function DiscoveryProgress() {
  const { getDiscoveryProgress, isFinalUnlockComplete } = useExperience()
  const progress = getDiscoveryProgress()
  const isComplete = isFinalUnlockComplete()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-card/80 px-4 py-3 shadow-lg backdrop-blur ring-1 ring-rose/20"
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-start">
          <p className="text-xs uppercase tracking-widest text-caramel">
            {isComplete ? '✨ All secrets unlocked!' : 'Clues discovered'}
          </p>
          <p className="text-sm font-serif font-medium text-ink">
            {progress.discovered} / {progress.total}
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose to-blush p-1">
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-card">
            <svg
              className="h-full w-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-secondary/30"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress.percentage / 100)}`}
                className="text-rose transition-all duration-500"
              />
            </svg>
            <span className="absolute text-xs font-serif font-medium text-cocoa">
              {progress.percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Final unlock notification */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-full mb-3 rounded-lg bg-rose px-4 py-3 text-center shadow-lg"
          >
            <p className="font-serif text-sm italic text-primary-foreground">
              You've found everything. Return to the letter to see what's waiting.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
