import type {
  ThemeColorCardToneKey as CardTone,
  ThemeColorStateToneKey as ElementTone,
} from '../../v2'
import type {Hue} from '../palette'
import type {COLOR_VARIANTS} from './_constants'
import type {ThemeColorAvatar_v3} from './avatar'
import type {ColorValue} from './token'

/** @public */
export interface ThemeColorElement {
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

/** @public */
export type ThemeColorVariant = Record<ElementTone, ThemeColorElement>

/** @public */
export type ThemeColorVariantKey = (typeof COLOR_VARIANTS)[number] // 'tinted' | 'solid'

/** @public */
export interface ThemeColorCard_v3 {
  _hue: Hue
  avatar: ThemeColorAvatar_v3
  backdrop: ColorValue
  code: {
    bg: ColorValue
    fg: ColorValue
    token: {
      atrule: ColorValue
      attrName: ColorValue
      attrValue: ColorValue
      attribute: ColorValue
      boolean: ColorValue
      builtin: ColorValue
      cdata: ColorValue
      char: ColorValue
      class: ColorValue
      className: ColorValue
      comment: ColorValue
      constant: ColorValue
      deleted: ColorValue
      doctype: ColorValue
      entity: ColorValue
      function: ColorValue
      hexcode: ColorValue
      id: ColorValue
      important: ColorValue
      inserted: ColorValue
      keyword: ColorValue
      number: ColorValue
      operator: ColorValue
      prolog: ColorValue
      property: ColorValue
      pseudoClass: ColorValue
      pseudoElement: ColorValue
      punctuation: ColorValue
      regex: ColorValue
      selector: ColorValue
      string: ColorValue
      symbol: ColorValue
      tag: ColorValue
      unit: ColorValue
      url: ColorValue
      variable: ColorValue
    }
  }
  focusRing: ColorValue
  link: {
    fg: ColorValue
  }
  shadow: {
    outline: ColorValue
    umbra: ColorValue
    penumbra: ColorValue
    ambient: ColorValue
  }
  skeleton: {
    from: ColorValue
    to: ColorValue
  }
  variant: Record<ThemeColorVariantKey, ThemeColorVariant>
}

/** @public */
export type ThemeColor_v3 = Record<CardTone, ThemeColorCard_v3>
