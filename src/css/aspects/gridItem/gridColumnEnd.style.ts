import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'col-end-auto', {gridColumnEnd: 'auto'})
_responsiveRule(util, 'col-end-1', {gridColumnEnd: '1'})
_responsiveRule(util, 'col-end-2', {gridColumnEnd: '2'})
_responsiveRule(util, 'col-end-3', {gridColumnEnd: '3'})
_responsiveRule(util, 'col-end-4', {gridColumnEnd: '4'})
_responsiveRule(util, 'col-end-5', {gridColumnEnd: '5'})
_responsiveRule(util, 'col-end-6', {gridColumnEnd: '6'})
_responsiveRule(util, 'col-end-7', {gridColumnEnd: '7'})
_responsiveRule(util, 'col-end-8', {gridColumnEnd: '8'})
_responsiveRule(util, 'col-end-9', {gridColumnEnd: '9'})
_responsiveRule(util, 'col-end-10', {gridColumnEnd: '10'})
_responsiveRule(util, 'col-end-11', {gridColumnEnd: '11'})
_responsiveRule(util, 'col-end-12', {gridColumnEnd: '12'})

export const gridColumnEndStyle: Style = {layers: {util}}
