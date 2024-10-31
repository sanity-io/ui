import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'col-auto', {gridColumn: 'auto'})
_responsiveRule(util, 'col-full', {gridColumn: '1 / -1'})
_responsiveRule(util, 'col-1', {gridColumn: 'span 1 / span 1'})
_responsiveRule(util, 'col-2', {gridColumn: 'span 2 / span 2'})
_responsiveRule(util, 'col-3', {gridColumn: 'span 3 / span 3'})
_responsiveRule(util, 'col-4', {gridColumn: 'span 4 / span 4'})
_responsiveRule(util, 'col-5', {gridColumn: 'span 5 / span 5'})
_responsiveRule(util, 'col-6', {gridColumn: 'span 6 / span 6'})
_responsiveRule(util, 'col-7', {gridColumn: 'span 7 / span 7'})
_responsiveRule(util, 'col-8', {gridColumn: 'span 8 / span 8'})
_responsiveRule(util, 'col-9', {gridColumn: 'span 9 / span 9'})
_responsiveRule(util, 'col-10', {gridColumn: 'span 10 / span 10'})
_responsiveRule(util, 'col-12', {gridColumn: 'span 12 / span 12'})

export const gridColumnStyle: Style = {layers: {util}}
