export function getOrCreateCollection(
  collections: VariableCollection[],
  name: string,
): VariableCollection {
  return collections.find((c) => c.name === name) ?? figma.variables.createVariableCollection(name)
}

export async function loadExistingVariables(collection: VariableCollection): Promise<Variable[]> {
  const variablePromises = collection.variableIds.map((id) =>
    figma.variables.getVariableByIdAsync(id),
  )
  const variables = await Promise.all(variablePromises)
  return variables.filter((v): v is Variable => v !== null)
}

export function buildModeMap(collection: VariableCollection): Record<string, string> {
  return Object.fromEntries(collection.modes.map((mode) => [mode.name, mode.modeId]))
}

export function ensureMode(
  collection: VariableCollection,
  modes: Record<string, string>,
  modeKey: string,
): string {
  if (!modes[modeKey]) {
    const modeId = collection.addMode(modeKey)
    modes[modeKey] = modeId
  }
  return modes[modeKey]
}

export function removeExtraModes(collection: VariableCollection, expectedModes: string[]): void {
  const expectedModeSet = new Set(expectedModes)

  for (const mode of collection.modes) {
    if (!expectedModeSet.has(mode.name)) {
      try {
        collection.removeMode(mode.modeId)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to remove mode "${mode.name}":`, error)
      }
    }
  }
}
