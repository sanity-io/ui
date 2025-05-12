import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'row-auto', {gridRow: 'auto'})
_responsiveRule(util, 'row-full', {gridRow: '1 / -1'})
_responsiveRule(util, 'row-1', {gridRow: 'span 1 / span 1'})
_responsiveRule(util, 'row-2', {gridRow: 'span 2 / span 2'})
_responsiveRule(util, 'row-3', {gridRow: 'span 3 / span 3'})
_responsiveRule(util, 'row-4', {gridRow: 'span 4 / span 4'})
_responsiveRule(util, 'row-5', {gridRow: 'span 5 / span 5'})
_responsiveRule(util, 'row-6', {gridRow: 'span 6 / span 6'})
_responsiveRule(util, 'row-7', {gridRow: 'span 7 / span 7'})
_responsiveRule(util, 'row-8', {gridRow: 'span 8 / span 8'})
_responsiveRule(util, 'row-9', {gridRow: 'span 9 / span 9'})
_responsiveRule(util, 'row-10', {gridRow: 'span 10 / span 10'})
_responsiveRule(util, 'row-12', {gridRow: 'span 12 / span 12'})

export const gridRowStyle: Style = {layers: {util}}
