/* eslint-disable no-console */

import {WriteConfig} from '../config'
import {DRY_RUN} from './constants'
import {
  ensureModeExists,
  getFigmaVariables,
  getOrCreateColorVariableCollection,
  setColorVariable,
} from './helpers'
import {prepareSanityUIColorVariables} from './prepareSanityUIColorVariables'

export function writeVars(config: WriteConfig): void {
  const collection = getOrCreateColorVariableCollection('Color')
  const figmaVariables = getFigmaVariables(collection)
  const variables = prepareSanityUIColorVariables(config)

  // make sure modes exist
  const lightMode = ensureModeExists(collection, 'light')
  const darkMode = ensureModeExists(collection, 'dark')

  // remove unknown modes
  for (const m of collection.modes) {
    if (m.name !== 'light' && m.name !== 'dark') {
      collection.removeMode(m.modeId)
    }
  }

  const colorVariableNames: string[] = []

  for (const variable of variables) {
    console.log('set', variable.scheme, `${variable.tone}/${variable.key}`, variable.value)

    const name = setColorVariable(
      collection,
      figmaVariables,
      variable.scheme === 'dark' ? darkMode : lightMode,
      variable,
      {dryRun: DRY_RUN},
    )

    if (name) colorVariableNames.push(name)
  }

  // prune unknown variables

  for (const variable of figmaVariables) {
    if (variable.name === 'dark' || variable.name === 'light') {
      continue
    }

    if (!colorVariableNames.includes(variable.name)) {
      if (DRY_RUN) {
        console.log('remove', variable.name)
      } else {
        variable.remove()
      }
    }
  }
}
