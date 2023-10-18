import {
  parseColor,
  rgbToHex,
  screen as _screen,
  multiply as _multiply,
  rgba,
} from '../lib/color-fns'

export function multiply(bg: string, fg: string): string {
  const b = parseColor(bg)
  const s = parseColor(fg)
  const hex = rgbToHex(_multiply(b, s))

  if (s.a) {
    return rgba(hex, s.a)
  }

  return hex
}

export function screen(bg: string, fg: string): string {
  const b = parseColor(bg)
  const s = parseColor(fg)
  const hex = rgbToHex(_screen(b, s))

  if (s.a) {
    return rgba(hex, s.a)
  }

  return hex
}
