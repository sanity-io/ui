import {isColor} from '../lib/mix'
import {BuildThemeOptions, MAXIMUM_CONTRAST, MINIMUM_CONTRAST} from '../theme/options'

const STORAGE_KEY = 'sanityStudio:themer:options'

function sanitizeColor(value: unknown): string | null {
  return typeof value === 'string' && isColor(value) ? value.toLowerCase() : null
}

function sanitizeOptions(value: unknown): BuildThemeOptions | null {
  if (!value || typeof value !== 'object') return null

  const accent = sanitizeColor(Reflect.get(value, 'accent'))

  if (!accent) return null

  const options: BuildThemeOptions = {accent}
  const text = sanitizeColor(Reflect.get(value, 'text'))

  if (text) options.text = text

  const background: unknown = Reflect.get(value, 'background')

  if (background && typeof background === 'object') {
    const dark = sanitizeColor(Reflect.get(background, 'dark'))
    const light = sanitizeColor(Reflect.get(background, 'light'))

    if (dark || light) {
      options.background = {}
      if (dark) options.background.dark = dark
      if (light) options.background.light = light
    }
  }

  const contrast: unknown = Reflect.get(value, 'contrast')

  if (typeof contrast === 'number' && Number.isFinite(contrast)) {
    options.contrast = Math.min(MAXIMUM_CONTRAST, Math.max(MINIMUM_CONTRAST, contrast))
  }

  return options
}

/**
 * Restores draft theme options from localStorage, so theme drafts survive
 * studio reloads.
 *
 * @internal
 */
export function readStoredOptions(): BuildThemeOptions | null {
  try {
    if (typeof localStorage === 'undefined') return null

    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return null

    return sanitizeOptions(JSON.parse(raw))
  } catch {
    return null
  }
}

/** @internal */
export function writeStoredOptions(options: BuildThemeOptions | null): void {
  try {
    if (typeof localStorage === 'undefined') return

    if (options === null) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(options))
    }
  } catch {
    // Storage can be unavailable (e.g. private browsing) — drafts just won't persist
  }
}
