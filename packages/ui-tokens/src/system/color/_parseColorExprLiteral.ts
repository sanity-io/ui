import {
  COLOR_HUES,
  COLOR_TINTS,
  type ColorHueKey as Hue,
  type ColorTintKey as Tint,
} from '@sanity/color'

import type {ColorExprLiteral} from './_core.spec'

const RE_PERCENTAGE = /^([0-9]+)%/
const RE_OPACITY = /^(1|0\.[0-9]+)?/

/** @internal */
export interface ColorKeywordExpr {
  type: 'keyword'
  name: 'black' | 'white'
  /** Between 0 and 1 */
  opacity: number
  /** Between 0 and 1 */
  mix: number
}

/** @internal */
export interface ColorTintExpr {
  type: 'tint'
  hue: Hue
  tint: Tint
  /** Between 0 and 1 */
  opacity: number
  /** Between 0 and 1 */
  mix: number
}

/** @internal */
export interface ColorInheritExpr {
  type: 'inherit'
}

/** @internal */
export type ColorExpr = ColorKeywordExpr | ColorTintExpr | ColorInheritExpr

/** @internal */
export function _parseColorExprLiteral(
  str: ColorExprLiteral,
  options: {defaultHue: Hue},
): ColorExpr {
  const {defaultHue} = options

  let cursor = 0

  return parseColorNode()

  function _consume(s: string) {
    if (str.startsWith(s, cursor)) {
      cursor += s.length

      return s
    }

    return undefined
  }

  function _peek() {
    return str[cursor]
  }

  function parseColorNode(): ColorKeywordExpr | ColorTintExpr | ColorInheritExpr {
    ignoreWhitespace()

    let v = _consume('black') || _consume('white')

    if (v) {
      return {
        type: 'keyword',
        name: v as 'black' | 'white',
        opacity: parseOpacity() ?? 1,
        mix: parseMix() ?? 1,
      }
    }

    for (const hue of COLOR_HUES) {
      v = _consume(String(hue))

      if (v) {
        if (_peek() !== '-') {
          throw new Error(`Expected "-" after hue key`)
        }

        cursor += 1

        const tint = parseTint()

        if (!tint) {
          throw new Error(`Expected tint after hue`)
        }

        return {
          type: 'tint',
          hue,
          tint,
          opacity: parseOpacity() ?? 1,
          mix: parseMix() ?? 1,
        }
      }
    }

    const tint = parseTint()

    if (tint) {
      return {
        type: 'tint',
        hue: defaultHue,
        tint,
        opacity: parseOpacity() ?? 1,
        mix: parseMix() ?? 1,
      }
    }

    if (str === 'inherit') {
      return {
        type: 'inherit',
      }
    }

    throw new Error(`Invalid color: ${str}`)
  }

  function parseTint() {
    ignoreWhitespace()

    let v = str.slice(cursor, cursor + 3)

    if (COLOR_TINTS.includes(v as Tint)) {
      cursor += 3

      return v as Tint
    }

    v = str.slice(cursor, cursor + 2)

    if (COLOR_TINTS.includes(v as Tint)) {
      cursor += 2

      return v as Tint
    }

    return undefined
  }

  function parseMix() {
    ignoreWhitespace()

    const match = RE_PERCENTAGE.exec(str.slice(cursor))

    if (match?.[0] && match?.[1]) {
      cursor += match[0].length

      return parseFloat(match[1]) / 100
    }

    return undefined
  }

  function parseOpacity() {
    ignoreWhitespace()

    if (_peek() === '/') {
      cursor += 1

      const match = RE_OPACITY.exec(str.slice(cursor))

      if (match?.[0] && match?.[1]) {
        cursor += match[0].length

        return parseFloat(match[1])
      }

      cursor -= 1
    }

    return undefined
  }

  function ignoreWhitespace() {
    while (_peek() === ' ') {
      cursor++
    }
  }
}
