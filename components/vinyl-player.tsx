'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { SectionHeading } from './section-heading'
import { songs } from '@/lib/songs'
import { useExperience } from '@/lib/experience-context'

export function VinylPlayer() {
  const [selectedSongId, setSelectedSongId] = useState<string>(songs[0].id)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const vinylEggTriggeredRef = useRef(false)
  const { discoverKeyword } = useExperience()

  const selectedSong = songs.find((s) => s.id === selectedSongId) || songs[0]

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  // Handle song selection — stop current, load new
  useEffect(() => {
    vinylEggTriggeredRef.current = false
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setProgress(0)
      setPlaying(false)
    }
  }, [selectedSongId])

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setPlaying(true)
    const handlePause = () => setPlaying(false)
    const handleEnded = () => {
      setPlaying(false)
      if (!vinylEggTriggeredRef.current && window.__discoverEasterEgg) {
        window.__discoverEasterEgg('egg-vinyl-full-play')
        vinylEggTriggeredRef.current = true
      }
      // Trigger keyword discovery when song completes
      if (selectedSong.keyword) {
        discoverKeyword(selectedSong.keyword)
      }
    }
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration)
    }
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [selectedSong, discoverKeyword])

  function togglePlay() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = percent * duration
  }

  const progressPercent = duration ? (progress / duration) * 100 : 0
  const formattedTime = `${Math.floor(progress / 60)}:${String(Math.floor(progress % 60)).padStart(2, '0')}`
  const formattedDuration = `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`

  return (
    <section className="paper-bg film-grain relative px-6 py-24">
      <SectionHeading
        kicker="press play, love"
        title="Our Five Most Precious Songs"
        subtitle="Select a track and let it spin. Each one holds a secret waiting to be discovered."
      />

      <div className="mx-auto mt-14 max-w-4xl">
        {/* Vinyl disc and tonearm */}
        <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          {/* Disc */}
          <div className="mx-auto md:mx-0">
            <div className="relative">
              <motion.div
                animate={{ rotate: playing ? 360 : 0 }}
                transition={
                  playing
                    ? { repeat: Infinity, ease: 'linear', duration: 4 }
                    : { duration: 0.6 }
                }
                className="relative h-56 w-56 rounded-full bg-ink shadow-[0_20px_40px_-12px_oklch(0.3_0.05_45/0.5)]"
                style={{
                  backgroundImage:
                    'repeating-radial-gradient(circle at center, oklch(0.32 0.035 40) 0 2px, oklch(0.28 0.03 40) 2px 4px)',
                }}
              >
                {/* Vinyl center label */}
                <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose text-center shadow-lg">
                  <div>
                    <p className="text-script text-xl leading-none text-primary-foreground">
                      {selectedSong.title}
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-widest text-primary-foreground/80">
                      by {selectedSong.artist}
                    </p>
                  </div>
                </div>

                {/* Center spindle */}
                <div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-cream shadow-md" />
              </motion.div>

              {/* Tonearm */}
              <motion.div
                animate={{ rotate: playing ? 18 : 0 }}
                transition={{ duration: 0.6 }}
                className="absolute -right-6 -top-4 h-32 w-2 origin-top rounded-full bg-caramel shadow md:-right-8"
              >
                <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-cocoa shadow-sm" />
              </motion.div>
            </div>
          </div>

          {/* Track selection and controls */}
          <div className="flex flex-col gap-6">
            {/* Song selector */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-caramel">
                Select a Track
              </label>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {songs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => setSelectedSongId(song.id)}
                    className={`rounded-lg px-4 py-2 text-sm font-serif transition-all ${
                      selectedSongId === song.id
                        ? 'bg-rose text-primary-foreground shadow-lg'
                        : 'bg-secondary text-cocoa hover:bg-secondary/80'
                    }`}
                  >
                    {song.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="rounded-lg bg-secondary/50 p-4">
              <p className="text-xs uppercase tracking-wider text-caramel">Now Spinning</p>
              <p className="mt-2 font-serif text-xl italic text-ink">{selectedSong.title}</p>
              <p className="mt-1 text-sm text-cocoa/80">{selectedSong.artist}</p>
              <p className="mt-3 text-pretty font-serif text-sm leading-relaxed text-cocoa">
                {selectedSong.shortMessage}
              </p>
            </div>

            {/* Play button and progress */}
            <div className="space-y-3">
              <button
                onClick={togglePlay}
                className="w-full rounded-full bg-rose px-8 py-3 font-serif text-lg italic text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                {playing ? 'Pause the Music' : 'Play This Song'}
              </button>

              {/* Progress bar */}
              <div className="space-y-1">
                <div
                  onClick={handleProgressClick}
                  className="h-2 w-full cursor-pointer rounded-full bg-caramel/20 hover:bg-caramel/30"
                >
                  <div
                    className="h-full rounded-full bg-rose transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-cocoa/70">
                  <span>{formattedTime}</span>
                  <span>{formattedDuration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={selectedSong.audioSrc}
          crossOrigin="anonymous"
        />
      </div>
    </section>
  )
}
