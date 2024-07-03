/* eslint-disable no-console */

import {parseColor} from '@sanity/ui/theme'
import {FigmaSanityUIColorVariable} from './types'

export function getOrCreateColorVariableCollection(name: string): VariableCollection {
  const localVariableCollections = figma.variables.getLocalVariableCollections()

  let colorCollection = localVariableCollections.find((c) => c.name === name)

  if (!colorCollection) {
    colorCollection = figma.variables.createVariableCollection(name)
  }

  return colorCollection
}

export function getFigmaVariables(collection: VariableCollection): Variable[] {
  return collection.variableIds.map((id) => figma.variables.getVariableById(id)!)
}

export function setColorVariable(
  collection: VariableCollection,
  figmaVariables: Variable[],
  modeId: string,
  variable: FigmaSanityUIColorVariable,
  options?: {dryRun?: boolean},
): string | undefined {
  const key = `${variable.tone}/${variable.key}`

  try {
    const {r, g, b, a} = parseColor(variable.value)

    if (options?.dryRun) {
      return key
    }

    const figmaVariable = getOrCreateColorVariable(collection, figmaVariables, key)

    if (typeof variable.value !== 'string') {
      console.warn(`invalid color value for ${key}[${modeId}]: ${variable.value}`)

      return
    }

    figmaVariable.setValueForMode(modeId, {
      r: r / 255,
      g: g / 255,
      b: b / 255,
      a: a ?? 1,
    })

    return key
  } catch (err) {
    console.error('variable', variable)
    console.error(err)

    return undefined
  }
}

export function ensureModeExists(collection: VariableCollection, modeName: string): string {
  let mode = collection.modes.find((m) => m.name === modeName)

  if (!mode) {
    collection.addMode(modeName)
    mode = collection.modes.find((m) => m.name === modeName)!
  }

  return mode.modeId
}

function getOrCreateColorVariable(
  collection: VariableCollection,
  figmaVariables: Variable[],
  variableName: string,
): Variable {
  let variable = figmaVariables.find((v) => v.name === variableName)

  if (!variable) {
    variable = figma.variables.createVariable(variableName, collection.id, 'COLOR')
    figmaVariables.push(variable)
  }

  return variable
}
