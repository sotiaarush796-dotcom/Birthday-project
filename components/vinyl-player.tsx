'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { SectionHeading } from './section-heading'

const NOTES = [220.0, 277.18, 329.63, 440.0, 329.63, 277.18, 246.94, 329.63, 392.0, 493.88, 392.0, 329.63]

export function VinylPlayer() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<number | null>(null)
  const stepRef = useRef(0)
  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); ctxRef.current?.close() }, [])
  function playNote(ctx: AudioContext, freq: number, time: number) {
    const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'triangle'; osc.frequency.value = freq; osc.connect(gain); gain.connect(ctx.destination); gain.gain.setValueAtTime(0.0001, time); gain.gain.exponentialRampToValueAtTime(0.16, time + 0.05); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.9); osc.start(time); osc.stop(time + 1)
  }
  function toggle() {
    if (playing) { if (timerRef.current) window.clearInterval(timerRef.current); timerRef.current = null; setPlaying(false); return }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = ctxRef.current ?? new AudioCtx(); ctxRef.current = ctx; if (ctx.state === 'suspended') ctx.resume()
    const tick = () => { const freq = NOTES[stepRef.current % NOTES.length]; playNote(ctx, freq, ctx.currentTime); if (stepRef.current % 3 === 0) playNote(ctx, freq / 1.5, ctx.currentTime); stepRef.current += 1 }
    tick(); timerRef.current = window.setInterval(tick, 520); setPlaying(true)
  }
  return <section className="paper-bg film-grain relative px-6 py-24">
    <SectionHeading kicker="press play, love" title="The Song That Sounds Like You" subtitle="Drop the needle and let our little melody spin." />
    <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16">
      <div className="relative"><motion.div animate={{ rotate: playing ? 360 : 0 }} transition={playing ? { repeat: Infinity, ease: 'linear', duration: 4 } : { duration: 0.6 }} className="relative h-56 w-56 rounded-full bg-ink shadow-[0_20px_40px_-12px_oklch(0.3_0.05_45/0.5)] md:h-64 md:w-64" style={{ backgroundImage: 'repeating-radial-gradient(circle at center, oklch(0.32 0.035 40) 0 2px, oklch(0.28 0.03 40) 2px 4px)' }}><div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose text-center"><div><p className="text-script text-2xl leading-none text-primary-foreground">our song</p><p className="mt-1 text-[10px] uppercase tracking-widest text-primary-foreground/80">side A</p></div></div><div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-cream" /></motion.div><motion.div aria-hidden animate={{ rotate: playing ? 18 : 0 }} transition={{ duration: 0.6 }} className="absolute -right-6 -top-4 h-32 w-2 origin-top rounded-full bg-caramel shadow md:-right-8"><span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-cocoa" /></motion.div></div>
      <div className="max-w-xs text-center md:text-left"><p className="font-serif text-2xl font-light italic text-ink">&ldquo;Everything, Softly&rdquo;</p><p className="mt-1 text-sm uppercase tracking-wider text-cocoa/70">for the birthday girl</p><p className="mt-4 text-pretty font-serif text-base leading-relaxed text-cocoa">Some feelings are too big for words, so I turned them into a tune. It loops forever — a lot like the way I think about you.</p><button onClick={toggle} className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3 font-serif text-lg italic text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95" aria-pressed={playing}>{playing ? 'pause the record' : 'play our song'}</button></div>
    </div>
  </section>
}
