# AI Agent Handoff Protocol

This repository is the single source of truth for the birthday website.

## Before any agent edits

1. Inspect the repository.
2. Read `README.md`.
3. Read `/docs/PROJECT_BRIEF.md`.
4. Read any existing architecture/design/content documents.
5. Identify the current working state before changing anything.
6. Preserve existing functionality unless the task explicitly requires replacing it.

## Agent roles

### v0
Use for visual/interface generation and initial frontend concepts.
Do not use it to repeatedly rebuild a mature codebase.

### Lovable / app builder
Use for converting the approved design/specification into a working application and making contained feature changes.
Must inspect the existing implementation first.

### Claude Code
Use for complex interaction engineering, animation logic, state management, audio behavior, timeline behavior and debugging.

### Cursor
Use as the main development workspace for multi-file implementation, refinement, refactoring and local iteration.

### Codex
Use for code review, production hardening, debugging and final QA where appropriate.

## Rules for all agents

- Do not overwrite the project from scratch unless explicitly instructed.
- Do not remove a working feature to implement a simpler substitute.
- Do not replace the visual identity with a generic template.
- Do not add dependencies without a reason.
- Do not commit secrets.
- Do not commit raw private credentials.
- Keep personal media organized and intentional.
- Prefer data-driven content over hardcoded repeated markup.
- Document important architectural decisions.
- Make small, reviewable changes where practical.

## Handoff format

After substantial work, the agent should report:

- What changed
- Files changed
- New dependencies
- Known issues
- What remains to be implemented
- How the next agent should continue

## Branch strategy

`main` = stable source of truth.

Feature work should preferably happen on a dedicated branch and be reviewed before merging into `main`.

Suggested branches:

- `feature/gallery`
- `feature/timeline`
- `feature/music`
- `feature/videos`
- `feature/easter-eggs`
- `feature/love-letter`
- `polish/mobile`
- `fix/audio`
- `fix/animation`
