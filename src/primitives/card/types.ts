import {ThemeColorSchemeKey, ThemeColorToneKey} from '../../theme'

/**
 * @internal
 */
export interface CardStyleProps {
  $checkered: boolean
  $focusRing: boolean
  $tone: ThemeColorToneKey
  $scheme: ThemeColorSchemeKey
  $updateCssVars: boolean
}
