import type {Alias, SanityFigmaVar} from '../types'
import {findOrCreateVariable} from './creators'

export function handleStringVariable(
  figmaVar: SanityFigmaVar,
  modeId: string,
  collection: VariableCollection,
  variablesMap: Map<string, Variable>,
  variableIdsMap: Map<string, string>,
  _aliases: Alias[],
  hidden: boolean,
  disableCache: boolean,
): void {
  if (figmaVar.value.type !== 'string') return

  const variable = findOrCreateVariable(
    figmaVar.name,
    'STRING',
    collection,
    variablesMap,
    variableIdsMap,
  )

  const cacheKey = JSON.stringify({
    hidden,
    value: figmaVar.value.value,
    scopes: figmaVar.scopes,
  })

  if (!disableCache && variable.getPluginData('sanity-ui-tokens') === cacheKey) {
    return
  }

  try {
    variable.setValueForMode(modeId, figmaVar.value.value)
    variable.scopes = figmaVar.scopes
    variable.hiddenFromPublishing = hidden
    variable.setPluginData('sanity-ui-tokens', cacheKey)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(figmaVar)
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export function handleStringAliasVariable(
  figmaVar: SanityFigmaVar,
  modeId: string,
  collection: VariableCollection,
  variablesMap: Map<string, Variable>,
  variableIdsMap: Map<string, string>,
  aliases: Alias[],
  hidden: boolean,
  disableCache: boolean,
): void {
  if (figmaVar.value.type !== 'string-alias') return

  const variable = findOrCreateVariable(
    figmaVar.name,
    'STRING',
    collection,
    variablesMap,
    variableIdsMap,
  )

  const cacheKey = JSON.stringify({
    hidden,
    target: figmaVar.value.target,
    scopes: figmaVar.scopes,
  })

  if (!disableCache && variable.getPluginData('sanity-ui-tokens') === cacheKey) {
    return
  }

  try {
    variable.scopes = figmaVar.scopes
    variable.hiddenFromPublishing = hidden
    variable.setPluginData('sanity-ui-tokens', cacheKey)

    // Store the alias for later resolution and update cache
    aliases.push({variable, modeId, target: figmaVar.value.target})
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(figmaVar)
    // eslint-disable-next-line no-console
    console.error(error)
  }
}
