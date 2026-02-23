import type {
  SanityColorToken,
  SanityDimensionToken,
  SanityFontToken,
  SanityNumberToken,
  TokenLeaf,
  TokenTree,
} from '@sanity/ui-tokens/system'

import {getFigmaColorValue} from '../converters/color'
import {getFigmaDimensionValue} from '../converters/dimension'
import {getFigmaNumberValue} from '../converters/number'
import {parseFigmaScopes} from '../converters/scopes'
import type {SanityFigmaStyle, SanityFigmaVar} from '../types'

export function findEntities(
  modeValues: TokenTree,
  parentPath?: string,
): {figmaVars: SanityFigmaVar[]; figmaStyles: SanityFigmaStyle[]} {
  const figmaVars: SanityFigmaVar[] = []
  const figmaStyles: SanityFigmaStyle[] = []

  for (const [key, node] of Object.entries(modeValues)) {
    const path = parentPath ? `${parentPath}/${key}` : key

    if (isSanityFontToken(node)) {
      figmaStyles.push({
        name: key,
        node: {type: 'font-style', token: node},
      })
      continue
    }

    if ('$type' in node) {
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

      // eslint-disable-next-line no-console
      console.warn('Unknown node type:', node)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unknown node type: ${(node as any).$type}`)
    }

    const nested = findEntities(node, path)

    figmaVars.push(...nested.figmaVars)
    figmaStyles.push(...nested.figmaStyles)
  }

  return {figmaVars, figmaStyles}
}

function isSanityFontToken(node: TokenTree | TokenLeaf): node is SanityFontToken {
  return 'family' in node && 'scale' in node && 'weight' in node
}
