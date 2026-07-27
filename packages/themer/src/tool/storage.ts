import {Hue, HueMidPoint, Hues} from '../legacy/types'
import {isColor} from '../lib/mix'
import {HUE_KEYS, MID_POINTS} from './hues'

const STORAGE_KEY = 'sanityStudio:themer:hues'

function sanitizeHue(value: unknown): Hue | null {
  if (!value || typeof value !== 'object') return null

  const mid: unknown = Reflect.get(value, 'mid')
  const midPoint: unknown = Reflect.get(value, 'midPoint')
  const lightest: unknown = Reflect.get(value, 'lightest')
  const darkest: unknown = Reflect.get(value, 'darkest')

  if (typeof mid !== 'string' || !isColor(mid)) return null
  if (typeof lightest !== 'string' || !isColor(lightest)) return null
  if (typeof darkest !== 'string' || !isColor(darkest)) return null
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- narrowed by the includes check
  if (typeof midPoint !== 'number' || !MID_POINTS.includes(midPoint as HueMidPoint)) return null

  return {
    mid: mid.toLowerCase(),
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- narrowed by the includes check
    midPoint: midPoint as HueMidPoint,
    lightest: lightest.toLowerCase(),
    darkest: darkest.toLowerCase(),
  }
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

    const parsed: unknown = JSON.parse(raw)

    if (!parsed || typeof parsed !== 'object') return null

    const hues: Partial<Hues> = {}

    for (const key of HUE_KEYS) {
      const hue = sanitizeHue(Reflect.get(parsed, key))

      if (!hue) return null

      hues[key] = hue
    }

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- the loop assigns every HUE_KEYS key or returns
    return hues as Hues
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
