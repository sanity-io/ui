import {SPACE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

for (const space of SPACE) {
  _responsiveRule(util, `p-${space}`, {padding: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `px-${space}`, {
    paddingLeft: vars.space[space],
    paddingRight: vars.space[space],
  })
}

for (const space of SPACE) {
  _responsiveRule(util, `py-${space}`, {
    paddingTop: vars.space[space],
    paddingBottom: vars.space[space],
  })
}

for (const space of SPACE) {
  _responsiveRule(util, `pt-${space}`, {paddingTop: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `pr-${space}`, {paddingRight: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `pb-${space}`, {paddingBottom: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `pl-${space}`, {paddingLeft: vars.space[space]})
}

export const paddingStyle: Style = {layers: {util}}
