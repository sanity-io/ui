/**
 * Color mixing that is byte-for-byte compatible with the `mix` function from
 * `polished`, which the hosted Themer service (themer.sanity.build) used to
 * interpolate hue tints. Only opaque hex colors are supported, which is all
 * the theme generators ever pass.
 *
 * @internal
 */
export function mix(weight: number, color: string, otherColor: string): string {
  // `polished` returns the other color as-is when the weight is 0
  if (weight === 0) return otherColor

  const [r1, g1, b1] = hexToRgb(color)
  const [r2, g2, b2] = hexToRgb(otherColor)

  const w2 = 1 - weight

  return reduceHex(
    `#${channelToHex(Math.floor(r1 * weight + r2 * w2))}${channelToHex(
      Math.floor(g1 * weight + g2 * w2),
    )}${channelToHex(Math.floor(b1 * weight + b2 * w2))}`,
  )
}

/**
 * Matches `#abc` and `#aabbcc` hex colors (the only formats the theme
 * generators accept), same as the hosted Themer service did.
 *
 * @internal
 */
export function isColor(input: string): boolean {
  return /^#(?:[0-9a-f]{3}){1,2}$/i.test(input)
}

function hexToRgb(color: string): [number, number, number] {
  if (!isColor(color)) {
    throw new TypeError(`Invalid color: ${JSON.stringify(color)} — expected a hex color`)
  }

  const hex =
    color.length === 4
      ? `${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
      : color.slice(1)

  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ]
}

function channelToHex(value: number): string {
  const hex = value.toString(16)

  return hex.length === 1 ? `0${hex}` : hex
}

/** Shortens `#aabbcc` to `#abc` when possible, same as `polished` does */
function reduceHex(hex: string): string {
  if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
    return `#${hex[1]}${hex[3]}${hex[5]}`
  }

  return hex
}
