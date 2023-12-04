import {ThemeColorCardToneKey, ThemeColorBlendModeKey, ThemeColorSchemeKey} from './_system'
import {ThemeColorButton_v2} from './button'
import {ThemeColorInput_v2} from './input'
import {ThemeColorSelectable_v2} from './selectable'
import {ThemeColorShadow} from './shadow'
import {ThemeColorState_v2} from './state'
import {ThemeColorSyntax} from './syntax'

/**
 * @public
 */
export interface ThemeColorCard_v2 extends ThemeColorState_v2 {
  /** @internal */
  _blend: ThemeColorBlendModeKey
  _dark: boolean

  backdrop: string
  button: ThemeColorButton_v2
  focusRing: string
  input: ThemeColorInput_v2
  selectable: ThemeColorSelectable_v2
  shadow: ThemeColorShadow
  syntax: ThemeColorSyntax
}

/**
 * @public
 */
export type ThemeColorScheme_v2 = Record<ThemeColorCardToneKey, ThemeColorCard_v2>

/**
 * @public
 */
export type ThemeColorSchemes_v2 = Record<ThemeColorSchemeKey, ThemeColorScheme_v2>
