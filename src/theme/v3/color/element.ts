import type {Hue} from '../palette'
import type {ColorValue} from './token'

/** @public */
export interface ElementColorTokens {
  _hue: Hue
  bg: {
    0: ColorValue
    4: ColorValue
  }
  border: {
    0: ColorValue
    4: ColorValue
  }
  fg: {
    0: ColorValue
    4: ColorValue
  }
}
