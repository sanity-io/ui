import {ColorHueKey} from '@sanity/color'
import {parseColor} from './parseColor'
import {ColorToken} from './token'

type CSSVariableKey = `--${string}`

export interface RenderColorContext {
  bgVar: CSSVariableKey
  hue: ColorHueKey
}

export function renderColor(token: ColorToken, context: RenderColorContext): string {
  const {bgVar, hue} = context

  const result = parseColor(token)

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
