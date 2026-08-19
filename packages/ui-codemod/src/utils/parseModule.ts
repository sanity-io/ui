import {readFileSync} from 'node:fs'

import type {API, Collection} from 'jscodeshift'

const parseCache = new Map<string, Collection>()

export function parseModule(j: API['jscodeshift'], filePath: string): Collection | null {
  const cached = parseCache.get(filePath)

  if (cached) {
    return cached
  }

  try {
    const source = readFileSync(filePath, 'utf8')
    const root = j(source)

    parseCache.set(filePath, root)

    return root
  } catch {
    return null
  }
}

/** @internal */
export function clearModuleParseCache(): void {
  parseCache.clear()
}
