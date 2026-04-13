import type {Alias} from './types'

export function resolveAliases(aliases: Alias[], variableIdsMap: Map<string, string>): void {
  for (const alias of aliases) {
    const targetId = variableIdsMap.get(alias.target)

    if (!targetId) {
      // eslint-disable-next-line no-console
      console.warn(`Target variable not found: ${alias.target}`)
      continue
    }

    alias.variable.setValueForMode(alias.modeId, {
      type: 'VARIABLE_ALIAS',
      id: targetId,
    })
  }
}
