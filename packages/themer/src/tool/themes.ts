import {BuildThemeOptions} from '../theme/options'
import {presets} from '../theme/presets'
import {sameOptions} from './options'

/**
 * Where a theme in the themer list comes from: the theme the Studio config
 * was generated from, one of the presets defined in code, or one the user
 * added in the tool. Only custom themes are editable — the others are
 * duplicated into a custom theme first.
 *
 * @internal
 */
export type ThemerThemeSource = 'config' | 'preset' | 'custom'

/** A theme the themer tool lists @internal */
export interface ThemerTheme {
  slug: string
  title: string
  options: BuildThemeOptions
  source: ThemerThemeSource
}

/** A theme the user added in the tool, as persisted @internal */
export interface CustomTheme {
  slug: string
  title: string
  options: BuildThemeOptions
}

/** The persisted themer state @internal */
export interface ThemerState {
  /**
   * The slug of the applied theme — `null` applies nothing on top of the
   * Studio's configured theme
   */
  active: string | null
  /** The themes the user added */
  custom: CustomTheme[]
  /** The slugs of the themes the user removed from the list */
  removed: string[]
}

/** @internal */
export type ThemerAction =
  | {type: 'pick'; slug: string}
  | {type: 'add'; theme: CustomTheme}
  | {type: 'update'; slug: string; title?: string; options?: BuildThemeOptions}
  | {type: 'remove'; slug: string}
  | {type: 'restore'; slug: string}
  | {type: 'delete'; slug: string}

/** The slug of the theme the Studio config was generated from @internal */
export const CONFIG_SLUG = 'config'

/** The title of the theme the Studio config was generated from @internal */
export const CONFIG_TITLE = 'Studio config'

/** The title new themes start out with @internal */
export const UNTITLED_THEME = 'Untitled theme'

/** @internal */
export const initialThemerState: ThemerState = {active: null, custom: [], removed: []}

/** @internal */
export function themerReducer(state: ThemerState, action: ThemerAction): ThemerState {
  switch (action.type) {
    case 'pick': {
      const active = action.slug === CONFIG_SLUG ? null : action.slug

      return active === state.active ? state : {...state, active}
    }

    case 'add': {
      if (state.custom.some((theme) => theme.slug === action.theme.slug)) return state

      return {...state, active: action.theme.slug, custom: [...state.custom, action.theme]}
    }

    case 'update': {
      if (!state.custom.some((theme) => theme.slug === action.slug)) return state

      return {
        ...state,
        custom: state.custom.map((theme) => {
          if (theme.slug !== action.slug) return theme

          // Keep the options identity when only the title changes, so the
          // applied theme is not rebuilt on every keystroke
          return {
            ...theme,
            title: action.title ?? theme.title,
            options: action.options ?? theme.options,
          }
        }),
      }
    }

    case 'remove': {
      if (action.slug === CONFIG_SLUG || state.removed.includes(action.slug)) return state

      return {
        ...state,
        active: state.active === action.slug ? null : state.active,
        removed: [...state.removed, action.slug],
      }
    }

    case 'restore': {
      if (!state.removed.includes(action.slug)) return state

      return {...state, removed: state.removed.filter((slug) => slug !== action.slug)}
    }

    case 'delete': {
      if (!state.custom.some((theme) => theme.slug === action.slug)) return state

      return {
        active: state.active === action.slug ? null : state.active,
        custom: state.custom.filter((theme) => theme.slug !== action.slug),
        removed: state.removed.filter((slug) => slug !== action.slug),
      }
    }

    default:
      return state
  }
}

/** The themes the tool works with, derived from the persisted state @internal */
export interface ResolvedThemes {
  /** The themes to pick from, in list order */
  themes: ThemerTheme[]
  /** The removed themes, which can be restored */
  removed: ThemerTheme[]
  /** The applied theme */
  active: ThemerTheme
}

/**
 * Resolves the list of themes: the configured theme first, then the presets
 * (minus the ones that would only repeat the configured theme), then the
 * user's own themes. Removed themes are set aside so they can be restored,
 * and the active theme falls back to the configured one when its slug no
 * longer resolves.
 *
 * @internal
 */
export function resolveThemes(state: ThemerState, baseOptions: BuildThemeOptions): ResolvedThemes {
  const config: ThemerTheme = {
    slug: CONFIG_SLUG,
    title: CONFIG_TITLE,
    options: baseOptions,
    source: 'config',
  }

  const all: ThemerTheme[] = [config]

  for (const preset of presets) {
    if (!sameOptions(preset.options, baseOptions)) {
      all.push({slug: preset.slug, title: preset.title, options: preset.options, source: 'preset'})
    }
  }

  for (const theme of state.custom) {
    all.push({slug: theme.slug, title: theme.title, options: theme.options, source: 'custom'})
  }

  const removedSlugs = new Set(state.removed)
  const themes = all.filter((theme) => !removedSlugs.has(theme.slug))
  const removed = all.filter((theme) => removedSlugs.has(theme.slug))
  const active = themes.find((theme) => theme.slug === state.active) ?? config

  return {themes, removed, active}
}

/**
 * Creates a custom theme with a slug that cannot collide with the presets or
 * the configured theme.
 *
 * @internal
 */
export function createCustomTheme(title: string, options: BuildThemeOptions): CustomTheme {
  return {slug: `custom-${randomId()}`, title, options}
}

/** The title of a duplicated theme @internal */
export function duplicateTitle(title: string): string {
  return `${displayTitle(title)} copy`
}

/** The title to show for a theme, falling back when the user cleared it @internal */
export function displayTitle(title: string): string {
  return title.trim() || UNTITLED_THEME
}

function randomId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}
