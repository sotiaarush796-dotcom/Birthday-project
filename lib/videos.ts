/**
 * Video message data model for the "People Who Love You" section
 * (main edited montage + individual family/friend messages).
 *
 * PHASE 1 NOTE: This is architecture only. `videoSrc` and `poster` are
 * placeholder paths — no real video files are included in this phase.
 * The current MontageReel component still uses an image slideshow; wiring
 * this data model into a real <video> player is Phase 2+ work.
 */

export type VideoCategory = 'main' | 'family' | 'friends'

export interface VideoMessage {
  id: string
  /** Display name of the speaker. For the main montage this can be a generic label. */
  name: string
  /** How this person relates to the birthday person (e.g. "Best Friend", "Sister"). */
  relationship: string
  /** Placeholder path to the video file. Not yet a real asset. */
  videoSrc: string
  /** Placeholder poster/thumbnail image, reusing existing photos for now. */
  poster: string
  /** Optional caption/message shown alongside the video. */
  message?: string
  /** Approximate duration label, e.g. "2:14". Placeholder until real footage exists. */
  duration: string
  category: VideoCategory
}

export const videos: VideoMessage[] = [
  {
    id: 'video-main-montage',
    name: 'Our Birthday Montage',
    relationship: 'Everyone who loves you',
    videoSrc: '/videos/main-montage.mp4',
    poster: '/photos/memory-8.png',
    message: 'A little edited film of the year, just for you. Real footage coming soon.',
    duration: '0:00',
    category: 'main',
  },
  {
    id: 'video-family-01',
    name: 'Placeholder Family Member',
    relationship: 'Family (placeholder)',
    videoSrc: '/videos/family-01.mp4',
    poster: '/photos/memory-3.png',
    message: 'A message from someone who has loved you your whole life. Real clip coming soon.',
    duration: '0:00',
    category: 'family',
  },
  {
    id: 'video-friend-01',
    name: 'Placeholder Friend One',
    relationship: 'Friend (placeholder)',
    videoSrc: '/videos/friend-01.mp4',
    poster: '/photos/memory-5.png',
    message: 'A quick birthday message from a friend. Real clip coming soon.',
    duration: '0:00',
    category: 'friends',
  },
  {
    id: 'video-friend-02',
    name: 'Placeholder Friend Two',
    relationship: 'Friend (placeholder)',
    videoSrc: '/videos/friend-02.mp4',
    poster: '/photos/memory-6.png',
    message: 'Another friend, another reason to smile today. Real clip coming soon.',
    duration: '0:00',
    category: 'friends',
  },
]

export function getVideosByCategory(category: VideoCategory): VideoMessage[] {
  return videos.filter((v) => v.category === category)
}

export function getVideoById(id: string): VideoMessage | undefined {
  return videos.find((v) => v.id === id)
}
