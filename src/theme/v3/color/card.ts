import type {ThemeColorStateToneKey} from '../../v2'
import type {Hue} from '../palette'
import type {ElementColorTokens} from './element'
import type {ColorValue} from './token'

/** @public */
export interface CardColorTokens {
  _hue: Hue
  avatar: Record<
    Hue,
    {
      _hue: Hue
      bg: ColorValue
      fg: ColorValue
    }
  >
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

  variant: {
    solid: Record<'*' | ThemeColorStateToneKey, ElementColorTokens>
    tinted: Record<'*' | ThemeColorStateToneKey, ElementColorTokens>
  }
}
