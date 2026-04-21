import type {
  _DTCGDurationToken,
  _DTCGFontFamilyToken,
  _DTCGFontWeightToken,
  _DTCGShadowToken,
  _DTCGStringToken,
  SanityColorToken,
  SanityDimensionToken,
  SanityNumberToken,
  SanityToken,
} from '@sanity/ui-tokens/lib'

import type {CSSTokens, SanityTypographyCSSTokens} from './types'

export function _toCSSTokens<Tokens extends object>(
  tokens: Tokens,
  vars: Record<string, unknown>,
  throwOnMissingVar: boolean = true,
): CSSTokens<Tokens> {
  return visitNode(tokens, undefined) as CSSTokens<Tokens>

  function visitNode(node: unknown, inheritedType: SanityToken['$type'] | undefined): unknown {
    if (!isRecord(node)) {
      return node
    }

    if (isTokenNode(node)) {
      const effectiveType = (node.$type ?? inheritedType) as SanityToken['$type'] | undefined

      if (!effectiveType) {
        if (throwOnMissingVar) {
          throw new Error('Token is missing $type and did not inherit one from a parent group')
        }
        return 'todo'
      }

      return renderToken(
        {
          ...node,
          $type: effectiveType,
        } as SanityToken,
        vars,
      )
    }

    const nextInheritedType =
      typeof node['$type'] === 'string' ? (node['$type'] as SanityToken['$type']) : inheritedType

    return Object.entries(node).reduce<Record<string, unknown>>((acc, [key, value]) => {
      if (key.startsWith('$')) {
        return acc
      }

      acc[key] = visitNode(value, nextInheritedType)
      return acc
    }, {})
  }

  function renderToken(token: SanityToken, vars: Record<string, unknown>) {
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

    if (token.$type === 'typography') {
      return {
        fontFamily: renderFontFamilyToken(
          {$type: 'fontFamily', $value: token.$value.fontFamily},
          vars,
        ),
        fontSize: renderDimensionToken({$type: 'dimension', $value: token.$value.fontSize}, vars),
        fontWeight: renderFontWeightToken(
          {$type: 'fontWeight', $value: token.$value.fontWeight},
          vars,
        ),
        lineHeight: renderDimensionToken(
          {$type: 'dimension', $value: token.$extensions['io.sanity'].lineHeight},
          vars,
        ),
        letterSpacing: renderDimensionToken(
          {$type: 'dimension', $value: token.$value.letterSpacing},
          vars,
        ),
        ascenderHeight: renderDimensionToken(
          {$type: 'dimension', $value: token.$extensions['io.sanity'].ascenderHeight},
          vars,
        ),
        descenderHeight: renderDimensionToken(
          {$type: 'dimension', $value: token.$extensions['io.sanity'].descenderHeight},
          vars,
        ),
        iconSize: renderDimensionToken(
          {$type: 'dimension', $value: token.$extensions['io.sanity'].iconSize},
          vars,
        ),
        customIconSize: renderDimensionToken(
          {$type: 'dimension', $value: token.$extensions['io.sanity'].customIconSize},
          vars,
        ),
      } satisfies SanityTypographyCSSTokens
    }

    // eslint-disable-next-line no-console
    console.warn('unhandled token:', token)
    return 'todo'
  }

  function renderColorToken(token: SanityColorToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, '#000000')
    }

    const hex = token.$value.hex
    const alpha = token.$value.alpha ?? 1

    if (hex && alpha === 1) {
      return token.$value.hex
    }

    return `rgb(${token.$value.components.map((c) => (c * 255).toFixed(0)).join(' ')} / ${alpha})`
  }

  function renderDimensionToken(token: SanityDimensionToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, '0px')
    }

    return `${token.$value.value}${token.$value.unit}`
  }

  function renderNumberToken(token: SanityNumberToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, '0')
    }

    return String(token.$value)
  }

  function renderShadowToken(token: _DTCGShadowToken, vars: Record<string, unknown>) {
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

  function renderFontFamilyToken(token: _DTCGFontFamilyToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, 'serif')
    }

    return token.$value.join(', ')
  }

  function renderFontWeightToken(token: _DTCGFontWeightToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string' && token.$value.startsWith('{')) {
      return resolveVar(token.$value, vars, 'normal')
    }

    return String(token.$value)
  }

  function renderStringToken(token: _DTCGStringToken, vars: Record<string, unknown>) {
    if (
      typeof token.$value === 'string' &&
      token.$value.startsWith('{') &&
      token.$value.endsWith('}')
    ) {
      return resolveVar(token.$value, vars, '')
    }

    return token.$value
  }

  function renderDurationToken(token: _DTCGDurationToken, vars: Record<string, unknown>) {
    if (typeof token.$value === 'string') {
      return resolveVar(token.$value, vars, '0ms')
    }

    return `${token.$value.value}${token.$value.unit}`
  }

  function resolveVar(name: string, vars: Record<string, unknown>, fallback: string): string {
    const path = name.slice(1, -1).split('.')

    let value: Record<string, unknown> | unknown = vars

    for (const segment of path) {
      value = isRecord(value) ? value[segment] : value
    }

    if (typeof value === 'string') {
      return value
    }

    if (throwOnMissingVar) {
      try {
        throw new Error(`Variable not found: ${name}`)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(name, vars)
        // eslint-disable-next-line no-console
        console.error(err)
        throw err
      }
    }

    return fallback
  }
}

function isTokenNode(value: unknown): value is {$value: unknown; $type?: string} {
  return isRecord(value) && '$value' in value
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
