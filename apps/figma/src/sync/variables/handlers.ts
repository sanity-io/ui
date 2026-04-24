import type {Alias, SanityFigmaVar} from '../types'
import {handleColorAliasVariable, handleColorVariable} from './color'
import {handleNumberAliasVariable, handleNumberVariable} from './number'
import {handleStringAliasVariable, handleStringVariable} from './string'

type VariableHandler = (
  figmaVar: SanityFigmaVar,
  modeId: string,
  collection: VariableCollection,
  variablesMap: Map<string, Variable>,
  variableIdsMap: Map<string, string>,
  aliases: Alias[],
  hidden: boolean,
  disableCache: boolean,
  disableScopes: boolean,
) => void

const handlers: Record<string, VariableHandler> = {
  'color': handleColorVariable,
  'color-alias': handleColorAliasVariable,
  'number': handleNumberVariable,
  'number-alias': handleNumberAliasVariable,
  'string': handleStringVariable,
  'string-alias': handleStringAliasVariable,
}

function getVariableHandler(type: string): VariableHandler {
  if (!handlers[type]) {
    throw new Error(`Unknown variable type: ${type}`)
  }

  return handlers[type]
}

export function createOrUpdateVariable(
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
  const handler = getVariableHandler(figmaVar.value.type)
  handler(
    figmaVar,
    modeId,
    collection,
    variablesMap,
    variableIdsMap,
    aliases,
    hidden,
    disableCache,
    disableScopes,
  )
}
