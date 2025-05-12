import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'row-start-auto', {gridRowStart: 'auto'})
_responsiveRule(util, 'row-start-1', {gridRowStart: '1'})
_responsiveRule(util, 'row-start-2', {gridRowStart: '2'})
_responsiveRule(util, 'row-start-3', {gridRowStart: '3'})
_responsiveRule(util, 'row-start-4', {gridRowStart: '4'})
_responsiveRule(util, 'row-start-5', {gridRowStart: '5'})
_responsiveRule(util, 'row-start-6', {gridRowStart: '6'})
_responsiveRule(util, 'row-start-7', {gridRowStart: '7'})
_responsiveRule(util, 'row-start-8', {gridRowStart: '8'})
_responsiveRule(util, 'row-start-9', {gridRowStart: '9'})
_responsiveRule(util, 'row-start-10', {gridRowStart: '10'})
_responsiveRule(util, 'row-start-11', {gridRowStart: '11'})
_responsiveRule(util, 'row-start-12', {gridRowStart: '12'})

export const gridRowStartStyle: Style = {layers: {util}}
