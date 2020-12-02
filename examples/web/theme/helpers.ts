import {multiply as _multiply, screen as _screen} from 'color-blend'
import parseColor from 'parse-color'

export function multiply(bg: string, fg: string) {
  const _a = parseColor(bg).rgb
  const _b = parseColor(fg).rgb

  const {r, g, b} = _multiply(
    {
      r: _a[0],
      g: _a[1],
      b: _a[2],
      a: 1,
    },
    {
      r: _b[0],
      g: _b[1],
      b: _b[2],
      a: 1,
    }
  )

  return `rgb(${r},${g},${b})`
}

export function screen(bg: string, fg: string) {
  const _a = parseColor(bg).rgb
  const _b = parseColor(fg).rgb

  const {r, g, b} = _screen(
    {
      r: _a[0],
      g: _a[1],
      b: _a[2],
      a: 1,
    },
    {
      r: _b[0],
      g: _b[1],
      b: _b[2],
      a: 1,
    }
  )

  return `rgb(${r},${g},${b})`
}
