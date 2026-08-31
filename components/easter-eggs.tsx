'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useExperience } from '@/lib/experience-context'

type DiscoveryNotification = { id: number; eggId: string }

/**
 * Easter egg discovery system. Manages per-section hidden interactions
 * and connects discoveries to the ExperienceProvider for persistence.
 *
 * Section components call discoverEasterEgg() via the global trigger system
 * when a hidden interaction is found (tap teddy, specific polaroid, hover thread, etc.)
 */

export function EasterEggs() {
  const { discoverEasterEgg, isEasterEggDiscovered } = useExperience()
  const [notifications, setNotifications] = useState<DiscoveryNotification[]>([])
  const nextIdRef = useRef(0)

  // Global handler called by section components when they detect a trigger
  const handleDiscovery = (eggId: string) => {
    if (!isEasterEggDiscovered(eggId)) {
      discoverEasterEgg(eggId)
      const id = nextIdRef.current++
      setNotifications((prev) => [...prev, { id, eggId }])
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }, 2500)
    }
  }

  // Register global trigger handler
  useEffect(() => {
    ;(window as any).__discoverEasterEgg = handleDiscovery
    return () => {
      delete (window as any).__discoverEasterEgg
    }
  }, [handleDiscovery])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2"
          >
            <div className="rounded-full bg-rose px-6 py-3 shadow-xl">
              <p className="font-serif text-sm italic text-primary-foreground">
                ✨ Secret discovered!
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
