import type {Alias, SanityFigmaVar} from '../types'
import {findOrCreateVariable} from './creators'

export function handleColorVariable(
  figmaVar: SanityFigmaVar,
  modeId: string,
  collection: VariableCollection,
  variablesMap: Map<string, Variable>,
  variableIdsMap: Map<string, string>,
  _aliases: Alias[],
  hidden: boolean,
  disableCache: boolean,
  disableScopes: boolean,
): void {
  if (figmaVar.value.type !== 'color') return

  const variable = findOrCreateVariable(
    figmaVar.name,
    'COLOR',
    collection,
    variablesMap,
    variableIdsMap,
  )

  const value =
    typeof figmaVar.value.a === 'number'
      ? {r: figmaVar.value.r, g: figmaVar.value.g, b: figmaVar.value.b, a: figmaVar.value.a}
      : {r: figmaVar.value.r, g: figmaVar.value.g, b: figmaVar.value.b}

  const scopes: VariableScope[] = disableScopes ? ['ALL_SCOPES'] : figmaVar.scopes

  const cacheKey = JSON.stringify({modeId, hidden, scopes, value})

  if (!disableCache && variable.getPluginData('sanity-ui-tokens') === cacheKey) {
    return
  }

  try {
    variable.setValueForMode(modeId, value)
    variable.scopes = scopes
    variable.hiddenFromPublishing = hidden
    variable.setPluginData('sanity-ui-tokens', cacheKey)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(figmaVar)
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export function handleColorAliasVariable(
  figmaVar: SanityFigmaVar,
  modeId: string,
  collection: VariableCollection,
  variablesMap: Map<string, Variable>,
  variableIdsMap: Map<string, string>,
  aliases: Alias[],
  hidden: boolean,
  disableCache: boolean,
  disableScopes: boolean,
): void {
  if (figmaVar.value.type !== 'color-alias') return

  const variable = findOrCreateVariable(
    figmaVar.name,
    'COLOR',
    collection,
    variablesMap,
    variableIdsMap,
  )

  const scopes: VariableScope[] = disableScopes ? ['ALL_SCOPES'] : figmaVar.scopes

  const target = figmaVar.value.target

  const cacheKey = JSON.stringify({modeId, hidden, scopes, target})

  if (!disableCache && variable.getPluginData('sanity-ui-tokens') === cacheKey) {
    return
  }

  try {
    variable.scopes = scopes
    variable.hiddenFromPublishing = hidden
    variable.setPluginData('sanity-ui-tokens', cacheKey)

    // Store the alias for later resolution and update cache
    aliases.push({variable, modeId, target})
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(figmaVar)
    // eslint-disable-next-line no-console
    console.error(error)
  }
}
