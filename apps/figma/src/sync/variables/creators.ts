export function findOrCreateVariable(
  name: string,
  type: VariableResolvedDataType,
  collection: VariableCollection,
  variablesMap: Map<string, Variable>,
  variableIdsMap: Map<string, string>,
): Variable {
  let variable = variablesMap.get(name)

  if (!variable) {
    variable = figma.variables.createVariable(name, collection, type)
    variablesMap.set(name, variable)
    variableIdsMap.set(name, variable.id)
  }

  return variable
}
