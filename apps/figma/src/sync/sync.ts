import {tokenSystem} from '@sanity/ui-tokens/system'

import {resolveAliases} from './aliases'
import {
  buildModeMap,
  ensureMode,
  getOrCreateCollection,
  loadExistingVariables,
  removeExtraModes,
} from './collections'
import {findEntities} from './findEntities'
import {getFigmaModeTokenSets, getSourceTokenSets} from './layers'
import {createOrUpdateStyle} from './styles/handlers'
import type {Alias} from './types'
import type {SanityFigmaStyle} from './types/styles'
import {createOrUpdateVariable} from './variables/handlers'

export async function sync(options: {disableCache?: boolean; disableScopes?: boolean}) {
  const localCollections = await figma.variables.getLocalVariableCollectionsAsync()
  const allVariablesMap = new Map<string, Variable>()
  const allVariableIdsMap = new Map<string, string>()
  const allFigmaStyles: SanityFigmaStyle[] = []
  const allAliases: Alias[] = []

  // Build a global shadow token map for resolving cross-layer references
  // Use source token sets (not Figma-projected) for canonical token lookup
  const shadowTokenMap = new Map<string, unknown>()
  for (const layer of tokenSystem.layers) {
    for (const tokenSet of getSourceTokenSets(layer)) {
      collectShadowTokens(tokenSet, shadowTokenMap)
    }
  }

  for (const layer of tokenSystem.layers) {
    let collection: VariableCollection | undefined
    let variablesArray: Variable[] | undefined
    let variablesMap: Map<string, Variable> | undefined
    let variableIdsMap: Map<string, string> | undefined

    let modes: Record<string, string> | undefined

    const aliases: Alias[] = []

    const modeTokenSets = getFigmaModeTokenSets(layer)
    const modeKeys = Object.keys(modeTokenSets)

    for (const modeKey of modeKeys) {
      const modeValues = modeTokenSets[modeKey]

      const {figmaVars, figmaStyles} = findEntities(modeValues, undefined, {
        modeKey,
      })

      if (figmaVars.length > 0) {
        if (!collection || !variablesMap || !variableIdsMap || !modes) {
          collection = getOrCreateCollection(localCollections, layer.title)
          variablesArray = await loadExistingVariables(collection)
          // Convert array to Maps for O(1) lookups
          variablesMap = new Map(variablesArray.map((v) => [v.name, v]))
          variableIdsMap = new Map(variablesArray.map((v) => [v.name, v.id]))
          modes = buildModeMap(collection)
        }
        const modeId = ensureMode(collection, modes!, modeKey)

        // eslint-disable-next-line no-console
        console.log(`Processing ${figmaVars.length} variables for ${layer.title}/${modeKey}...`)

        for (const figmaVar of figmaVars) {
          createOrUpdateVariable(
            figmaVar,
            modeId,
            collection,
            variablesMap,
            variableIdsMap,
            aliases,
            layer.name.startsWith('_'),
            options.disableCache ?? false,
            options.disableScopes ?? false,
          )
        }
      }

      allFigmaStyles.push(...figmaStyles)
    }

    if (collection) {
      // Remove any modes that aren't in our expected list (e.g., "Mode 1")
      removeExtraModes(collection, modeKeys)
    }

    // Merge into global Maps
    if (variablesMap) {
      for (const [name, variable] of variablesMap) {
        allVariablesMap.set(name, variable)
      }
    }
    if (variableIdsMap) {
      for (const [name, id] of variableIdsMap) {
        allVariableIdsMap.set(name, id)
      }
    }

    // Collect all aliases for resolution after all layers are processed
    allAliases.push(...aliases)
  }

  // Resolve all aliases after all variables have been created and registered
  resolveAliases(allAliases, allVariableIdsMap)

  if (allFigmaStyles.length > 0) {
    // eslint-disable-next-line no-console
    console.log(`Processing ${allFigmaStyles.length} styles...`)

    for (const figmaStyle of allFigmaStyles) {
      await createOrUpdateStyle(
        figmaStyle,
        allVariableIdsMap,
        shadowTokenMap,
        options.disableCache ?? false,
      )
    }
  }
}

function collectShadowTokens(
  obj: unknown,
  map: Map<string, unknown>,
  parentPath = '',
  parentType?: string,
): void {
  if (!obj || typeof obj !== 'object') return

  for (const [key, value] of Object.entries(obj)) {
    const path = parentPath ? `${parentPath}.${key}` : key

    if (value && typeof value === 'object') {
      const currentType = '$type' in value ? (value.$type as string) : undefined

      // If this object has a $value and the parent type is 'shadow', it's a shadow token
      if ('$value' in value && (currentType === 'shadow' || parentType === 'shadow')) {
        map.set(path, {...value, $type: 'shadow'})
      }
      // If this object has $type but no $value, it's a group - continue with this type
      else if (currentType && !('$value' in value)) {
        collectShadowTokens(value, map, path, currentType)
        continue
      }

      collectShadowTokens(value, map, path, parentType)
    }
  }
}
