/** Entry point for Figma plugin */

/// <reference types="@figma/plugin-typings" />

import {config} from './config'
import {writeStyles} from './styles/write'
import {writeVars} from './vars/write'

const commands = {
  styles: {
    write: writeStyles,
  },
  vars: {
    write: writeVars,
  },
}

//
figma.showUI(__html__)

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  if (msg.type === 'styles:write') {
    commands.styles.write()
  }

  if (msg.type === 'vars:write') {
    commands.vars.write(config)
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin()
}
