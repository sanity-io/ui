import {RootTheme, ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'

/**
 * @public
 */
export interface ThemeContextValue {
  /** @deprecated No longer used */
  version: 0.0
  scheme: ThemeColorSchemeKey
  theme: RootTheme
  tone: ThemeColorCardToneKey
}
