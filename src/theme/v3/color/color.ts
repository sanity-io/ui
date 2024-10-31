import {Hue} from '../../palette'
import {
  ThemeColorAvatar_v2,
  ThemeColorCardToneKey,
  ThemeColorSchemeKey,
  ThemeColorStateToneKey,
} from '../../v2'

/** @public */
export interface ThemeColorElement {
  _hue: Hue
  bg: {
    0: string
    4: string
  }
  border: {
    0: string
    4: string
  }
  fg: {
    0: string
    4: string
  }
}

/** @public */
export type ThemeColorVariant = Record<ThemeColorStateToneKey, ThemeColorElement>

/** @public */
export type ThemeColorVariantKey = 'tinted' | 'solid'

/** @public */
export interface ThemeColorCard_v3 {
  _hue: Hue
  avatar: ThemeColorAvatar_v2
  backdrop: string
  code: {
    bg: string
    fg: string
    token: {
      atrule: string
      attrName: string
      attrValue: string
      attribute: string
      boolean: string
      builtin: string
      cdata: string
      char: string
      class: string
      className: string
      comment: string
      constant: string
      deleted: string
      doctype: string
      entity: string
      function: string
      hexcode: string
      id: string
      important: string
      inserted: string
      keyword: string
      number: string
      operator: string
      prolog: string
      property: string
      pseudoClass: string
      pseudoElement: string
      punctuation: string
      regex: string
      selector: string
      string: string
      symbol: string
      tag: string
      unit: string
      url: string
      variable: string
    }
  }
  focusRing: string
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
  skeleton: {
    from: string
    to: string
  }
  variant: Record<ThemeColorVariantKey, ThemeColorVariant>
}

/** @public */
export interface ThemeColorScheme_v3 {
  card: Record<ThemeColorCardToneKey, ThemeColorCard_v3>
}

/** @public */
// color[scheme].card[cardTone][colorVariant][elementTone][property][level]
export type ThemeColor_v3 = Record<ThemeColorSchemeKey, ThemeColorScheme_v3>
