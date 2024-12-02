import {Hue, HUES, Tint, TINTS} from '../../palette'

const RE_PERCENTAGE = /^([0-9]+)%/
const RE_OPACITY = /^(1|0\.[0-9]+)?/

export interface TokenizeColorResult {
  color: {type: 'black' | 'white'} | {type: 'hue'; hue: Hue | undefined; tint: Tint | undefined}
  opacity: number | undefined
  mix: number | undefined
}

export function parseColor(str: string): TokenizeColorResult {
  let cursor = 0

  const color = getColor()

  if (!color) {
    throw new Error(`Invalid color: ${str}`)
  }

  const opacity = getOpacity()
  const mix = getMixPercentage()

  return {
    color,
    mix,
    opacity,
  }

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

  function getColor(): TokenizeColorResult['color'] | undefined {
    ignoreWhitespace()

    let v = _consume('black') || _consume('white')

    if (v) {
      return {
        type: v as 'black' | 'white',
      }
    }

    for (const hue of HUES) {
      v = _consume(String(hue))

      if (v) {
        if (_peek() !== '/') {
          throw new Error(`Expected slash after hue`)
        }

        cursor += 1

        const tint = getTint()

        if (!tint) {
          throw new Error(`Expected tint after hue`)
        }

        return {
          type: 'hue',
          hue,
          tint,
        }
      }
    }

    const tint = getTint()

    if (tint) {
      return {
        type: 'hue',
        hue: undefined,
        tint,
      }
    }

    return undefined
  }

  function getTint() {
    ignoreWhitespace()

    // if (_peek() === '/') {
    //   cursor += 1

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

    // for (const tint of COLOR_TINTS) {
    //   const v = _consume(String(tint))

    //   if (v) {
    //     return tint
    //   }
    // }

    //   cursor -= 1
    // }

    return undefined
  }

  function getMixPercentage() {
    ignoreWhitespace()

    const match = RE_PERCENTAGE.exec(str.slice(cursor))

    if (match) {
      cursor += match[0].length

      return parseFloat(match[1])
    }

    return undefined
  }

  function getOpacity() {
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
