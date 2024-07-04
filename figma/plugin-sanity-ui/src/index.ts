/** Entry point for Figma plugin */

/// <reference types="@figma/plugin-typings" />

import {scopeColors} from './colors/scope'
import {syncColors} from './colors/sync'

async function runCommand(command: string) {
  // console.log('run', command)

  if (command === 'cancel') {
    return figma.closePlugin()
  }

  if (command === 'colors:scope') {
    return scopeColors()
  }
  if (command === 'colors:sync') {
    return syncColors()
  }
}

// Render the plugin UI
figma.showUI(__html__)

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  runCommand(msg.type).catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
  })

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin()
}
