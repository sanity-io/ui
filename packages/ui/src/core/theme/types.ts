import {ThemeColorCardToneKey, ThemeColorSchemeKey} from '../../theme/system/color/_system'
import {RootTheme} from '../../theme/system/theme'

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
