/**
 * Memory / event data model.
 *
 * PHASE 1 NOTE: This is an architectural refactor only. Content below is
 * placeholder/sample data derived from the original 8 v0 memories — the
 * real personal content (extra photos, locations, people, clues, keywords,
 * video, song links) will be supplied later and dropped into these same
 * fields without further component changes.
 *
 * Backward compatibility: `src` and `rotate` are kept (mirroring the
 * original flat model) so existing components (Polaroid, PhotoGallery,
 * HangingTimeline, MemoryDetail, MontageReel) keep working unmodified.
 * New code should prefer `coverPhoto` over `src` — they currently hold the
 * same value for every entry.
 */

/** A person who appears in / is associated with a memory. Free-form label for now (e.g. a name or nickname). */
export type MemoryPerson = string

/** Metadata for a single photograph in a memory gallery. */
export interface MemoryPhoto {
  /** Path to the image file. */
  src: string
  /** Alt text for accessibility. */
  alt: string
  /** Optional caption shown below the photo in the memory detail view. */
  caption?: string
}

export interface Memory {
  /** Stable unique id, referenced by songs (songId) and elsewhere. */
  id: string
  title: string
  /** Human-readable date/era label (kept loose/poetic to match existing copy style). */
  date: string
  caption: string
  note: string

  /** Primary/hero image for this memory. Same value as `src` for now. */
  coverPhoto: string
  /** All photographs belonging to this memory/event with optional per-photo captions. */
  photos: MemoryPhoto[]

  /** Optional real-world location tied to this memory. */
  location?: string
  /** Optional list of people present in / relevant to this memory. */
  people?: MemoryPerson[]
  /** Optional Easter-egg / keyword-hunt clue text surfaced for this memory. */
  clue?: string
  /** Optional keyword unlocked by discovering this memory's secret. Should match a keyword defined in lib/songs.ts or lib/easter-eggs.ts. */
  keyword?: string
  /** Optional path to a video associated with this memory (e.g. a short clip). Not yet populated with real assets. */
  video?: string
  /** Optional link to a Song (lib/songs.ts) that this memory is tied to. */
  songId?: string

  // --- Legacy fields, retained for backward compatibility ---
  /** @deprecated Use `coverPhoto`. Kept so existing components compile/render unchanged. */
  src: string
  /** Polaroid tilt in degrees, used by existing gallery/detail components. */
  rotate: number
}

const RAW_MEMORIES: Omit<Memory, 'coverPhoto' | 'photos'>[] = [
  {
    id: 'm1',
    src: '/photos/memory-1.png',
    title: 'The First Laugh',
    date: 'Spring, Golden Hour',
    caption: 'the day everything felt lighter',
    note: 'You laughed at something I said and I decided, right then, that I wanted to keep making you laugh forever.',
    rotate: -4,
    location: 'Placeholder location — TBD',
    people: ['You', 'Me'],
    songId: 'song-01',
  },
  {
    id: 'm2',
    src: '/photos/memory-2.png',
    title: 'Roses for No Reason',
    date: 'A Tuesday',
    caption: 'because you deserve flowers on ordinary days',
    note: 'They were the same soft pink as the sweater you wore the first time we met. I noticed. I always notice.',
    rotate: 3,
    people: ['You', 'Me'],
    clue: 'Placeholder clue — what flower keeps showing up in our story?',
    keyword: 'bloom',
  },
  {
    id: 'm3',
    src: '/photos/memory-3.png',
    title: 'Make a Wish',
    date: 'Your Nineteenth',
    caption: 'candles, cake, and a room full of us',
    note: 'You closed your eyes so tight. I hope every wish you have ever made comes true, starting with this one.',
    rotate: -2,
    location: 'Placeholder location — TBD',
    people: ['You', 'Me', 'Family (placeholder)'],
    songId: 'song-02',
  },
  {
    id: 'm4',
    src: '/photos/memory-4.png',
    title: 'Where the Sky Melts',
    date: 'That Long Summer',
    caption: 'two shadows and one endless shoreline',
    note: 'We didn\u2019t say much. We didn\u2019t need to. The waves did all the talking and we just held hands.',
    rotate: 5,
    location: 'Placeholder location — TBD',
    people: ['You', 'Me'],
    songId: 'song-03',
  },
  {
    id: 'm5',
    src: '/photos/memory-5.png',
    title: 'Two Coffees, One Table',
    date: 'Every Slow Morning',
    caption: 'my favorite kind of ordinary',
    note: 'Yours with too much sugar, mine gone cold because I was too busy looking at you.',
    rotate: -3,
    people: ['You', 'Me'],
  },
  {
    id: 'm6',
    src: '/photos/memory-6.png',
    title: 'Dancing in the Lights',
    date: 'Under the Fairy Lights',
    caption: 'no music needed, we made our own',
    note: 'You stepped on my feet twice and I would happily lose those toes a thousand times over.',
    rotate: 2,
    people: ['You', 'Me'],
    songId: 'song-04',
    clue: 'Placeholder clue — what were we dancing to?',
    keyword: 'lights',
  },
  {
    id: 'm7',
    src: '/photos/memory-7.png',
    title: 'Words I Kept',
    date: 'Folded Away Safe',
    caption: 'a letter and a rose that never fully dried',
    note: 'Some things are too precious to throw out. Your handwriting is one of them.',
    rotate: -5,
    people: ['You', 'Me'],
  },
  {
    id: 'm8',
    src: '/photos/memory-8.png',
    title: 'You, in Full Bloom',
    date: 'Turning Twenty-One',
    caption: 'the birthday girl herself',
    note: 'Twenty-one years of you have made the world a softer, warmer place. Here is to all the ones still coming.',
    rotate: 4,
    location: 'Placeholder location — TBD',
    people: ['You', 'Me', 'Everyone who loves you'],
    songId: 'song-05',
  },
]

export const memories: Memory[] = RAW_MEMORIES.map((m) => ({
  ...m,
  coverPhoto: m.src,
  // Each photo includes metadata (src, alt, optional caption).
  // Currently just the cover photo; real per-memory photo galleries
  // can be extended here without changing components.
  photos: [
    {
      src: m.src,
      alt: m.title,
      caption: m.caption, // Use the memory's caption as the first photo caption
    },
  ],
}))

export function getMemoryById(id: string): Memory | undefined {
  return memories.find((m) => m.id === id)
}
