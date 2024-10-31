import type {ResolvedColorToken} from '@sanity/ui/theme'

/** @public */
export type CSSVariableKey = `--${string}`

/** @public */
export interface RenderColorContext {
  bgVar: CSSVariableKey
  bgValue: string
  prefix: string
}

/** @public */
export function renderColor(token: ResolvedColorToken, context: RenderColorContext): string {
  const {bgValue, prefix} = context

  const colorVar =
    token.color.type === 'hue'
      ? `--${prefix}${token.color.hue}-${token.color.tint}`
      : `--${prefix}${token.color.type}`

  if (token.mix < 1) {
    return `color-mix(in srgb, ${bgValue}, var(${colorVar}) ${token.mix * 100}%)`
  }

  if (token.opacity < 1) {
    return `color-mix(in srgb, transparent, var(${colorVar}) ${token.opacity * 100}%)`
  }

  return `var(${colorVar})`
}
