'use client'

import { useRef, useState } from 'react'
import { OpeningScreen } from '@/components/opening-screen'
import { PhotoGallery } from '@/components/photo-gallery'
import { HangingTimeline } from '@/components/hanging-timeline'
import { MemoryDetail } from '@/components/memory-detail'
import { VinylPlayer } from '@/components/vinyl-player'
import { MontageReel } from '@/components/montage-reel'
import { LoveLetter } from '@/components/love-letter'
import { EasterEggs } from '@/components/easter-eggs'
import { memories, type Memory } from '@/lib/memories'

export default function Page() {
  const [selected, setSelected] = useState<Memory | null>(null)
  const scrapbookRef = useRef<HTMLDivElement>(null)

  function enter() { scrapbookRef.current?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <main className="relative">
      <OpeningScreen onEnter={enter} />
      <div ref={scrapbookRef}>
        <PhotoGallery memories={memories} onSelect={setSelected} />
        <HangingTimeline memories={memories} />
        <VinylPlayer />
        <MontageReel memories={memories} />
        <LoveLetter />
      </div>
      <MemoryDetail memory={selected} onClose={() => setSelected(null)} />
      <EasterEggs />
    </main>
  )
}
