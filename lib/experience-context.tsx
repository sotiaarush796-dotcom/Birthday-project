'use client'

/**
 * Shared "experience" state — Easter-egg discoveries, keyword unlocks,
 * unlocked songs and completed clues — plus persistence.
 *
 * PHASE 1 NOTE: This provider is architecture only. It is wired into the
 * app tree (see app/page.tsx) but nothing currently calls its discover*
 * functions — the visual Easter-egg triggers, keyword reveals and song
 * unlock UI are later-phase work. This file must stay safe to mount with
 * zero discoveries made (which is the state throughout Phase 1).
 *
 * The existing `selected` memory-modal state in app/page.tsx is
 * intentionally NOT moved into this context — it has no relationship to
 * discovery/unlock progress and moving it would add risk with no benefit.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { easterEggs } from './easter-eggs'
import { songs } from './songs'

const STORAGE_KEY = 'birthday-experience-progress:v1'

interface PersistedProgress {
  version: 1
  discoveredEasterEggs: string[]
  discoveredKeywords: string[]
  unlockedSongs: string[]
  completedClues: string[]
}

interface DiscoveryProgress {
  /** Number of distinct things discovered (Easter eggs + keywords + clues, de-duplicated is not attempted — this is a simple sum for a progress indicator). */
  discovered: number
  /** Total discoverable items known to the app right now (Easter eggs + songs' keywords). */
  total: number
  /** 0–100, rounded. 0 when total is 0 to avoid NaN/division-by-zero. */
  percentage: number
}

interface ExperienceContextValue {
  // Easter eggs
  discoveredEasterEggs: ReadonlySet<string>
  discoverEasterEgg: (id: string) => void
  isEasterEggDiscovered: (id: string) => boolean

  // Keywords
  discoveredKeywords: ReadonlySet<string>
  discoverKeyword: (keyword: string) => void
  isKeywordDiscovered: (keyword: string) => boolean

  // Songs
  unlockedSongs: ReadonlySet<string>
  unlockSong: (id: string) => void
  isSongUnlocked: (id: string) => boolean

  // Clues
  completedClues: ReadonlySet<string>
  completeClue: (id: string) => void
  isClueCompleted: (id: string) => boolean

  // Progress
  getDiscoveryProgress: () => DiscoveryProgress

  // Utility
  isReady: boolean
  resetProgress: () => void
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null)

function emptyProgress(): PersistedProgress {
  return {
    version: 1,
    discoveredEasterEggs: [],
    discoveredKeywords: [],
    unlockedSongs: [],
    completedClues: [],
  }
}

/** Safely reads and validates progress from localStorage. Never throws. Falls back to an empty progress object on any missing/corrupted/inaccessible storage. */
function loadProgress(): PersistedProgress {
  if (typeof window === 'undefined') return emptyProgress()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const parsed = JSON.parse(raw)
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      parsed.version !== 1 ||
      !Array.isArray(parsed.discoveredEasterEggs) ||
      !Array.isArray(parsed.discoveredKeywords) ||
      !Array.isArray(parsed.unlockedSongs) ||
      !Array.isArray(parsed.completedClues)
    ) {
      return emptyProgress()
    }
    return {
      version: 1,
      discoveredEasterEggs: parsed.discoveredEasterEggs.filter((x: unknown) => typeof x === 'string'),
      discoveredKeywords: parsed.discoveredKeywords.filter((x: unknown) => typeof x === 'string'),
      unlockedSongs: parsed.unlockedSongs.filter((x: unknown) => typeof x === 'string'),
      completedClues: parsed.completedClues.filter((x: unknown) => typeof x === 'string'),
    }
  } catch {
    // Corrupted JSON, storage disabled, quota errors, private-mode restrictions, etc.
    return emptyProgress()
  }
}

