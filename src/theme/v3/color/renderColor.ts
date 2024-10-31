import {Hue} from '../../palette'
import {ThemeColorSchemeKey} from '../../v2'
import {parseColor} from './parseColor'
import {ColorToken} from './token'

/** @public */
export type CSSVariableKey = `--${string}`

/** @public */
export interface RenderColorContext {
  bgVar: CSSVariableKey
  bgValue: string
  hue: Hue
  scheme: ThemeColorSchemeKey
}

/** @public */
export function renderColor(token: [ColorToken, ColorToken], context: RenderColorContext): string {
  const {bgValue, bgVar, hue, scheme} = context

  const t = token[scheme === 'dark' ? 0 : 1]

  if (t === 'inherit') {
    return bgValue
  }

  const result = parseColor(t)

  const colorVar =
    result.color.type === 'hue'
      ? `--${result.color.hue ?? hue}-${result.color.tint}`
      : `--${result.color.type}`

  if (result.mix !== undefined) {
    return `color-mix(in srgb, var(${bgVar}), var(${colorVar}) ${result.mix}%)`
  }

  if (result.opacity !== undefined) {
    return `color-mix(in srgb, transparent, var(${colorVar}) ${result.opacity * 100}%)`
  }

  return `var(${colorVar})`
}
