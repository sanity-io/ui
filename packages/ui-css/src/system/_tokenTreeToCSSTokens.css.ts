import type {
  DTCGColorToken,
  DTCGDimensionToken,
  DTCGDurationToken,
  DTCGFontFamilyToken,
  DTCGFontWeightToken,
  DTCGNumberToken,
  DTCGShadowToken,
  DTCGStringToken,
  TokenLeaf,
  TokenTree,
} from '@sanity/ui-tokens/system'

import {_fromEntries} from '../_fromEntries'
import type {CSSTokens, SanityFontStyleCSSTokens} from './types.css'

export function _tokenTreeToCSSTokens<Tokens extends TokenTree>(
  tokenTree: Tokens,
  vars: Record<string, unknown>,
  throwOnMissingVar: boolean = false,
) {
  return Object.entries(tokenTree).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if ('$type' in value) {
      if (value.$type === 'typography') {
        acc[key] = {
          fontFamily: renderFontFamilyToken(
            {$type: 'fontFamily', $value: value.$value.fontFamily},
            vars,
          ),
          fontSize: renderDimensionToken({$type: 'dimension', $value: value.$value.fontSize}, vars),
          fontWeight: renderFontWeightToken(
            {$type: 'fontWeight', $value: value.$value.fontWeight},
            vars,
          ),
          lineHeight: renderDimensionToken(
            {$type: 'dimension', $value: value.$extensions['io.sanity'].lineHeight},
            vars,
          ),
          letterSpacing: renderDimensionToken(
            {$type: 'dimension', $value: value.$value.letterSpacing},
            vars,
          ),
          ascenderHeight: renderDimensionToken(
            {$type: 'dimension', $value: value.$extensions['io.sanity'].ascenderHeight},
            vars,
          ),
          descenderHeight: renderDimensionToken(
            {$type: 'dimension', $value: value.$extensions['io.sanity'].descenderHeight},
            vars,
          ),
          iconSize: renderDimensionToken(
            {$type: 'dimension', $value: value.$extensions['io.sanity'].iconSize},
            vars,
          ),
          customIconSize: renderDimensionToken(
            {$type: 'dimension', $value: value.$extensions['io.sanity'].customIconSize},
            vars,
          ),
        } satisfies SanityFontStyleCSSTokens
        return acc
      }

      acc[key] = renderTokenLeaf(value as TokenLeaf, vars)
      return acc
    }

    acc[key] = _tokenTreeToCSSTokens(value, vars)
    return acc
  }, {}) as CSSTokens<Tokens>

  function renderTokenLeaf(token: TokenLeaf, vars: Record<string, unknown>) {
    if (token.$type === 'color') {
      return renderColorToken(token, vars)
    }

    if (token.$type === 'dimension') {
      return renderDimensionToken(token, vars)
    }

    if (token.$type === 'number') {
      return renderNumberToken(token, vars)
    }

    if (token.$type === 'shadow') {
      return renderShadowToken(token, vars)
    }

    if (token.$type === 'fontFamily') {
      return renderFontFamilyToken(token, vars)
    }

    if (token.$type === 'fontWeight') {
      return renderFontWeightToken(token, vars)
    }

    if (token.$type === 'string') {
      return renderStringToken(token, vars)
    }

    if (token.$type === 'duration') {
      return renderDurationToken(token, vars)
    }

    // eslint-disable-next-line no-console
    console.warn('unhandled token:', token)

    return 'todo'
  }

  function renderColorToken(token: DTCGColorToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, '#000000')
    }

    if (token.$value.hex) {
      return token.$value.hex
    }

    return `rgba(${token.$value.components.map((c) => (c * 255).toFixed(0)).join(', ')}, ${token.$value.alpha ?? 1})`
  }

  function renderDimensionToken(token: DTCGDimensionToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, '0px')
    }

    return `${token.$value.value}${token.$value.unit}`
  }

  function renderNumberToken(token: DTCGNumberToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, '0')
    }

    return String(token.$value)
  }

  function renderShadowToken(token: DTCGShadowToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, '0px 0px 0px 0px #000000')
    }

    const values = toArray(token.$value)

    return values
      .map((value) => {
        const color = renderColorToken({$type: 'color', $value: value.color}, vars)
        const offsetX = renderDimensionToken({$type: 'dimension', $value: value.offsetX}, vars)
        const offsetY = renderDimensionToken({$type: 'dimension', $value: value.offsetY}, vars)
        const blur = renderDimensionToken({$type: 'dimension', $value: value.blur}, vars)
        const spread = renderDimensionToken({$type: 'dimension', $value: value.spread}, vars)
        const str = `${offsetX} ${offsetY} ${blur} ${spread} ${color}`

        return value.inset ? `inset ${str}` : str
      })
      .join(', ')
  }

  function renderFontFamilyToken(token: DTCGFontFamilyToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, 'serif')
    }

    return token.$value.join(', ')
  }

  function renderFontWeightToken(token: DTCGFontWeightToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string' && token.$value.startsWith('{')) {
      return resolveVar(token.$value, vars, 'normal')
    }

    return String(token.$value)
  }

  function renderStringToken(token: DTCGStringToken, vars: Record<string, unknown>) {
    if (
      typeof token.$value === 'string' &&
      token.$value.startsWith('{') &&
      token.$value.endsWith('}')
    ) {
      return resolveVar(token.$value, vars, '')
    }

    return token.$value
  }

  function renderDurationToken(token: DTCGDurationToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, '0ms')
    }

    return `${token.$value.value}${token.$value.unit}`
  }

  function resolveVar(name: string, vars: Record<string, unknown>, fallback: string): string {
    const path = name.slice(1, -1).split('.')

    let value: Record<string, unknown> | unknown = vars

    for (const segment of path) {
      value = isRecord(value) ? value?.[segment] : value
    }

    if (typeof value === 'string') {
      return value
    }

    if (throwOnMissingVar) {
      try {
        throw new Error(`Variable not found: ${name}`)
      } catch (err) {
        // vanilla-extract swallows the error details,
        // so we print it to the console and throw it again
        // eslint-disable-next-line no-console
        console.error(err)
        throw err
      }
    }

    return fallback
  }
}

function toArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value
  }
  return [value]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