/** Safely persists progress to localStorage. Never throws (e.g. quota exceeded, storage disabled). */
function saveProgress(progress: PersistedProgress) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Best-effort only — persistence failures should never break the experience.
  }
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [discoveredEasterEggs, setDiscoveredEasterEggs] = useState<Set<string>>(new Set())
  const [discoveredKeywords, setDiscoveredKeywords] = useState<Set<string>>(new Set())
  const [unlockedSongs, setUnlockedSongs] = useState<Set<string>>(new Set())
  const [completedClues, setCompletedClues] = useState<Set<string>>(new Set())

  // Load persisted progress once, after mount (avoids SSR/client hydration mismatches).
  useEffect(() => {
    const loaded = loadProgress()
    setDiscoveredEasterEggs(new Set(loaded.discoveredEasterEggs))
    setDiscoveredKeywords(new Set(loaded.discoveredKeywords))
    setUnlockedSongs(new Set(loaded.unlockedSongs))
    setCompletedClues(new Set(loaded.completedClues))
    setIsReady(true)
  }, [])

  // Persist on every change, but skip the very first (pre-load) render so
  // we never overwrite stored progress with the initial empty state.
  const hasLoadedRef = useRef(false)
  useEffect(() => {
    if (!isReady) return
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true
      return
    }
    saveProgress({
      version: 1,
      discoveredEasterEggs: Array.from(discoveredEasterEggs),
      discoveredKeywords: Array.from(discoveredKeywords),
      unlockedSongs: Array.from(unlockedSongs),
      completedClues: Array.from(completedClues),
    })
  }, [isReady, discoveredEasterEggs, discoveredKeywords, unlockedSongs, completedClues])

  const discoverEasterEgg = useCallback((id: string) => {
    setDiscoveredEasterEggs((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])
  const isEasterEggDiscovered = useCallback(
    (id: string) => discoveredEasterEggs.has(id),
    [discoveredEasterEggs],
  )

  const discoverKeyword = useCallback((keyword: string) => {
    setDiscoveredKeywords((prev) => (prev.has(keyword) ? prev : new Set(prev).add(keyword)))
  }, [])
  const isKeywordDiscovered = useCallback(
    (keyword: string) => discoveredKeywords.has(keyword),
    [discoveredKeywords],
  )

  const unlockSong = useCallback((id: string) => {
    setUnlockedSongs((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])
  const isSongUnlocked = useCallback((id: string) => unlockedSongs.has(id), [unlockedSongs])

  const completeClue = useCallback((id: string) => {
    setCompletedClues((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])
  const isClueCompleted = useCallback((id: string) => completedClues.has(id), [completedClues])

  const getDiscoveryProgress = useCallback((): DiscoveryProgress => {
    // Total discoverable items currently known to the app: every defined
    // Easter egg, plus every song's keyword. (Clues are intentionally
    // excluded from the total for now since not every memory has one.)
    const total = easterEggs.length + songs.length
    const discovered = discoveredEasterEggs.size + discoveredKeywords.size
    const percentage = total === 0 ? 0 : Math.round((Math.min(discovered, total) / total) * 100)
    return { discovered, total, percentage }
  }, [discoveredEasterEggs, discoveredKeywords])

  const resetProgress = useCallback(() => {
    setDiscoveredEasterEggs(new Set())
    setDiscoveredKeywords(new Set())
    setUnlockedSongs(new Set())
    setCompletedClues(new Set())
    saveProgress(emptyProgress())
  }, [])

  const value = useMemo<ExperienceContextValue>(
    () => ({
      discoveredEasterEggs,
      discoverEasterEgg,
      isEasterEggDiscovered,
      discoveredKeywords,
      discoverKeyword,
      isKeywordDiscovered,
      unlockedSongs,
      unlockSong,
      isSongUnlocked,
      completedClues,
      completeClue,
      isClueCompleted,
      getDiscoveryProgress,
      isReady,
      resetProgress,
    }),
    [
      discoveredEasterEggs,
      discoverEasterEgg,
      isEasterEggDiscovered,
      discoveredKeywords,
      discoverKeyword,
      isKeywordDiscovered,
      unlockedSongs,
      unlockSong,
      isSongUnlocked,
      completedClues,
      completeClue,
      isClueCompleted,
      getDiscoveryProgress,
      isReady,
      resetProgress,
    ],
  )

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}

export function useExperience(): ExperienceContextValue {
  const ctx = useContext(ExperienceContext)
  if (!ctx) {
    throw new Error('useExperience must be used within an <ExperienceProvider>')
  }
  return ctx
}
