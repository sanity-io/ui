import {tokenSystem} from '@sanity/ui-tokens/system'

import {createStateTokenSetsFromPath} from './transformStateLayer'

/**
 * Extracts source token sets from any layer type in the token system.
 * Returns unprojected token sets for operations that need the canonical token shape.
 *
 * Use this for global token lookups (like shadow token collection).
 * Use getFigmaModeTokenSets for Figma variable creation.
 *
 * @internal
 */
export function getSourceTokenSets(layer: (typeof tokenSystem.layers)[number]): object[] {
  if (layer.kind === 'layer' || layer.kind === 'state') {
    return [layer.tokenSet]
  }

  if (layer.kind === 'variant') {
    return Object.values(layer.tokenSets)
  }

  const _exhaustive: never = layer
  throw new Error(`Unsupported layer kind: ${String(_exhaustive)}`)
}

/**
 * Extracts Figma mode token sets from any layer type in the token system.
 * Handles projection for state layers at runtime.
 *
 * This is Figma-specific projection and should not be used by ui-css or other consumers.
 *
 * @internal
 */
export function getFigmaModeTokenSets(
  layer: (typeof tokenSystem.layers)[number],
): Record<string, object> {
  if (layer.kind === 'layer') {
    return {default: layer.tokenSet}
  }

  if (layer.kind === 'variant') {
    return Object.fromEntries(layer.variants.map((variant) => [variant, layer.tokenSets[variant]]))
  }

  if (layer.kind === 'state') {
    return createStateTokenSetsFromPath({
      tokenSet: layer.tokenSet,
      path: layer.statePath,
    })
  }

  const _exhaustive: never = layer
  throw new Error(`Unsupported layer kind: ${String(_exhaustive)}`)
}
