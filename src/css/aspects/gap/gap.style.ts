import {SPACE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const util: StyleRules = {}

for (const space of SPACE) {
  _responsiveRule(util, `g-${space}`, {gap: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `gx-${space}`, {columnGap: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `gy-${space}`, {rowGap: vars.space[space]})
}

export const gapStyle: Style = {layers: {util}}
