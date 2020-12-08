export function borderStyle(input: {border: {width: number}}, color: string) {
  return `inset 0 0 0 ${input.border.width}px ${color}`
}

export function focusRingStyle(
  border: boolean | undefined,
  focusRing: {offset: number; width: number},
  input: {border: {width: number}},
  borderColor: string
) {
  const focusRingOutsetWidth = focusRing.offset + focusRing.width
  const focusRingInsetWidth = 0 - focusRing.offset

  return [
    focusRingInsetWidth > 0 && `inset 0 0 0 ${focusRingInsetWidth}px var(--card-focus-ring-color)`,
    border && borderStyle(input, borderColor),
    focusRingInsetWidth < 0 && `0 0 0 ${0 - focusRingInsetWidth}px var(--card-bg-color)`,
    focusRingOutsetWidth > 0 && `0 0 0 ${focusRingOutsetWidth}px var(--card-focus-ring-color)`,
  ]
    .filter(Boolean)
    .join(',')
}
