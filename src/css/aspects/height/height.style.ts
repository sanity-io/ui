import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'h-fill', {height: '100%'})
_responsiveRule(util, 'h-stretch', {height: 'stretch'})

export const heightStyle: Style = {layers: {util}}
