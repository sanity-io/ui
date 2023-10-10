/** @internal */
export function clamp(num: number): number {
  return Math.max(Math.min(num, 255), 0)
}
