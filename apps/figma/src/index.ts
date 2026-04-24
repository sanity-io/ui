import {sync} from './sync/sync'

figma.showUI(__html__)

figma.ui.onmessage = (msg: {type: string; disableCache?: boolean; disableScopes?: boolean}) => {
  if (msg.type === 'sync') {
    sync({
      disableCache: msg.disableCache ?? false,
      disableScopes: msg.disableScopes ?? false,
    })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      })
      .finally(() => {
        figma.closePlugin()
      })
    return
  }

  if (msg.type === 'cancel') {
    figma.closePlugin()
    return
  }
}
