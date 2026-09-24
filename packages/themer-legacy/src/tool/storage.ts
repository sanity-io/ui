import {Hue, HueMidPoint, Hues} from '../generator/types'
import {isColor} from '../lib/mix'
import {isMidPoint} from './hues'

const STORAGE_KEY = 'sanityStudio:themer-legacy:hues'

function sanitizeColor(value: unknown): string | null {
  return typeof value === 'string' && isColor(value) ? value.toLowerCase() : null
}

function sanitizeMidPoint(value: unknown): HueMidPoint | null {
  return typeof value === 'number' && isMidPoint(value) ? value : null
}

function sanitizeHue(value: unknown): Hue | null {
  if (!value || typeof value !== 'object') return null

  const mid = sanitizeColor(Reflect.get(value, 'mid'))
  const lightest = sanitizeColor(Reflect.get(value, 'lightest'))
  const darkest = sanitizeColor(Reflect.get(value, 'darkest'))
  const midPoint = sanitizeMidPoint(Reflect.get(value, 'midPoint'))

  if (!mid || !lightest || !darkest || midPoint === null) return null

  return {mid, midPoint, lightest, darkest}
}

/**
 * Validates untrusted (stored) data as `Hues`: every one of the six hues must
 * be present and complete, since `createTheme` has no defaults to fall back
 * on for a partially corrupted draft — anything less discards the draft.
 *
 * @internal
 */
export function sanitizeHues(value: unknown): Hues | null {
  if (!value || typeof value !== 'object') return null

  const defaultHue = sanitizeHue(Reflect.get(value, 'default'))
  const transparent = sanitizeHue(Reflect.get(value, 'transparent'))
  const primary = sanitizeHue(Reflect.get(value, 'primary'))
  const positive = sanitizeHue(Reflect.get(value, 'positive'))
  const caution = sanitizeHue(Reflect.get(value, 'caution'))
  const critical = sanitizeHue(Reflect.get(value, 'critical'))

  if (!defaultHue || !transparent || !primary || !positive || !caution || !critical) return null

  return {default: defaultHue, transparent, primary, positive, caution, critical}
}

/**
 * Restores draft hues from localStorage, so theme drafts survive studio
 * reloads.
 *
 * @internal
 */
export function readStoredHues(): Hues | null {
  try {
    if (typeof localStorage === 'undefined') return null

    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return null

    return sanitizeHues(JSON.parse(raw))
  } catch {
    return null
  }
}

/** @internal */
export function writeStoredHues(hues: Hues | null): void {
  try {
    if (typeof localStorage === 'undefined') return

    if (hues === null) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hues))
    }
  } catch {
    // Storage can be unavailable (e.g. private browsing) — drafts just won't persist
  }
}
