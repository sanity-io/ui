// import {type Style, type StyleRules, vars} from '@sanity/css'
// import {SPACE} from '@sanity/theme'

import {SPACE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

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
