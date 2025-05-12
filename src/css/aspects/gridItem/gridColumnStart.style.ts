import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'col-start-auto', {gridColumnStart: 'auto'})
_responsiveRule(util, 'col-start-1', {gridColumnStart: '1'})
_responsiveRule(util, 'col-start-2', {gridColumnStart: '2'})
_responsiveRule(util, 'col-start-3', {gridColumnStart: '3'})
_responsiveRule(util, 'col-start-4', {gridColumnStart: '4'})
_responsiveRule(util, 'col-start-5', {gridColumnStart: '5'})
_responsiveRule(util, 'col-start-6', {gridColumnStart: '6'})
_responsiveRule(util, 'col-start-7', {gridColumnStart: '7'})
_responsiveRule(util, 'col-start-8', {gridColumnStart: '8'})
_responsiveRule(util, 'col-start-9', {gridColumnStart: '9'})
_responsiveRule(util, 'col-start-10', {gridColumnStart: '10'})
_responsiveRule(util, 'col-start-11', {gridColumnStart: '11'})
_responsiveRule(util, 'col-start-12', {gridColumnStart: '12'})

export const gridColumnStartStyle: Style = {layers: {util}}
