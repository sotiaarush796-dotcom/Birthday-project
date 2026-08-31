'use client'

import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { VideoMessage } from '@/lib/videos'

interface VideoPlayerProps {
  video: VideoMessage
  autoplay?: boolean
  onEnded?: () => void
}

export function VideoPlayer({ video, autoplay = false, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  function togglePlay() {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!videoRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = percent * duration
  }

  const progressPercent = duration ? (progress / duration) * 100 : 0
  const formattedTime = `${Math.floor(progress / 60)}:${String(Math.floor(progress % 60)).padStart(2, '0')}`
  const formattedDuration = `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`

  return (
    <div className="space-y-4">
      {/* Video container */}
      <div className="relative overflow-hidden rounded-lg bg-black">
        <video
          ref={videoRef}
          src={video.videoSrc}
          poster={video.poster}
          className="w-full"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false)
            onEnded?.()
          }}
          onTimeUpdate={(e) => {
            const target = e.currentTarget
            setProgress(target.currentTime)
          }}
          onLoadedMetadata={(e) => {
            const target = e.currentTarget
            setDuration(target.duration)
          }}
        />
        {/* Play overlay */}
        {!isPlaying && (
          <motion.button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/60"
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose/90 shadow-lg">
              <span className="text-2xl text-primary-foreground">▶</span>
            </div>
          </motion.button>
        )}
      </div>

      {/* Video info and controls */}
      <div className="space-y-3">
        <div>
          <p className="text-sm font-serif font-medium text-ink">{video.name}</p>
          <p className="text-xs text-cocoa/70">{video.relationship}</p>
          {video.message && <p className="mt-2 text-sm text-cocoa">{video.message}</p>}
        </div>

        {/* Progress bar and time */}
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

        {/* Control buttons */}
        <div className="flex gap-2">
          <button
            onClick={togglePlay}
            className="flex-1 rounded-full bg-rose px-4 py-2 font-serif text-sm italic text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  )
}
