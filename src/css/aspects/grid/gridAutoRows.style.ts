import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'auto-rows-auto', {gridAutoRows: 'auto'})
_responsiveRule(util, 'auto-rows-min', {gridAutoRows: 'min-content'})
_responsiveRule(util, 'auto-rows-max', {gridAutoRows: 'max-content'})
_responsiveRule(util, 'auto-rows-fr', {gridAutoRows: 'minmax(0, 1fr)'})

export const gridAutoRowsStyle: Style = {layers: {util}}
