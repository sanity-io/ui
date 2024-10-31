import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'min-h-0', {minHeight: '0'})
_responsiveRule(util, 'min-h-full', {minHeight: '100%'})

export const minHeightStyle: Style = {layers: {util}}
