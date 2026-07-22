import {hexToRgb} from '@sanity/color'

export const AA_CONTRAST_THRESHOLD = 4.5
export const AAA_CONTRAST_THRESHOLD = 7

/** WCAG 2.x relative luminance (https://www.w3.org/TR/WCAG22/#dfn-relative-luminance) */
function luminance(hex: string): number {
  const [lr, lg, lb] = hexToRgb(hex).map((channel) => {
    const s = channel / 255

    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb
}

/** WCAG 2.x contrast ratio (https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio) */
export function getContrast(hexA: string, hexB: string): number {
  const a = luminance(hexA)
  const b = luminance(hexB)

  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}
