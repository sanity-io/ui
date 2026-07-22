/** Entry point for Figma plugin */

/// <reference types="@figma/plugin-typings" />

import {COLOR_HUES, COLOR_TINTS, config, HSL, hslToRgb} from '@sanity/color'

interface VariableNode {
  variable: Variable
  name: string
}

figma.showUI(__html__)

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
// oxlint-disable-next-line prefer-add-event-listener
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'variables:sync') {
    const localVariableCollections = await figma.variables.getLocalVariableCollectionsAsync()

    const collectionVariables = await Promise.all(
      localVariableCollections.map(async (collection) => {
        const variables = await Promise.all(
          collection.variableIds.map((variableId) =>
            figma.variables.getVariableByIdAsync(variableId),
          ),
        )

        return {
          collection,
          variables: variables.flatMap<VariableNode>((variable) =>
            variable ? [{variable, name: variable.name}] : [],
          ),
        }
      }),
    )

    for (const {collection, variables} of collectionVariables) {
      _syncFigmaColorVariable({
        collection,
        hsl: config.black.hsl,
        name: 'black',
        nodes: variables,
      })

      _syncFigmaColorVariable({
        collection,
        hsl: config.white.hsl,
        name: 'white',
        nodes: variables,
      })

      // hues
      for (const hueKey of COLOR_HUES) {
        const {tints} = config[hueKey]

        for (const tintKey of COLOR_TINTS) {
          const tint = tints[tintKey]
          const variableName = `${hueKey}/${tintKey}`

          _syncFigmaColorVariable({
            collection,
            hsl: tint.hsl,
            name: variableName,
            nodes: variables,
          })
        }
      }
    }
  }

  if (msg.type === 'styles:sync') {
    const localStyles = await figma.getLocalPaintStylesAsync()

    // black
    _syncFigmaColor({
      localStyles,
      hsl: config.black.hsl,
      title: 'Sanity Black',
    })

    // white
    _syncFigmaColor({
      localStyles,
      hsl: config.white.hsl,
      title: 'Sanity White',
    })

    // hues
    for (const hueKey of COLOR_HUES) {
      const {tints} = config[hueKey]

      for (const tintKey of COLOR_TINTS) {
        const tint = tints[tintKey]

        const colorTitle = hueKey.slice(0, 1).toUpperCase()
        const styleTitle = `Sanity ${colorTitle}${hueKey.slice(1)}/${tintKey}`

        _syncFigmaColor({
          localStyles,
          hsl: tint.hsl,
          title: styleTitle,
        })
      }
    }
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin()
}

function _syncFigmaColor(options: {localStyles: PaintStyle[]; hsl: HSL; title: string}) {
  const {localStyles, hsl, title} = options

  const rgb = hslToRgb(hsl)

  const existingStyle = localStyles.find((s) => s.name === title)
  const style = existingStyle || figma.createPaintStyle()

  style.name = title

  const solid: SolidPaint = {
    type: 'SOLID',
    color: {
      r: rgb[0] / 255,
      g: rgb[1] / 255,
      b: rgb[2] / 255,
    },
  }

  style.paints = [solid]
}

function _syncFigmaColorVariable(options: {
  collection: VariableCollection
  hsl: HSL
  name: string
  nodes: VariableNode[]
}) {
  const {collection, hsl, name, nodes} = options
  const rgb = hslToRgb(hsl)
  const node = nodes.find((v) => v.name === name)
  const modeId = collection.modes[0].modeId

  if (!modeId) {
    throw new Error('No modeId')
  }

  if (node) {
    // oxlint-disable-next-line no-console
    console.log('update', name)

    node.variable.setValueForMode(modeId, {
      r: rgb[0] / 255,
      g: rgb[1] / 255,
      b: rgb[2] / 255,
    })
  } else {
    // oxlint-disable-next-line no-console
    console.log('create', name)

    const variable = figma.variables.createVariable(name, collection, 'COLOR')

    variable.setValueForMode(modeId, {
      r: rgb[0] / 255,
      g: rgb[1] / 255,
      b: rgb[2] / 255,
    })
  }
}
