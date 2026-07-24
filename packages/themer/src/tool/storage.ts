import {isColor} from '../lib/mix'
import {CreateThemeOptions} from '../types'
import {THEMER_FIELDS} from './fields'

const STORAGE_KEY = 'sanityStudio:themer:colors'

/**
 * Restores draft colors from localStorage, so theme drafts survive studio
 * reloads.
 *
 * @internal
 */
export function readStoredColors(): CreateThemeOptions | null {
  try {
    if (typeof localStorage === 'undefined') return null

    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)

    if (!parsed || typeof parsed !== 'object') return null

    const colors: CreateThemeOptions = {}

    for (const {key} of THEMER_FIELDS) {
      const value: unknown = Reflect.get(parsed, key)

      if (typeof value === 'string' && isColor(value)) {
        colors[key] = value
      }
    }

    return colors
  } catch {
    return null
  }
}

/** @internal */
export function writeStoredColors(colors: CreateThemeOptions | null): void {
  try {
    if (typeof localStorage === 'undefined') return

    if (colors === null) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(colors))
    }
  } catch {
    // Storage can be unavailable (e.g. private browsing) — drafts just won't persist
  }
}
