// import {_drawOverview} from './actions/overview/draw'
// import {_syncVariables} from './actions/variables/sync'
// import {_importConfig} from './actions/config/import'
// import {_syncConfig} from './actions/config/sync'
// import {_syncConfig2} from './actions/config/sync2'

figma.showUI(__html__, {
  themeColors: true,
})

figma.ui.onmessage = (msg) => {
  // if (msg.type === 'variables:sync') {
  //   _syncVariables()
  // }

  if (msg.type === 'config:import') {
    // _importConfig()
  }

  if (msg.type === 'config:sync') {
    // _syncConfig()
  }

  if (msg.type === 'config:sync2') {
    // _syncConfig2()
  }

  // if (msg.type === 'overview:draw') {
  //   _drawOverview()
  // }

  figma.closePlugin()
}
