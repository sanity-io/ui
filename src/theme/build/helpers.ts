import {ColorTokenValue, parseTokenValue, TokenColorValueNode} from '../config'
import {
  parseColor,
  rgbToHex,
  screen as _screen,
  multiply as _multiply,
  rgba,
} from '../lib/color-fns'
import {ColorHueValue} from '../system'

export interface ColorTokenContext {
  hue: ColorHueValue
  scheme: 'light' | 'dark'
}

export function resolveColorTokenValue(context: ColorTokenContext, value: ColorTokenValue): string {
  const {hue, scheme} = context
  const node = parseTokenValue(value[scheme === 'light' ? 0 : 1])

  if (!node || node.type !== 'color') {
    throw new Error(`Invalid color token: ${value[0]}`)
  }

  return compileColorTokenValue({...node, hue: node.hue || hue})
}

export function compileColorTokenValue(node: TokenColorValueNode): string {
  let key = ''

  if (node.key === 'black' || node.key === 'white') {
    key = node.key
  } else {
    key = `${node.hue}/${node.tint}`
  }

  if (node.opacity !== undefined) {
    key += `/${node.opacity}`
  }

  return key
}

export function multiply(bg: string, fg: string): string {
  const b = parseColor(bg)
  const s = parseColor(fg)
  const hex = rgbToHex(_multiply(b, s))

  if (s.a !== undefined) {
    return rgba(hex, s.a)
  }

  return hex
}

export function screen(bg: string, fg: string): string {
  const b = parseColor(bg)
  const s = parseColor(fg)
  const hex = rgbToHex(_screen(b, s))

  if (s.a !== undefined) {
    return rgba(hex, s.a)
  }

  return hex
}

export function plusDarker(bg: string, fg: string): string {
  const b = parseColor(bg)
  const s = parseColor(fg)

  const result: RGB = {
    r: Math.max(Math.min(b.r + s.r, 255), 0),
    g: Math.max(Math.min(b.g + s.g, 255), 0),
    b: Math.max(Math.min(b.b + s.b, 255), 0),
  }

  return rgbToHex(result)
}

export function difference(bg: string, fg: string): string {
  const b = parseColor(bg)
  const s = parseColor(fg)

  const result: RGB = {
    r: Math.min(Math.abs(s.r - b.r), 255),
    g: Math.min(Math.abs(s.g - b.g), 255),
    b: Math.min(Math.abs(s.b - b.b), 255),
  }

  return rgbToHex(result)

  // return Math.abs(b.l - s.l)
}
