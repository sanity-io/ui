import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'box-border', {boxSizing: 'border-box'})

_responsiveRule(util, 'box-content', {boxSizing: 'content-box'})

export const boxSizingStyle: Style = {layers: {util}}
