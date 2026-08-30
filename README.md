# A 21st Birthday — Interactive Love Story

A private, interactive birthday experience designed as a digital scrapbook, memory gallery, music player, video archive, Easter-egg hunt, and handwritten love letter.

## Project status

**Phase:** Repository foundation established. The complete v0 build will be imported next.

## Experience map

1. **Opening** — cinematic welcome, warm scrapbook aesthetic, teddy motif, subtle motion.
2. **Love Gallery** — Polaroid/photo gallery with categories and full-screen memory viewing.
3. **Our Timeline** — horizontal-scrolling hanging photographs on threads; each event opens its own collection of memories.
4. **Our Songs** — animated vinyl record with five selectable songs, click/touch-to-play behavior, and song-linked keywords.
5. **People Who Love You** — edited birthday montage plus individual family/friend messages.
6. **Easter Eggs** — one subtle discovery per major section, forming a connected secret.
7. **Love Letter** — final hanging envelope/letter reveal with a quiet emotional finish.

## Design direction

Warm, intimate, handmade and premium — not a generic Valentine's template.

Core visual language:
- warm cream / parchment
- blush / muted rose
- caramel / soft brown
- Polaroid photographs
- hanging threads and clips
- paper textures and subtle film grain
- handwritten/editorial typography
- restrained teddy-bear illustrations
- ribbons, flowers and envelopes
- soft cinematic transitions

## Development rule

The GitHub repository is the **single source of truth**. AI agents must inspect the existing project before making changes and must preserve working functionality and the established visual language.

Do not rebuild the site from scratch when a working implementation already exists.

## Agent workflow

`v0 build → repository → app/coding agent → interaction engineering → QA → final polish`

The project documentation in `/docs` is the handoff layer between agents.

## Important

Do not commit private keys, API tokens, passwords, or other secrets.

Large personal media files should be handled deliberately; do not blindly commit an entire raw photo/video library until the final asset/deployment strategy is chosen.
