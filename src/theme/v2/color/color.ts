import type {ThemeColorBlendModeKey, ThemeColorCardToneKey, ThemeColorSchemeKey} from './_system'
import type {ThemeColorButton_v2} from './button'
import type {ThemeColorInput_v2} from './input'
import type {ThemeColorSelectable_v2} from './selectable'
import type {ThemeColorShadow} from './shadow'
import type {ThemeColorState_v2} from './state'
import type {ThemeColorSyntax} from './syntax'

/** @public */
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

/** @public */
export type ThemeColorScheme_v2 = Record<ThemeColorCardToneKey, ThemeColorCard_v2>

/** @public */
export type ThemeColorSchemes_v2 = Record<ThemeColorSchemeKey, ThemeColorScheme_v2>
