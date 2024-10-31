import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'f-row', {flexDirection: 'row'})
_responsiveRule(util, 'f-column', {flexDirection: 'column'})
// _responsiveRule(util, 'f-row-reverse', {flexDirection: 'row-reverse'})
// _responsiveRule(util, 'f-column-reverse', {flexDirection: 'column-reverse'})

export const flexDirectionStyle: Style = {layers: {util}}
