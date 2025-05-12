import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'row-end-auto', {gridRowEnd: 'auto'})
_responsiveRule(util, 'row-end-1', {gridRowEnd: '1'})
_responsiveRule(util, 'row-end-2', {gridRowEnd: '2'})
_responsiveRule(util, 'row-end-3', {gridRowEnd: '3'})
_responsiveRule(util, 'row-end-4', {gridRowEnd: '4'})
_responsiveRule(util, 'row-end-5', {gridRowEnd: '5'})
_responsiveRule(util, 'row-end-6', {gridRowEnd: '6'})
_responsiveRule(util, 'row-end-7', {gridRowEnd: '7'})
_responsiveRule(util, 'row-end-8', {gridRowEnd: '8'})
_responsiveRule(util, 'row-end-9', {gridRowEnd: '9'})
_responsiveRule(util, 'row-end-10', {gridRowEnd: '10'})
_responsiveRule(util, 'row-end-11', {gridRowEnd: '11'})
_responsiveRule(util, 'row-end-12', {gridRowEnd: '12'})

export const gridRowEndStyle: Style = {layers: {util}}
