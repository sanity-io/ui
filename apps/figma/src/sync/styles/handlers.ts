import type {SanityFigmaStyle} from '../types/styles'
import {createFontStyleStyle} from './fontStyle'
import {createShadowStyle} from './shadow'

export async function createOrUpdateStyle(
  style: SanityFigmaStyle,
  allVariableIdsMap: Map<string, string>,
  shadowTokenMap: Map<string, unknown>,
  disableCache: boolean,
) {
  if (style.node.type === 'shadow') {
    await createShadowStyle(style.name, style.node, allVariableIdsMap, shadowTokenMap, disableCache)
    return
  }

  if (style.node.type === 'font-style') {
    await createFontStyleStyle(style.name, style.node, allVariableIdsMap, disableCache)
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  throw new Error(`Unknown style type: ${(style.node as any).type}`)
}
