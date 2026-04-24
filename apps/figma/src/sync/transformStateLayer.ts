type TokenObject = Record<string, unknown>

/**
 * Creates state token sets from a nested token structure.
 * Hoists children at the specified path into separate state token sets.
 *
 * State keys are inferred from the token structure:
 * - Every non-$ key at the statePath is treated as a state
 * - Object key order determines state order
 * - All states must have matching shapes (same token paths)
 *
 * @example
 * Input tokens:
 * ```json
 * {
 *   "selectable": {
 *     "color": {
 *       "enabled": { "bg": "...", "fg": "..." },
 *       "hovered": { "bg": "...", "fg": "..." }
 *     }
 *   }
 * }
 * ```
 *
 * With path `['selectable', 'color']` returns:
 * ```json
 * {
 *   "enabled": {
 *     "selectable": { "color": { "bg": "...", "fg": "..." } }
 *   },
 *   "hovered": {
 *     "selectable": { "color": { "bg": "...", "fg": "..." } }
 *   }
 * }
 * ```
 *
 * @internal
 */
export function createStateTokenSetsFromPath(options: {
  tokenSet: object
  path: readonly string[]
}): Record<string, object> {
  const {tokenSet, path} = options

  // Validate path is not empty
  if (path.length === 0) {
    throw new Error('Unable to create state token sets: state path cannot be empty')
  }

  const group = getAtPath(tokenSet, path)

  if (!isRecord(group)) {
    throw new Error(`Unable to create state token sets: path not found: ${path.join('.')}`)
  }

  // Infer state keys from direct children
  // Every non-$ key at statePath is treated as a Figma state mode
  const stateKeys = Object.keys(group).filter((key) => !key.startsWith('$'))

  if (stateKeys.length === 0) {
    throw new Error(`Unable to create state token sets: no state keys found at ${path.join('.')}`)
  }

  // Validate that all state keys point to objects
  for (const key of stateKeys) {
    if (!isRecord(group[key])) {
      throw new Error(
        `Unable to create state token sets: expected state "${key}" at ${path.join('.')} to be an object`,
      )
    }
  }

  // Preserve metadata from the group (e.g., $type, $description)
  const groupMetadata = Object.fromEntries(
    Object.entries(group).filter(([key]) => key.startsWith('$') && key !== '$value'),
  )

  const result: Record<string, object> = {}

  // Iterate over inferred state keys to preserve object key order
  for (const state of stateKeys) {
    const stateValue = group[state]

    if (!isRecord(stateValue)) {
      throw new Error(
        `Unable to create state token sets: expected state "${state}" at ${path.join('.')} to be an object`,
      )
    }

    const projectedTokenSet: TokenObject = {}

    setAtPath(projectedTokenSet, path, {
      ...groupMetadata,
      ...stateValue,
    })

    result[state] = projectedTokenSet
  }

  validateStateShapes(result, path)

  return result
}

function getAtPath(obj: unknown, path: readonly string[]): unknown {
  let current = obj

  for (const key of path) {
    if (!isRecord(current)) return undefined
    current = current[key]
  }

  return current
}

function setAtPath(obj: TokenObject, path: readonly string[], value: unknown): void {
  let current = obj

  for (const key of path.slice(0, -1)) {
    const existing = current[key]

    if (!isRecord(existing)) {
      current[key] = {}
    }

    current = current[key] as TokenObject
  }

  current[path[path.length - 1]] = value
}

function isRecord(value: unknown): value is TokenObject {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function validateStateShapes(
  stateTokenSets: Record<string, object>,
  path: readonly string[],
) {
  const entries = Object.entries(stateTokenSets)
  const [firstState, firstTokenSet] = entries[0]

  const expectedPaths = getLeafPaths(firstTokenSet).sort()

  // Ensure states contain at least one token leaf
  if (expectedPaths.length === 0) {
    throw new Error(
      `Unable to create state token sets: state "${firstState}" at ${path.join('.')} contains no token leaves`,
    )
  }

  for (const [stateName, tokenSet] of entries.slice(1)) {
    const actualPaths = getLeafPaths(tokenSet).sort()

    const missing = expectedPaths.filter((p) => !actualPaths.includes(p))
    const extra = actualPaths.filter((p) => !expectedPaths.includes(p))

    if (missing.length > 0 || extra.length > 0) {
      throw new Error(
        [
          `State token shape mismatch at ${path.join('.')}.`,
          `State "${stateName}" does not match state "${firstState}".`,
          missing.length > 0 ? `Missing: ${missing.join(', ')}` : undefined,
          extra.length > 0 ? `Extra: ${extra.join(', ')}` : undefined,
        ]
          .filter(Boolean)
          .join('\n'),
      )
    }
  }
}

function getLeafPaths(obj: object, parentPath = ''): string[] {
  const paths: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue

    const path = parentPath ? `${parentPath}/${key}` : key

    // Check if this is a token leaf (has $value)
    if (isRecord(value) && '$value' in value) {
      paths.push(path)
      continue
    }

    // Recurse into nested objects (but not token leaves)
    if (isRecord(value)) {
      paths.push(...getLeafPaths(value, path))
      continue
    }

    // Primitive non-object leaves count as token paths
    // (e.g., string, number, boolean values used directly)
    paths.push(path)
  }

  return paths
}
