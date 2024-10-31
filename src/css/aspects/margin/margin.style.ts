import {SPACE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

for (const space of SPACE) {
  _responsiveRule(util, `m-${space}`, {margin: vars.space[space]})
}
_responsiveRule(util, `m-auto`, {margin: 'auto'})

for (const space of SPACE) {
  _responsiveRule(util, `mx-${space}`, {
    marginLeft: vars.space[space],
    marginRight: vars.space[space],
  })
}
_responsiveRule(util, `mx-auto`, {
  marginLeft: 'auto',
  marginRight: 'auto',
})

for (const space of SPACE) {
  _responsiveRule(util, `my-${space}`, {
    marginTop: vars.space[space],
    marginBottom: vars.space[space],
  })
}
_responsiveRule(util, `my-auto`, {
  marginTop: 'auto',
  marginBottom: 'auto',
})

for (const i of SPACE) {
  _responsiveRule(util, `mt-${i}`, {marginTop: vars.space[i]})
}
_responsiveRule(util, `mt-auto`, {marginTop: 'auto'})

for (const i of SPACE) {
  _responsiveRule(util, `mr-${i}`, {marginRight: vars.space[i]})
}
_responsiveRule(util, `mr-auto`, {marginRight: 'auto'})

for (const i of SPACE) {
  _responsiveRule(util, `mb-${i}`, {marginBottom: vars.space[i]})
}
_responsiveRule(util, `mb-auto`, {marginBottom: 'auto'})

for (const i of SPACE) {
  _responsiveRule(util, `ml-${i}`, {marginLeft: vars.space[i]})
}
_responsiveRule(util, `ml-auto`, {marginLeft: 'auto'})

export const marginStyle: Style = {layers: {util}}
