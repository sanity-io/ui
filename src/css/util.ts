import type {BoxShadow} from '@sanity/ui/theme'

/** @internal */
export function rem(value: number): string {
  if (value === 0) return '0'

  return `${value / 16}rem`
}

/** @internal */
export function px(value: number): string {
  if (value === 0) return '0'

  return `${value}px`
}

/** @internal */
export function toBoxShadow(value: BoxShadow | undefined): string {
  if (!value) return 'none'

  return value.map((n) => px(n)).join(' ')
}
