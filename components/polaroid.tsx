'use client'

import { cn } from '@/lib/utils'

type PolaroidProps = { src: string; alt: string; caption?: string; className?: string; rotate?: number; tape?: boolean; priority?: boolean }

export function Polaroid({ src, alt, caption, className, rotate = 0, tape = false }: PolaroidProps) {
  return <figure className={cn('relative bg-card p-3 pb-0 shadow-[0_10px_30px_-12px_oklch(0.3_0.05_45/0.45)] ring-1 ring-black/5', className)} style={{ rotate: `${rotate}deg` }}>
    {tape && <span aria-hidden className="tape left-1/2 -top-3 -translate-x-1/2 rotate-[-4deg] rounded-[1px]" />}
    <div className="relative overflow-hidden bg-muted"><img src={src || '/placeholder.svg'} alt={alt} className="aspect-square w-full object-cover" crossOrigin="anonymous" /><span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-caramel/10 via-transparent to-blush/20 mix-blend-multiply" /></div>
    {caption ? <figcaption className="text-script px-1 py-3 text-center text-2xl leading-none text-cocoa">{caption}</figcaption> : <div className="h-4" />}
  </figure>
}
