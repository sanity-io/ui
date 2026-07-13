import {addons, types} from 'storybook/manager-api'

import {ADDON_ID, PANEL_ID} from './constants'
import {Panel} from './Panel'

export function registerPerformanceAddon() {
  addons.register(ADDON_ID, () => {
    addons.add(PANEL_ID, {
      type: types.PANEL,
      title: 'Performance',
      render: Panel,
    })
  })
}
