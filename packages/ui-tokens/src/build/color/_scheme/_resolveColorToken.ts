import type {ColorExpr} from '../../../lib/color/_parseColorExprLiteral'
import type {ColorToken} from '../../../lib/color/types'
import type {_DTCGColorValue} from '../../../lib/dtcg/types'
import {_resolveColorValue} from './_resolveColorValue'

export interface _ResolveColorOptions {
  bg: ColorExpr
  systemBg: ColorExpr
}

export function _resolveColorToken(
  expr: ColorExpr,
  options: _ResolveColorOptions,
  debugId: string,
): ColorToken {
  const {bg, systemBg} = options

  if (expr.type === 'inherit') {
    return _resolveColorToken(bg, {bg: systemBg, systemBg}, ``)
  }

  const node: ColorToken = colorToken({
    colorSpace: 'srgb',
    components: [0, 0, 0],
    alpha: 0,
  })

  if (expr.type === 'keyword') {
    node.$value = `{color.palette.${expr.name}}`
    node.$extensions = {
      'io.sanity.name': `color.palette.${expr.name}`,
    }
  }

  if (expr.type === 'tint') {
    node.$value = `{color.palette.${expr.hue}.${expr.tint}}`
    node.$extensions = {
      'io.sanity.name': `color.palette.${expr.hue}.${expr.tint}`,
    }
  }

  if (expr.mix < 1) {
    const bgNode = _resolveColorToken(bg, {bg: systemBg, systemBg}, `${debugId}.bg`)

    // Provide mixing expression in extensions for advanced systems (eg. `color-mix` in CSS)
    node.$extensions = {
      ...node.$extensions,
      'io.sanity.expr': {
        ...node.$extensions?.['io.sanity.expr'],
        v: 1,
        op: 'mix',
        space: 'srgb',
        stops: [
          {
            color: bgNode.$value,
            stop: 0,
          },
          {
            color: node.$value,
            stop: expr.mix,
          },
        ],
      },
      'io.sanity.name': `color-mix(in srgb, ${bgNode.$extensions?.['io.sanity.name']}, ${node.$extensions?.['io.sanity.name']}, ${expr.mix})`,
    }

    try {
      node.$value = _resolveColorValue(expr, undefined, {mixBg: bg, systemBg})
    } catch (error) {
      // If mixing fails, keep the original value and warn
      // eslint-disable-next-line no-console
      console.warn(`[${debugId}] Failed to compute mix for ${JSON.stringify(expr)}:`, error)
    }
  }

  if (expr.opacity !== 1) {
    // Store opacity operation in extensions for advanced systems
    node.$extensions = {
      ...node.$extensions,
      'io.sanity.opacity': expr.opacity,
    }

    // Compute color with opacity for fallback systems
    try {
      node.$value = _resolveColorValue(expr, node, {mixBg: systemBg, systemBg})
    } catch (error) {
      // If opacity application fails, keep the original value and warn
      // eslint-disable-next-line no-console
      console.warn(`[${debugId}] Failed to apply opacity for ${JSON.stringify(expr)}:`, error)
    }
  }

  return node
}

function colorToken(value: _DTCGColorValue): ColorToken {
  return {$value: value}
}
