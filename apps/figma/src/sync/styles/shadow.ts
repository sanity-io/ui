import type {_DTCGShadowToken, _DTCGShadowValue} from '@sanity/ui-tokens/lib'

import {getFigmaDimensionValue} from '../converters/dimension'
import type {SanityFigmaShadowStyleNode} from '../types/styles'

export async function createShadowStyle(
  name: string,
  node: SanityFigmaShadowStyleNode,
  allVariableIdsMap: Map<string, string>,
  shadowTokenMap: Map<string, unknown>,
  disableCache: boolean,
) {
  // eslint-disable-next-line no-console
  console.log('Create shadow style...', name)

  const t = node.token

  await createDTCGShadowStyle(name, t, allVariableIdsMap, shadowTokenMap, disableCache)
}

async function createDTCGShadowStyle(
  name: string,
  t: _DTCGShadowToken,
  allVariableIdsMap: Map<string, string>,
  shadowTokenMap: Map<string, unknown>,
  disableCache: boolean,
) {
  const s = await getOrCreateEffectStyle(name)

  const cacheKey = JSON.stringify(t)

  if (!disableCache && s.getPluginData('sanity-ui-tokens') === cacheKey) {
    return
  }

  let resolvedToken = t

  // Resolve shadow references
  if (typeof t.$value === 'string') {
    const refPath = t.$value.slice(1, -1)
    const referenced = shadowTokenMap.get(refPath)

    if (
      referenced &&
      typeof referenced === 'object' &&
      '$type' in referenced &&
      referenced.$type === 'shadow'
    ) {
      resolvedToken = referenced as _DTCGShadowToken
    } else {
      // eslint-disable-next-line no-console
      console.warn(`[${name}] Could not resolve shadow reference: ${t.$value}`)
      return
    }
  }

  if (typeof resolvedToken.$value === 'string') {
    // Still a reference after resolution - shouldn't happen
    // eslint-disable-next-line no-console
    console.warn(`[${name}] Shadow reference could not be fully resolved`)
    return
  }

  const values = [...toArray(resolvedToken.$value)]

  values.reverse()

  s.effects = values.map((v) => buildEffect(v, allVariableIdsMap))
  s.setPluginData('sanity-ui-tokens', cacheKey)
}

function toArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value
  }
  return [value]
}

function getShadowValue(t: _DTCGShadowValue) {
  return {
    color: t.color,
    offsetX: getFigmaDimensionValue({
      $type: 'dimension',
      $value: t.offsetX,
    }),
    offsetY: getFigmaDimensionValue({
      $type: 'dimension',
      $value: t.offsetY,
    }),
    blur: getFigmaDimensionValue({
      $type: 'dimension',
      $value: t.blur,
    }),
    spread: getFigmaDimensionValue({
      $type: 'dimension',
      $value: t.spread,
    }),
    inset: t.inset ?? false,
  }
}

/**
 * Get or create an effect style by name
 */
async function getOrCreateEffectStyle(name: string): Promise<EffectStyle> {
  const styles = await figma.getLocalEffectStylesAsync()

  let style = styles.find((s) => s.name === name)

  if (!style) {
    style = figma.createEffectStyle()
    style.name = name
  }

  return style
}

function buildEffect(t: _DTCGShadowValue, allVariableIdsMap: Map<string, string>): Effect {
  const {color, offsetX, offsetY, blur, spread, inset} = getShadowValue(t)

  const colorVariableId =
    typeof color === 'string'
      ? allVariableIdsMap.get(color.slice(1, -1).replace(/\./g, '/'))
      : undefined

  const blurVariableId =
    blur.type === 'number-alias' ? allVariableIdsMap.get(blur.target) : undefined

  const offsetXVariableId =
    offsetX.type === 'number-alias' ? allVariableIdsMap.get(offsetX.target) : undefined

  const offsetYVariableId =
    offsetY.type === 'number-alias' ? allVariableIdsMap.get(offsetY.target) : undefined

  const spreadVariableId =
    spread.type === 'number-alias' ? allVariableIdsMap.get(spread.target) : undefined

  return {
    type: inset ? 'INNER_SHADOW' : 'DROP_SHADOW',
    color:
      typeof color === 'string'
        ? {
            r: 0,
            g: 0,
            b: 0,
            a: 1,
          }
        : {
            r: color.components[0],
            g: color.components[1],
            b: color.components[2],
            a: color.alpha ?? 1,
          },
    offset: {
      x: offsetX.type === 'number' ? offsetX.value : 0,
      y: offsetY.type === 'number' ? offsetY.value : 0,
    },
    radius: blur.type === 'number' ? blur.value : 0,
    spread: spread.type === 'number' ? spread.value : 0,
    visible: true,
    blendMode: 'PASS_THROUGH',
    boundVariables: {
      color: colorVariableId ? {type: 'VARIABLE_ALIAS' as const, id: colorVariableId} : undefined,

      offsetX: offsetXVariableId
        ? {type: 'VARIABLE_ALIAS' as const, id: offsetXVariableId}
        : undefined,

      offsetY: offsetYVariableId
        ? {type: 'VARIABLE_ALIAS' as const, id: offsetYVariableId}
        : undefined,

      radius: blurVariableId
        ? {
            type: 'VARIABLE_ALIAS' as const,
            id: blurVariableId,
          }
        : undefined,

      spread: spreadVariableId
        ? {type: 'VARIABLE_ALIAS' as const, id: spreadVariableId}
        : undefined,
    },
  }
}
