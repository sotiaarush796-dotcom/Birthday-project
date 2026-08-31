/**
 * Song data model for the "Our Songs" vinyl-player section.
 *
 * PHASE 1 NOTE: This is architecture only. `audioSrc` values are
 * placeholder paths — no copyrighted or real audio files are included in
 * this phase. The real five tracks (and their real cover art) will be
 * supplied later and dropped into these same fields.
 *
 * Each song optionally links back to a Memory (via `memoryId`) so the
 * player can cross-reference "this song belongs to that memory" once the
 * real player UI is built in a later phase.
 */

export interface Song {
  id: string
  title: string
  artist: string
  /** Placeholder path to the audio file. Not yet a real asset. */
  audioSrc: string
  /** Cover art shown alongside the track (reuses existing memory photos as placeholders). */
  coverPhoto: string
  /** Hidden keyword revealed when this song is discovered/played through. Not shown in UI until unlocked. */
  keyword: string
  /** Optional link to the Memory (lib/memories.ts) this song is tied to. */
  memoryId?: string
  /** Short personal note shown once the track is unlocked/selected. */
  shortMessage: string
}

export const songs: Song[] = [
  {
    id: 'song-01',
    title: 'Placeholder Track One',
    artist: 'Placeholder Artist',
    audioSrc: '/music/song-01.mp3',
    coverPhoto: '/photos/memory-1.png',
    keyword: 'firstlaugh',
    memoryId: 'm1',
    shortMessage: 'This one still makes me smile the way you did that day. Real track coming soon.',
  },
  {
    id: 'song-02',
    title: 'Placeholder Track Two',
    artist: 'Placeholder Artist',
    audioSrc: '/music/song-02.mp3',
    coverPhoto: '/photos/memory-3.png',
    keyword: 'wish',
    memoryId: 'm3',
    shortMessage: 'The song that was playing when you blew out the candles. Real track coming soon.',
  },
  {
    id: 'song-03',
    title: 'Placeholder Track Three',
    artist: 'Placeholder Artist',
    audioSrc: '/music/song-03.mp3',
    coverPhoto: '/photos/memory-4.png',
    keyword: 'shoreline',
    memoryId: 'm4',
    shortMessage: 'For the long summer and the endless shoreline. Real track coming soon.',
  },
  {
    id: 'song-04',
    title: 'Placeholder Track Four',
    artist: 'Placeholder Artist',
    audioSrc: '/music/song-04.mp3',
    coverPhoto: '/photos/memory-6.png',
    keyword: 'fairylights',
    memoryId: 'm6',
    shortMessage: 'The one we danced to under the fairy lights. Real track coming soon.',
  },
  {
    id: 'song-05',
    title: 'Placeholder Track Five',
    artist: 'Placeholder Artist',
    audioSrc: '/music/song-05.mp3',
    coverPhoto: '/photos/memory-8.png',
    keyword: 'twentyone',
    memoryId: 'm8',
    shortMessage: 'For twenty-one, and every year after it. Real track coming soon.',
  },
]

export function getSongById(id: string): Song | undefined {
  return songs.find((s) => s.id === id)
}

export function getSongByKeyword(keyword: string): Song | undefined {
  return songs.find((s) => s.keyword === keyword)
}
