import {parseColor} from './parse'

/**
 * @internal
 */
export function rgba(color: unknown, a: number): string {
  if (typeof color === 'string' && color.startsWith('var(')) {
    return `color-mix(in srgb, transparent, ${color} ${a * 100}%)`
  }

  const rgb = parseColor(color)

  return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`
}
