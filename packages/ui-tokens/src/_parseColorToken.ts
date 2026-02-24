import {HUES, TINTS} from './constants'
import type {ColorToken, Hue, Tint} from './types'

const RE_PERCENTAGE = /^([0-9]+)%/
const RE_OPACITY = /^(1|0\.[0-9]+)?/

/** @internal */
export interface ColorNode {
  type: 'color'
  name: 'black' | 'white'
  /** Between 0 and 1 */
  opacity: number
  /** Between 0 and 1 */
  mix: number
}

/** @internal */
export interface ColorTintNode {
  type: 'tint'
  hue: Hue
  tint: Tint
  /** Between 0 and 1 */
  opacity: number
  /** Between 0 and 1 */
  mix: number
}

/** @internal */
export interface ColorInheritNode {
  type: 'inherit'
}

/** @internal */
export type TokenizeColorResult = ColorNode | ColorTintNode | ColorInheritNode

/** @internal */
export function _parseColorToken(str: ColorToken, options: {defaultHue: Hue}): TokenizeColorResult {
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

  function parseColorNode(): ColorNode | ColorTintNode | ColorInheritNode {
    ignoreWhitespace()

    let v = _consume('black') || _consume('white')

    if (v) {
      return {
        type: 'color',
        name: v as 'black' | 'white',
        opacity: parseOpacity() ?? 1,
        mix: parseMix() ?? 1,
      }
    }

    for (const hue of HUES) {
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

    let v = Number(str.slice(cursor, cursor + 3)) as Tint

    if (TINTS.includes(v)) {
      cursor += 3

      return v
    }

    v = Number(str.slice(cursor, cursor + 2)) as Tint

    if (TINTS.includes(v)) {
      cursor += 2

      return v
    }

    return undefined
  }

  function parseMix() {
    ignoreWhitespace()

    const match = RE_PERCENTAGE.exec(str.slice(cursor))

    if (match) {
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

      if (match) {
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
