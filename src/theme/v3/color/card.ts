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
  backdrop: [ColorToken, ColorToken]
  code: {
    bg: [ColorToken, ColorToken]
    fg: [ColorToken, ColorToken]
    token: {
      atrule: [ColorToken, ColorToken]
      attrName: [ColorToken, ColorToken]
      attrValue: [ColorToken, ColorToken]
      attribute: [ColorToken, ColorToken]
      boolean: [ColorToken, ColorToken]
      builtin: [ColorToken, ColorToken]
      cdata: [ColorToken, ColorToken]
      char: [ColorToken, ColorToken]
      class: [ColorToken, ColorToken]
      className: [ColorToken, ColorToken]
      comment: [ColorToken, ColorToken]
      constant: [ColorToken, ColorToken]
      deleted: [ColorToken, ColorToken]
      doctype: [ColorToken, ColorToken]
      entity: [ColorToken, ColorToken]
      function: [ColorToken, ColorToken]
      hexcode: [ColorToken, ColorToken]
      id: [ColorToken, ColorToken]
      important: [ColorToken, ColorToken]
      inserted: [ColorToken, ColorToken]
      keyword: [ColorToken, ColorToken]
      number: [ColorToken, ColorToken]
      operator: [ColorToken, ColorToken]
      prolog: [ColorToken, ColorToken]
      property: [ColorToken, ColorToken]
      pseudoClass: [ColorToken, ColorToken]
      pseudoElement: [ColorToken, ColorToken]
      punctuation: [ColorToken, ColorToken]
      regex: [ColorToken, ColorToken]
      selector: [ColorToken, ColorToken]
      string: [ColorToken, ColorToken]
      symbol: [ColorToken, ColorToken]
      tag: [ColorToken, ColorToken]
      unit: [ColorToken, ColorToken]
      url: [ColorToken, ColorToken]
      variable: [ColorToken, ColorToken]
    }
  }
  focusRing: [ColorToken, ColorToken]
  link: {
    fg: [ColorToken, ColorToken]
  }
  shadow: {
    outline: [ColorToken, ColorToken]
    umbra: [ColorToken, ColorToken]
    penumbra: [ColorToken, ColorToken]
    ambient: [ColorToken, ColorToken]
  }
  skeleton: {
    from: [ColorToken, ColorToken]
    to: [ColorToken, ColorToken]
  }

  variant: {
    solid: Record<'*' | ThemeColorStateToneKey, ElementColorTokens>
    tinted: Record<'*' | ThemeColorStateToneKey, ElementColorTokens>
  }
}
