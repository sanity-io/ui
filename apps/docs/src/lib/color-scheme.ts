import type {ThemeColorSchemeKey} from '@sanity/ui/theme'

export const COLOR_SCHEME_COOKIE = 'sanity-ui:color-scheme'

const COLOR_SCHEME_PREFERENCES = ['light', 'dark', 'system'] as const

export type ColorSchemePreference = (typeof COLOR_SCHEME_PREFERENCES)[number]

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

function isColorSchemePreference(value: unknown): value is ColorSchemePreference {
  return (
    typeof value === 'string' && (COLOR_SCHEME_PREFERENCES as readonly string[]).includes(value)
  )
}

export function parseColorSchemePreference(
  value: string | undefined | null,
): ColorSchemePreference {
  return isColorSchemePreference(value) ? value : 'system'
}

export function resolveColorScheme(
  preference: ColorSchemePreference,
  systemScheme: ThemeColorSchemeKey,
): ThemeColorSchemeKey {
  return preference === 'system' ? systemScheme : preference
}

export function setColorSchemeCookie(preference: ColorSchemePreference): void {
  document.cookie = [
    `${COLOR_SCHEME_COOKIE}=${preference}`,
    'path=/',
    `max-age=${ONE_YEAR_SECONDS}`,
    'SameSite=Lax',
  ].join('; ')
}
