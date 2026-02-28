import {isMac, normalizeKey} from './matcher'

/**
 * Format a single key for display
 * @internal
 */
export function formatKey(key: string, platform?: 'mac' | 'other'): string {
  const detectedPlatform = platform ?? (isMac() ? 'mac' : 'other')
  const normalized = normalizeKey(key)

  if (detectedPlatform === 'mac') {
    switch (normalized) {
      case 'meta':
      case 'mod':
        return '⌘'
      case 'shift':
        return '⇧'
      case 'alt':
        return '⌥'
      case 'ctrl':
        return '⌃'
      case 'escape':
        return 'Esc'
      default:
        return normalized.toUpperCase()
    }
  } else {
    switch (normalized) {
      case 'meta':
        return 'Win'
      case 'mod':
      case 'ctrl':
        return 'Ctrl'
      case 'shift':
        return 'Shift'
      case 'alt':
        return 'Alt'
      case 'escape':
        return 'Esc'
      default:
        // Capitalize first letter for display
        return normalized.charAt(0).toUpperCase() + normalized.slice(1)
    }
  }
}

/**
 * Format a chord binding for display
 */
export function formatChord(keys: string[]): string {
  const platform = isMac() ? 'mac' : 'other'
  return keys.map((k) => formatKey(k)).join(platform === 'mac' ? '' : ' + ')
}

/**
 * Format a sequence binding for display
 */
export function formatSequence(keys: string[]): string {
  return keys.map((k) => formatKey(k)).join(' ')
}

/**
 * Format keys for display based on binding type
 */
export function formatKeys(keys: string[], type: 'chord' | 'sequence'): string {
  return type === 'chord' ? formatChord(keys) : formatSequence(keys)
}
