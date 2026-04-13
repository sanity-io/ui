import type {
  SanityColorToken,
  SanityDimensionToken,
  SanityNumberToken,
  SanityToken,
  TokenType,
} from '@sanity/ui-tokens/lib'

import {getFigmaColorValue} from './converters/color'
import {getFigmaDimensionValue} from './converters/dimension'
import {getFigmaNumberValue} from './converters/number'
import {parseFigmaScopes} from './converters/scopes'
import type {SanityFigmaStyle, SanityFigmaVar, TokenTree} from './types'

export function findEntities(
  modeValues: object,
  parentPath?: string,
): {figmaVars: SanityFigmaVar[]; figmaStyles: SanityFigmaStyle[]} {
  const figmaVars: SanityFigmaVar[] = []
  const figmaStyles: SanityFigmaStyle[] = []

  const tokenTree = _map(modeValues)

  for (const [key, _node] of Object.entries(tokenTree)) {
    const path = parentPath ? `${parentPath}/${key}` : key

    if ('family' in _node && 'featureSettings' in _node && 'scale' in _node && 'weight' in _node) {
      figmaStyles.push({
        name: key,
        node: {
          type: 'font-style',
          tokens: _node,
        },
      })
      continue
    }

    if ('$type' in _node) {
      const node = _node as SanityToken

      if (node.$type === 'color') {
        figmaVars.push({
          name: path,
          value: getFigmaColorValue(node as SanityColorToken),
          scopes: parseFigmaScopes(
            (node as SanityColorToken).$extensions?.['io.sanity']?.scopes ?? [],
          ),
        })
        continue
      }

      if (node.$type === 'dimension') {
        figmaVars.push({
          name: path,
          value: getFigmaDimensionValue(node),
          scopes: parseFigmaScopes(
            (node as SanityDimensionToken).$extensions?.['io.sanity']?.scopes ?? [],
          ),
        })
        continue
      }

      if (node.$type === 'number') {
        figmaVars.push({
          name: path,
          value: getFigmaNumberValue(node),
          scopes: parseFigmaScopes(
            (node as SanityNumberToken).$extensions?.['io.sanity']?.scopes ?? [],
          ),
        })
        continue
      }

      if (node.$type === 'shadow') {
        figmaStyles.push({
          name: path,
          node: {type: 'shadow', token: node},
        })
        continue
      }

      if (node.$type === 'fontFamily') {
        // const family =
        figmaVars.push({
          name: path,
          value: {
            type: 'string',
            value: node.$extensions['io.sanity'].figma.value,
          },
          scopes: [],
        })
        continue
      }

      if (node.$type === 'string') {
        figmaVars.push({
          name: path,
          value: {
            type: 'string',
            value: node.$value,
          },
          scopes: [],
        })
        continue
      }

      if (node.$type === 'fontWeight') {
        figmaVars.push({
          name: path,
          value: {
            type: 'string',
            value: node.$extensions['io.sanity'].figma.value,
          },
          scopes: [],
        })
        continue
      }

      if (node.$type === 'duration') {
        figmaVars.push({
          name: path,
          value:
            typeof node.$value === 'string'
              ? {
                  type: 'number-alias',
                  target: node.$value.slice(1, -1).replace(/\./g, '/'),
                }
              : {
                  type: 'number',
                  value: node.$value.value, // todo: account for unit
                },
          scopes: [],
        })
        continue
      }

      // todo
      // node.$type === 'boolean'
      // node.$type === 'border'
      // node.$type === 'cubicBezier'
      // node.$type === 'typography'

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unhandled node type: ${(node as any).$type}`)
    }

    const nested = findEntities(_node, path)

    figmaVars.push(...nested.figmaVars)
    figmaStyles.push(...nested.figmaStyles)
  }

  return {figmaVars, figmaStyles}
}

export function _map(input: object, parentType?: TokenType): SanityToken | TokenTree {
  const obj = {...input}

  let $type: TokenType | undefined = parentType

  if ('$type' in obj) {
    $type = obj.$type as TokenType
  }

  if ('$value' in obj) {
    return {
      ...obj,
      $type,
      $value: obj.$value,
    } as SanityToken
  }

  const result: TokenTree = {}

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$type') {
      continue
    }

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = _map(value, $type)
    } else {
      throw new Error(`Unknown value type: ${typeof value}`)
    }
  }

  return result
}
