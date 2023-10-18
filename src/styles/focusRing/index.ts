import {FocusRing, cssVars} from '../../theme'

export function focusRingBorderStyle(border: {color: string; width: number}): string {
  return `inset 0 0 0 ${border.width}px ${border.color}`
}

export function focusRingStyle(opts: {
  base?: {bg: string}
  border?: {color: string; width: number}
  focusRing: FocusRing
}): string {
  const {base, border, focusRing} = opts
  const focusRingOutsetWidth = focusRing.offset + focusRing.width
  const focusRingInsetWidth = 0 - focusRing.offset
  const bgColor = base ? base.bg : cssVars.mutable['bg-color']

  return [
    focusRingInsetWidth > 0 &&
      `inset 0 0 0 ${focusRingInsetWidth}px ${cssVars.positive['border-accent']}`,
    border && focusRingBorderStyle(border),
    focusRingInsetWidth < 0 && `0 0 0 ${0 - focusRingInsetWidth}px ${bgColor}`,
    focusRingOutsetWidth > 0 &&
      `0 0 0 ${focusRingOutsetWidth}px ${cssVars.positive['border-accent']}`,
  ]
    .filter(Boolean)
    .join(',')
}
