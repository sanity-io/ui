import type {ChordBinding, KeyToken} from './types'

const MODIFIERS = ['mod', 'ctrl', 'meta', 'shift', 'alt'] as const

/**
 * Detect if we're on macOS (which uses Meta/Cmd key instead of Control)
 */
export function isMac(platformOverride?: 'mac' | 'other'): boolean {
  if (platformOverride !== undefined) {
    return platformOverride === 'mac'
  }
  return typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
}

/**
 * Normalize a key to lowercase
 */
export function normalizeKey(key: string): string {
  // Normalize common aliases
  if (key === 'Esc') return 'escape'
  return key.toLowerCase()
}

/**
 * Check if a key token is a modifier
 */
export function isModifier(key: string): boolean {
  return MODIFIERS.includes(key as (typeof MODIFIERS)[number])
}

/**
 * Resolve 'mod' to platform-specific key
 */
export function resolveModKey(platformOverride?: 'mac' | 'other'): 'meta' | 'ctrl' {
  return isMac(platformOverride) ? 'meta' : 'ctrl'
}

/**
 * Parse a chord binding's keys into required modifiers and main key
 */
export function parseChordKeys(
  keys: KeyToken[],
  platformOverride?: 'mac' | 'other',
): {
  requiredModifiers: Set<string>
  mainKey: string | null
} {
  const requiredModifiers = new Set<string>()
  let mainKey: string | null = null

  for (const key of keys) {
    const normalized = normalizeKey(key)

    if (normalized === 'mod') {
      const resolved = resolveModKey(platformOverride)
      requiredModifiers.add(resolved)
    } else if (isModifier(normalized)) {
      requiredModifiers.add(normalized)
    } else {
      mainKey = normalized
    }
  }

  return {requiredModifiers, mainKey}
}

/**
 * Check if a keyboard event matches a chord binding
 */
export function matchesChord(
  event: KeyboardEvent,
  binding: ChordBinding,
  platformOverride?: 'mac' | 'other',
): boolean {
  const {requiredModifiers, mainKey} = parseChordKeys(binding.keys, platformOverride)

  // Check main key
  if (mainKey !== null && normalizeKey(event.key) !== mainKey) {
    return false
  }

  // Check required modifiers are pressed
  if (requiredModifiers.has('ctrl') && !event.ctrlKey) return false
  if (requiredModifiers.has('meta') && !event.metaKey) return false
  if (requiredModifiers.has('shift') && !event.shiftKey) return false
  if (requiredModifiers.has('alt') && !event.altKey) return false

  // Check that no extra modifiers are pressed
  if (!requiredModifiers.has('ctrl') && event.ctrlKey) return false
  if (!requiredModifiers.has('meta') && event.metaKey) return false
  if (!requiredModifiers.has('shift') && event.shiftKey) return false
  if (!requiredModifiers.has('alt') && event.altKey) return false

  return true
}

/**
 * Check if event should be ignored based on target
 */
export function shouldIgnoreTarget(
  event: KeyboardEvent,
  blockOnEditableTarget: boolean,
  allowInEditableTarget: boolean,
): boolean {
  if (!blockOnEditableTarget || allowInEditableTarget) {
    return false
  }

  const target = event.target as HTMLElement
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
}

/**
 * Check if event should be ignored based on repeat
 */
export function shouldIgnoreRepeat(event: KeyboardEvent, allowRepeat: boolean): boolean {
  return !allowRepeat && event.repeat
}

/**
 * Check if event should be ignored based on IME composition
 */
export function shouldIgnoreComposition(event: KeyboardEvent): boolean {
  return event.isComposing || event.key === 'Process'
}

/**
 * Check if any modifiers are held
 */
export function hasModifiersHeld(event: KeyboardEvent): boolean {
  return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey
}
