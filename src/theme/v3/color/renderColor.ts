import {Hue} from '../../palette'
import {ThemeColorSchemeKey} from '../../v2'
import {parseColor} from './parseColor'
import {ColorToken} from './token'

type CSSVariableKey = `--${string}`

export interface RenderColorContext {
  bgVar: CSSVariableKey
  hue: Hue
  scheme: ThemeColorSchemeKey
}

export function renderColor(token: [ColorToken, ColorToken], context: RenderColorContext): string {
  const {bgVar, hue, scheme} = context

  const i = scheme === 'dark' ? 0 : 1

  const result = parseColor(token[i])

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
