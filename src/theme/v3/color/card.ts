import {Hue} from '../../palette'
import {ThemeColorStateToneKey} from '../../v2'
import {ElementColorTokens} from './element'
import {ColorToken} from './token'

/** @public */
export interface CardColorTokens {
  _hue: Hue
  avatar: Record<
    Hue,
    {
      _hue: Hue
      bg: [ColorToken, ColorToken]
      fg: [ColorToken, ColorToken]
    }
  >
  focusRing: [ColorToken, ColorToken]
  shadow: {
    outline: [ColorToken, ColorToken]
    umbra: [ColorToken, ColorToken]
    penumbra: [ColorToken, ColorToken]
    ambient: [ColorToken, ColorToken]
  }
  variant: {
    solid: Record<'*' | ThemeColorStateToneKey, ElementColorTokens>
    tinted: Record<'*' | ThemeColorStateToneKey, ElementColorTokens>
  }
}
