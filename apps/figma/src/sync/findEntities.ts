import type {
  SanityColorToken,
  SanityDimensionToken,
  SanityNumberToken,
  SanityToken,
  TokenType,
} from '@sanity/ui-tokens/lib'

import {getFigmaColorValue} from './converters/color'
import {getFigmaDimensionValue} from './converters/dimension'
import {getFigmaDurationValue} from './converters/duration'
import {getFigmaNumberValue} from './converters/number'
import {parseFigmaScopes} from './converters/scopes'
import type {SanityFigmaStyle, SanityFigmaVar, TokenTree} from './types'

export function findEntities(
  modeValues: object,
  parentPath?: string,
  context?: {modeKey?: string},
): {figmaVars: SanityFigmaVar[]; figmaStyles: SanityFigmaStyle[]} {
  const figmaVars: SanityFigmaVar[] = []
  const figmaStyles: SanityFigmaStyle[] = []

  const tokenTree = _map(modeValues)

  for (const [key, _node] of Object.entries(tokenTree)) {
    const path = parentPath && parentPath !== 'font' ? `${parentPath}/${key}` : key

    if ('family' in _node && 'featureSettings' in _node && 'scale' in _node && 'weight' in _node) {
      // For font styles from variant/state layers, inject mode after first segment
      let stylePath = path
      if (context?.modeKey) {
        const segments = path.split('/')
        if (segments.length >= 2) {
          // Insert mode after first segment
          segments.splice(1, 0, context.modeKey)
          stylePath = segments.join('/')
        }
      }
      figmaStyles.push({
        name: stylePath,
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
        const n = node as SanityColorToken

        const figmaAlias = n.$extensions?.['io.sanity.figmaAlias']

        if (figmaAlias) {
          figmaVars.push({
            name: path,
            value: {
              type: 'color-alias',
              target: figmaAlias.slice(1, -1).replace(/\./g, '/'),
            },
            scopes: parseFigmaScopes(n.$extensions?.['io.sanity.scopes'] ?? []),
          })
        }

        figmaVars.push({
          name: path,
          value: getFigmaColorValue(n),
          scopes: parseFigmaScopes(n.$extensions?.['io.sanity.scopes'] ?? []),
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
        // For styles from variant/state layers, inject mode after first segment
        // e.g., button/boxShadow -> button/default/boxShadow
        let stylePath = path
        if (context?.modeKey) {
          const segments = path.split('/')
          if (segments.length >= 2) {
            // Insert mode after first segment: [button, boxShadow] -> [button, default, boxShadow]
            segments.splice(1, 0, context.modeKey)
            stylePath = segments.join('/')
          }
        }
        figmaStyles.push({
          name: stylePath,
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
          value: getFigmaDurationValue(node),
          scopes: [],
        })
        continue
      }

      throw new Error(`Unhandled node type: ${node.$type}`)
    }

    const nested = findEntities(_node, path, context)

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
