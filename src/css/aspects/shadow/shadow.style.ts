import {SHADOW} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

for (const index of SHADOW) {
  if (index === 0) {
    _responsiveRule(util, 'shadow-0', {boxShadow: 'none'})
  } else {
    _responsiveRule(util, `shadow-${index}`, {
      boxShadow: [
        `0 0 0 ${vars.card.shadow.outline} ${vars.color.shadow.outline}`,
        `${vars.shadow[index].umbra} ${vars.color.shadow.umbra}`,
        `${vars.shadow[index].penumbra} ${vars.color.shadow.penumbra}`,
        `${vars.shadow[index].ambient} ${vars.color.shadow.ambient}`,
      ].join(', '),
    })
  }
}

export const shadowStyle: Style = {layers: {util}}
