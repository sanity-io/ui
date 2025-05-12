import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'rows-1', {gridTemplateRows: 'repeat(1, 1fr)'})
_responsiveRule(util, 'rows-2', {gridTemplateRows: 'repeat(2, 1fr)'})
_responsiveRule(util, 'rows-3', {gridTemplateRows: 'repeat(3, 1fr)'})
_responsiveRule(util, 'rows-4', {gridTemplateRows: 'repeat(4, 1fr)'})
_responsiveRule(util, 'rows-5', {gridTemplateRows: 'repeat(5, 1fr)'})
_responsiveRule(util, 'rows-6', {gridTemplateRows: 'repeat(6, 1fr)'})
_responsiveRule(util, 'rows-7', {gridTemplateRows: 'repeat(7, 1fr)'})
_responsiveRule(util, 'rows-8', {gridTemplateRows: 'repeat(8, 1fr)'})
_responsiveRule(util, 'rows-9', {gridTemplateRows: 'repeat(9, 1fr)'})
_responsiveRule(util, 'rows-10', {gridTemplateRows: 'repeat(10, 1fr)'})
_responsiveRule(util, 'rows-12', {gridTemplateRows: 'repeat(12, 1fr)'})

export const gridRowsStyle: Style = {layers: {util}}
