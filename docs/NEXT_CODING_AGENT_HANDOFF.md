# Next Coding Agent Handoff — Interactive 21st Birthday Scrapbook

## Mission

Continue development from the existing v0 build in this repository. **Do not rebuild from scratch.** Preserve the existing visual language and working components while transforming the prototype into a polished, personal interactive birthday experience.

## Read first

1. `README.md`
2. `docs/PROJECT_BRIEF.md`
3. `docs/AGENT_HANDOFF.md`
4. `docs/CONTENT_SCHEMA.md`
5. The entire existing `app/`, `components/`, and `lib/` tree

## Current v0 baseline

The imported build is a Next.js 16 + React 19 + Tailwind CSS v4 project using Motion for animation. Existing sections/components include:

- opening screen / envelope entry
- Polaroid photo gallery
- horizontal hanging timeline
- memory detail modal
- synthetic vinyl/audio prototype
- film-strip montage prototype
- final love letter
- global Easter-egg prototype
- warm paper/scrapbook visual system

Existing placeholder content and assets are intentionally kept as the baseline.

## Required transformation

### 1. Gallery

Turn the current gallery into a richer archive. Each memory/event must be able to contain many photographs, not only one cover image. Clicking a memory should open a dedicated memory experience or modal with:

- cover image
- date/title
- personal note
- all photographs from that period
- optional short caption per photograph
- smooth photo transitions
- close/back behavior

Use structured data so the owner can add memories/photos without rewriting components.

### 2. Timeline

Keep the horizontal hanging-clothesline concept, but make it feel physical and premium:

- horizontal scroll on desktop and touch swipe on mobile
- photographs visibly hanging from individual strings/clips
- subtle independent sway
- date/event markers
- clicking a timeline memory opens its full memory collection
- no generic card-grid replacement
- preserve the scrapbook aesthetic

### 3. Vinyl / music

Replace the current synthetic Web Audio melody prototype with a real five-track player architecture.

Requirements:

- animated vinyl record
- tonearm animation
- five selectable songs
- play/pause
- one active track at a time
- visible track title/metadata
- touch-friendly controls
- audio only starts after user interaction
- stop/cleanup correctly when switching tracks or leaving the experience
- do not autoplay protected audio

Keep the audio files configurable through data/asset paths.

### 4. Keyword system

Each of the five songs should have a hidden keyword associated with it.

The user should discover keywords through the experience rather than seeing them immediately.

Architecture should support:

- song -> keyword mapping
- keyword discovery state
- progress tracking
- final unlock condition
- a final reward/message when all required clues are found

Do not expose the secret keywords in visible source UI.

### 5. Easter eggs

The current global click-heart behavior is only a prototype and must NOT remain the main Easter-egg system.

Implement a deliberate hidden discovery system with at least one meaningful secret interaction in each major section.

Examples of interaction patterns:

- tiny teddy interaction
- unusual photograph
- hidden symbol
- hover/tap detail
- subtle object that reacts differently
- music clue
- video-end clue

Easter eggs should feel discoverable but not obvious.

Track discoveries so the experience can build toward a final secret.

### 6. Video corner

Replace the current image-based montage prototype with an architecture that supports:

- one main edited birthday montage video
- separate family/friend message videos
- poster/thumbnail images
- play/pause
- responsive video player
- graceful loading/error states
- optional captions/names

Video assets must be configurable and should not be embedded as enormous source blobs in components.

### 7. Love letter

Preserve the envelope concept but make the final section the emotional climax.

Desired flow:

1. quiet transition into final section
2. hanging/physical envelope
3. click/tap to open
4. envelope animation
5. handwritten-style letter reveal
6. personal signature
7. final Easter-egg payoff or secret message

The actual personal letter will be supplied later. Use clearly marked placeholder content for now.

### 8. Emotional progression

The site should feel like a story:

`cute opening → nostalgia → memories → intimacy → music → people → mystery → love letter → emotional payoff`

Avoid making every section equally decorated or equally animated.

## Visual direction

Keep and refine:

- warm cream/parchment
- blush pink
- muted rose
- caramel
- soft cocoa/brown
- paper texture
- subtle film grain
- Polaroids
- string/clothesline
- tape/clips
- restrained teddy motif
- handwritten typography
- editorial serif typography

Avoid:

- generic Valentine's templates
- excessive hearts
- neon colors
- excessive gradients
- childish UI
- excessive motion
- generic SaaS cards

## Engineering rules

- Inspect before editing.
- Do not delete working components merely to simplify the project.
- Prefer extending the current architecture.
- Keep content/data separate from presentation.
- Keep personal media paths configurable.
- Make desktop and mobile first-class experiences.
- Respect `prefers-reduced-motion` where practical.
- Avoid unnecessary dependencies.
- Fix TypeScript/build issues rather than hiding new ones.
- Do not add secrets/API keys to the repository.
- Do not commit raw `node_modules`, `.next`, `.vercel`, or environment files.

## Suggested data architecture

Expand `lib/memories.ts` or introduce a dedicated data module so a memory can contain:

- id
- date
- title
- cover image
- caption
- note
- rotation
- gallery[]
- optional video
- optional song
- optional clue

Introduce separate data structures for songs, videos/messages, Easter eggs and unlock state rather than hardcoding them into visual components.

## Definition of done for this agent

Before declaring completion:

1. Run a production build.
2. Verify every route/section renders.
3. Verify every interactive control.
4. Verify keyboard Escape/close behavior where applicable.
5. Verify mobile layout.
6. Verify audio lifecycle.
7. Verify video lifecycle.
8. Verify Easter-egg state persistence during the session.
9. Verify no missing local asset references.
10. Summarize changed files and remaining placeholders.

## Important handoff principle

This repository is the single source of truth. Future agents must work from the latest repository state and this document. Never replace the project with a fresh generic generated website unless explicitly instructed.
