import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'auto-cols-auto', {gridAutoColumns: 'auto'})
_responsiveRule(util, 'auto-cols-min', {gridAutoColumns: 'min-content'})
_responsiveRule(util, 'auto-cols-max', {gridAutoColumns: 'max-content'})
_responsiveRule(util, 'auto-cols-fr', {gridAutoColumns: 'minmax(0, 1fr)'})

export const gridAutoColumnsStyle: Style = {layers: {util}}
