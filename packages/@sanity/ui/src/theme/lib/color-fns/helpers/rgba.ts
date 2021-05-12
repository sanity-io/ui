import {parseColor} from '../parse'

export function rgba(color: unknown, a: number) {
  const rgb = parseColor(color)

  return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`
}
