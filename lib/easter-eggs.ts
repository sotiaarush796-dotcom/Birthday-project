/**
 * Easter-egg data model.
 *
 * PHASE 1 NOTE: This defines the data/architecture only — NOT the visual
 * triggers. The current global click-hearts + corner teddy prototype in
 * components/easter-eggs.tsx is untouched in this phase. A later phase
 * will replace it with real per-section hidden interactions wired to
 * these definitions and to the experience context's
 * discoverEasterEgg()/isEasterEggDiscovered() functions.
 *
 * One deliberate Easter egg is defined per major section of the
 * experience, per the project brief.
 */

/** Which major section of the experience this Easter egg lives in. */
export type EasterEggSection =
  | 'opening'
  | 'gallery'
  | 'timeline'
  | 'vinyl'
  | 'montage'
  | 'love-letter'

/** How the Easter egg is meant to be discovered. Visual implementation comes in a later phase. */
export type EasterEggTriggerType =
  | 'click'
  | 'hover'
  | 'long-press'
  | 'hidden-tap'
  | 'song-complete'
  | 'video-end'
  | 'sequence'

export interface EasterEgg {
  id: string
  section: EasterEggSection
  /** Human-readable description of the intended hidden interaction (for the implementing agent, not shown to the user). */
  description: string
  triggerType: EasterEggTriggerType
  /** The keyword or reward text unlocked when this egg is found. Not exposed in any visible UI/source until discovery. */
  reward: string
  /**
   * Default/static discovered flag. Real, per-session discovery state is
   * tracked by the experience context (lib/experience-context.tsx) and
   * persisted separately — this field is only a fallback/default and
   * should not be treated as the source of truth once the context is wired in.
   */
  discovered?: boolean
}

export const easterEggs: EasterEgg[] = [
  {
    id: 'egg-opening-teddy',
    section: 'opening',
    description: 'Placeholder: a subtle tap target on/near the opening teddy illustration, easy to miss on first visit.',
    triggerType: 'hidden-tap',
    reward: 'placeholder-keyword-opening',
    discovered: false,
  },
  {
    id: 'egg-gallery-polaroid',
    section: 'gallery',
    description: 'Placeholder: one specific polaroid in the gallery reacts differently (e.g. flips or reveals a hidden note) when interacted with.',
    triggerType: 'click',
    reward: 'placeholder-keyword-gallery',
    discovered: false,
  },
  {
    id: 'egg-timeline-thread',
    section: 'timeline',
    description: 'Placeholder: a hidden detail on the hanging thread/clip of one timeline entry, discoverable on hover or long-press.',
    triggerType: 'hover',
    reward: 'placeholder-keyword-timeline',
    discovered: false,
  },
  {
    id: 'egg-vinyl-full-play',
    section: 'vinyl',
    description: 'Placeholder: letting a specific track play through to completion reveals a hidden message.',
    triggerType: 'song-complete',
    reward: 'placeholder-keyword-vinyl',
    discovered: false,
  },
  {
    id: 'egg-montage-final-frame',
    section: 'montage',
    description: 'Placeholder: reaching the end of a video message reveals a small hidden clue.',
    triggerType: 'video-end',
    reward: 'placeholder-keyword-montage',
    discovered: false,
  },
  {
    id: 'egg-love-letter-signature',
    section: 'love-letter',
    description: 'Placeholder: interacting with the signature/heart at the end of the love letter triggers the final payoff.',
    triggerType: 'long-press',
    reward: 'placeholder-final-reward',
    discovered: false,
  },
]

export function getEasterEggsBySection(section: EasterEggSection): EasterEgg[] {
  return easterEggs.filter((e) => e.section === section)
}

export function getEasterEggById(id: string): EasterEgg | undefined {
  return easterEggs.find((e) => e.id === id)
}
