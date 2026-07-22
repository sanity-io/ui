/** @internal */
export function interpolate(min: number, max: number, val: number): number {
  const size = max - min

  return min + size * val
}
