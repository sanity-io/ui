// import {type Style, type StyleRules, vars} from '@sanity/css'
// import {SPACE} from '@sanity/theme'

import {SPACE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const util: StyleRules = {}

for (const space of SPACE) {
  _responsiveRule(util, `m-${space}`, {margin: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `mx-${space}`, {
    marginLeft: vars.space[space],
    marginRight: vars.space[space],
  })
}

for (const space of SPACE) {
  _responsiveRule(util, `my-${space}`, {
    marginTop: vars.space[space],
    marginBottom: vars.space[space],
  })
}

for (const space of SPACE) {
  _responsiveRule(util, `mt-${space}`, {marginTop: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `mr-${space}`, {marginRight: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `mb-${space}`, {marginBottom: vars.space[space]})
}

for (const space of SPACE) {
  _responsiveRule(util, `ml-${space}`, {marginLeft: vars.space[space]})
}

export const marginStyle: Style = {layers: {util}}
