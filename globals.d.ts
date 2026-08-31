/**
 * Global window augmentations for Easter egg discovery and experience state.
 */

declare global {
  interface Window {
    __discoverEasterEgg?: (eggId: string) => void
    __isEasterEggDiscovered?: (eggId: string) => boolean
  }
}

export {}
