import {system} from '@sanity/ui-tokens'

import {createOrUpdateStyle} from '../styles/handlers'
import type {Alias} from '../types'
import type {SanityFigmaStyle} from '../types/styles'
import {createOrUpdateVariable} from '../variables/handlers'
import {resolveAliases} from './aliases'
import {
  buildModeMap,
  ensureMode,
  getOrCreateCollection,
  loadExistingVariables,
  removeExtraModes,
} from './collections'
import {findEntities} from './findEntities'

export async function sync(options: {disableCache?: boolean}) {
  const localCollections = await figma.variables.getLocalVariableCollectionsAsync()
  const allVariablesMap = new Map<string, Variable>()
  const allVariableIdsMap = new Map<string, string>()
  const allFigmaStyles: SanityFigmaStyle[] = []

  for (const _collection of Object.values(system.collections)) {
    let collection: VariableCollection | undefined
    let variablesArray: Variable[] | undefined
    let variablesMap: Map<string, Variable> | undefined
    let variableIdsMap: Map<string, string> | undefined

    let modes: Record<string, string> | undefined

    const aliases: Alias[] = []

    // Get all expected mode keys for this collection
    const expectedModes = Object.keys(_collection.modes)

    for (const [modeKey, modeValues] of Object.entries(_collection.modes)) {
      const {figmaVars, figmaStyles} = findEntities(modeValues)

      if (figmaVars.length > 0) {
        if (!collection || !variablesMap || !variableIdsMap || !modes) {
          collection = getOrCreateCollection(localCollections, _collection.title)
          variablesArray = await loadExistingVariables(collection)
          // Convert array to Maps for O(1) lookups
          variablesMap = new Map(variablesArray.map((v) => [v.name, v]))
          variableIdsMap = new Map(variablesArray.map((v) => [v.name, v.id]))
          modes = buildModeMap(collection)
        }
        const modeId = ensureMode(collection, modes!, modeKey)

        // eslint-disable-next-line no-console
        console.log(
          `Processing ${figmaVars.length} variables for ${_collection.title}/${modeKey}...`,
        )

        for (const figmaVar of figmaVars) {
          createOrUpdateVariable(
            figmaVar,
            modeId,
            collection,
            variablesMap,
            variableIdsMap,
            aliases,
            _collection.namespace.startsWith('_'),
            options.disableCache ?? false,
          )
        }
      }

      allFigmaStyles.push(...figmaStyles)
    }

    if (collection) {
      // Remove any modes that aren't in our expected list (e.g., "Mode 1")
      removeExtraModes(collection, expectedModes)
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

    // Use ID map for faster alias resolution
    resolveAliases(aliases, allVariableIdsMap)
  }

  if (allFigmaStyles.length > 0) {
    // eslint-disable-next-line no-console
    console.log(`Processing ${allFigmaStyles.length} styles...`)

    for (const figmaStyle of allFigmaStyles) {
      await createOrUpdateStyle(figmaStyle, allVariableIdsMap, options.disableCache ?? false)
    }
  }
}
