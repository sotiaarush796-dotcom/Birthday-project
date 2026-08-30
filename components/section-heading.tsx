'use client'

import { motion } from 'motion/react'

export function SectionHeading({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="mx-auto max-w-2xl text-center">
    <p className="text-script text-3xl text-rose">{kicker}</p>
    <h2 className="mt-1 text-balance font-serif text-4xl font-light italic tracking-tight text-ink md:text-5xl">{title}</h2>
    {subtitle && <p className="mx-auto mt-3 max-w-md text-pretty font-serif text-base leading-relaxed text-cocoa">{subtitle}</p>}
    <span className="mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-caramel to-transparent" />
  </motion.header>
}
