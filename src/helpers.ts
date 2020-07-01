export function getResponsiveProp(
  val: number | number[] | undefined,
  defaultVal: number[]
): number[] {
  if (val === undefined) return defaultVal

  return Array.isArray(val) ? val : [val]
}

export function rem(pixelValue: number): string {
  return `${pixelValue / 16}rem`
}
