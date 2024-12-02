import {Hue} from '../../palette'
import {ColorToken} from './token'

/** @public */
export interface ElementColorTokens {
  _hue: Hue
  bg: {
    0: [ColorToken, ColorToken]
    4: [ColorToken, ColorToken]
  }
  border: {
    0: [ColorToken, ColorToken]
    4: [ColorToken, ColorToken]
  }
  fg: {
    0: [ColorToken, ColorToken]
    4: [ColorToken, ColorToken]
  }
}
