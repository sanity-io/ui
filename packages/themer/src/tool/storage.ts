import {isColor} from '../lib/mix'
import {
  BuildThemeOptions,
  MAXIMUM_CONTRAST,
  MINIMUM_CONTRAST,
  SCHEMES,
  SchemeThemeOptions,
} from '../theme/options'
import {presets} from '../theme/presets'
import {
  CONFIG_SLUG,
  createCustomTheme,
  CustomTheme,
  displayTitle,
  initialThemerState,
  ThemerState,
} from './themes'

const STORAGE_KEY = 'sanityStudio:themer:state'

/**
 * Where earlier versions of the tool kept their single draft theme — it is
 * migrated into a custom theme, so a draft survives the upgrade.
 */
const LEGACY_STORAGE_KEY = 'sanityStudio:themer:options'

/** The title a draft from before themes had titles is imported under */
const LEGACY_DRAFT_TITLE = 'Draft theme'

function sanitizeColor(value: unknown): string | null {
  return typeof value === 'string' && isColor(value) ? value.toLowerCase() : null
}

function sanitizeContrast(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(MAXIMUM_CONTRAST, Math.max(MINIMUM_CONTRAST, value))
    : null
}

function sanitizeSchemeOptions(value: unknown): SchemeThemeOptions {
  const options: SchemeThemeOptions = {}

  if (!value || typeof value !== 'object') return options

  const accent = sanitizeColor(Reflect.get(value, 'accent'))
  const text = sanitizeColor(Reflect.get(value, 'text'))
  const background = sanitizeColor(Reflect.get(value, 'background'))
  const contrast = sanitizeContrast(Reflect.get(value, 'contrast'))

  if (accent) options.accent = accent
  if (text) options.text = text
  if (background) options.background = background
  if (contrast !== null) options.contrast = contrast

  return options
}

/**
 * Options from before they were grouped by scheme: one accent, text color and
 * contrast for both schemes, and a background per scheme. Both schemes get
 * the shared colors, so the theme keeps looking the same.
 */
function sanitizeFlatOptions(value: object): BuildThemeOptions | null {
  const accent = sanitizeColor(Reflect.get(value, 'accent'))

  if (!accent) return null

  const shared: SchemeThemeOptions = {accent}
  const text = sanitizeColor(Reflect.get(value, 'text'))
  const contrast = sanitizeContrast(Reflect.get(value, 'contrast'))

  if (text) shared.text = text
  if (contrast !== null) shared.contrast = contrast

  const backgrounds: unknown = Reflect.get(value, 'background')
  const options: BuildThemeOptions = {}

  for (const scheme of SCHEMES) {
    const background =
      backgrounds && typeof backgrounds === 'object'
        ? sanitizeColor(Reflect.get(backgrounds, scheme))
        : null

    options[scheme] = background ? {...shared, background} : {...shared}
  }

  return options
}

function sanitizeOptions(value: unknown): BuildThemeOptions | null {
  if (!value || typeof value !== 'object') return null

  // The flat shape always had an accent, the scheme shape never has one at the top
  if ('accent' in value) {
    return sanitizeFlatOptions(value)
  }

  const options: BuildThemeOptions = {}

  for (const scheme of SCHEMES) {
    const schemeOptions = sanitizeSchemeOptions(Reflect.get(value, scheme))

    if (Object.keys(schemeOptions).length > 0) options[scheme] = schemeOptions
  }

  return options
}

function isReservedSlug(slug: string): boolean {
  return slug === CONFIG_SLUG || presets.some((preset) => preset.slug === slug)
}

function sanitizeCustomTheme(value: unknown): CustomTheme | null {
  if (!value || typeof value !== 'object') return null

  const slug: unknown = Reflect.get(value, 'slug')

  if (typeof slug !== 'string' || !slug || isReservedSlug(slug)) return null

  const options = sanitizeOptions(Reflect.get(value, 'options'))

  if (!options) return null

  const title: unknown = Reflect.get(value, 'title')

  return {slug, title: displayTitle(typeof title === 'string' ? title : ''), options}
}

function sanitizeState(value: unknown): ThemerState {
  if (!value || typeof value !== 'object') return initialThemerState

  const custom: CustomTheme[] = []
  const rawCustom: unknown = Reflect.get(value, 'custom')

  if (Array.isArray(rawCustom)) {
    for (const item of rawCustom) {
      const theme = sanitizeCustomTheme(item)

      if (theme && !custom.some((existing) => existing.slug === theme.slug)) {
        custom.push(theme)
      }
    }
  }

  const removed: string[] = []
  const rawRemoved: unknown = Reflect.get(value, 'removed')

  if (Array.isArray(rawRemoved)) {
    for (const slug of rawRemoved) {
      const known =
        typeof slug === 'string' &&
        slug !== CONFIG_SLUG &&
        (presets.some((preset) => preset.slug === slug) ||
          custom.some((theme) => theme.slug === slug))

      if (known && !removed.includes(slug)) removed.push(slug)
    }
  }

  const rawActive: unknown = Reflect.get(value, 'active')

  return {active: typeof rawActive === 'string' ? rawActive : null, custom, removed}
}

function readLegacyState(): ThemerState | null {
  const raw = localStorage.getItem(LEGACY_STORAGE_KEY)

  if (!raw) return null

  const options = sanitizeOptions(JSON.parse(raw))

  if (!options) return null

  const theme = createCustomTheme(LEGACY_DRAFT_TITLE, options)

  return {active: theme.slug, custom: [theme], removed: []}
}

/**
 * Restores the themer state from localStorage, so the user's themes survive
 * studio reloads. Falls back to the initial state when nothing usable is
 * stored.
 *
 * @internal
 */
export function readStoredState(): ThemerState {
  try {
    if (typeof localStorage === 'undefined') return initialThemerState

    const raw = localStorage.getItem(STORAGE_KEY)

    if (raw) return sanitizeState(JSON.parse(raw))

    return readLegacyState() ?? initialThemerState
  } catch {
    return initialThemerState
  }
}

/** @internal */
export function writeStoredState(state: ThemerState): void {
  try {
    if (typeof localStorage === 'undefined') return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    localStorage.removeItem(LEGACY_STORAGE_KEY)
  } catch {
    // Storage can be unavailable (e.g. private browsing) — themes just won't persist
  }
}
