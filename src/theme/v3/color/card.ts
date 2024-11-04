import {ThemeColorStateToneKey} from '../../v2'
import {ElementColorTokens} from './element'
import {ColorToken} from './token'

export interface CardColorTokens extends ElementColorTokens {
  focusRing: [ColorToken, ColorToken]
  tinted: Record<'*' | ThemeColorStateToneKey, ElementColorTokens>
  shadow: {
    outline: [ColorToken, ColorToken]
    umbra: [ColorToken, ColorToken]
    penumbra: [ColorToken, ColorToken]
    ambient: [ColorToken, ColorToken]
  }
  solid: Record<'*' | ThemeColorStateToneKey, ElementColorTokens>
}
