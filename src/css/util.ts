import {type ThemeBoxShadow} from '@sanity/ui/theme'

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function rem(value: number): string {
  if (value === 0) return '0'

  return `${value / 16}rem`
}

export function px(value: number): string {
  if (value === 0) return '0'

  return `${value}px`
}

export function toBoxShadow(value: ThemeBoxShadow | undefined): string {
  if (!value) return 'none'

  return value.map((n) => px(n)).join(' ')
}
