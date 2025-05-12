import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'auto-flow-row', {gridAutoFlow: 'row'})
_responsiveRule(util, 'auto-flow-column', {gridAutoFlow: 'column'})
_responsiveRule(util, 'auto-flow-row-dense', {gridAutoFlow: 'row dense'})
_responsiveRule(util, 'auto-flow-column-dense', {gridAutoFlow: 'column dense'})

export const gridAutoFlowStyle: Style = {layers: {util}}
