export function lerp(x: number, y: number, a: number): number {
  return x * (1 - a) + y * a
}

export function invlerp(x: number, y: number, a: number): number {
  return clamp((a - x) / (y - x))
}

export function clamp(a: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, a))
}

export function range(x1: number, y1: number, x2: number, y2: number, a: number): number {
  return lerp(x2, y2, invlerp(x1, y1, a))
}

export function round(value: number): number {
  return Math.round(value)
}
