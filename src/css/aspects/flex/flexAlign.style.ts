import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'flex-align-flex-start', {alignItems: 'flex-start'})
_responsiveRule(util, 'flex-align-flex-end', {alignItems: 'flex-end'})
_responsiveRule(util, 'flex-align-center', {alignItems: 'center'})
_responsiveRule(util, 'flex-align-stretch', {alignItems: 'stretch'})
_responsiveRule(util, 'flex-align-baseline', {alignItems: 'baseline'})

export const flexAlignStyle: Style = {layers: {util}}
