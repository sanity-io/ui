import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'cols-1', {gridTemplateColumns: 'repeat(1, 1fr)'})
_responsiveRule(util, 'cols-2', {gridTemplateColumns: 'repeat(2, 1fr)'})
_responsiveRule(util, 'cols-3', {gridTemplateColumns: 'repeat(3, 1fr)'})
_responsiveRule(util, 'cols-4', {gridTemplateColumns: 'repeat(4, 1fr)'})
_responsiveRule(util, 'cols-5', {gridTemplateColumns: 'repeat(5, 1fr)'})
_responsiveRule(util, 'cols-6', {gridTemplateColumns: 'repeat(6, 1fr)'})
_responsiveRule(util, 'cols-7', {gridTemplateColumns: 'repeat(7, 1fr)'})
_responsiveRule(util, 'cols-8', {gridTemplateColumns: 'repeat(8, 1fr)'})
_responsiveRule(util, 'cols-9', {gridTemplateColumns: 'repeat(9, 1fr)'})
_responsiveRule(util, 'cols-10', {gridTemplateColumns: 'repeat(10, 1fr)'})
_responsiveRule(util, 'cols-12', {gridTemplateColumns: 'repeat(12, 1fr)'})

export const gridColumnsStyle: Style = {layers: {util}}
