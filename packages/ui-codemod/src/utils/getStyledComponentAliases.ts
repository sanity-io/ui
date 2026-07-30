import type {API, Collection} from 'jscodeshift'

import {getStyledComponentName} from './getStyledComponentName'

export function getStyledComponentAliases(
  j: API['jscodeshift'],
  root: Collection,
  localNames: Iterable<string>,
): Set<string> {
  const aliases = new Set<string>()
  const names = new Set(localNames)

  root.find(j.VariableDeclarator).forEach((path) => {
    const {id, init} = path.node

    if (!init || id.type !== 'Identifier') {
      return
    }

    const baseComponent = getStyledComponentName(init)

    if (baseComponent && names.has(baseComponent)) {
      aliases.add(id.name)
    }
  })

  return aliases
}
