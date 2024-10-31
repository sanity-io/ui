import {SHADOW} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const util: StyleRules = {}

for (const shadow of SHADOW) {
  if (shadow === 0) {
    _responsiveRule(util, 'shadow-0', {boxShadow: 'none'})
  } else {
    _responsiveRule(util, `shadow-${shadow}`, {
      boxShadow: [
        `0 0 0 ${vars.card.shadow.outline} ${vars.color.shadow.outline}`,
        `${vars.shadow[shadow].umbra} ${vars.color.shadow.umbra}`,
        `${vars.shadow[shadow].penumbra} ${vars.color.shadow.penumbra}`,
        `${vars.shadow[shadow].ambient} ${vars.color.shadow.ambient}`,
      ].join(', '),
    })
  }
}

export const shadowStyle: Style = {layers: {util}}
