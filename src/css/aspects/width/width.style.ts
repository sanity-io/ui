import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, `w-fill`, {
  // @ts-expect-error - TODO: fix this
  width: ['-moz-available', '-webkit-fill-available', 'stretch'],
})

export const widthStyle: Style = {layers: {util}}
