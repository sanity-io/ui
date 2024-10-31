import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'f-none', {flex: 'none'})
_responsiveRule(util, 'f-auto', {flex: 'auto'})
_responsiveRule(util, 'f-initial', {flex: 'initial'})
_responsiveRule(util, 'f-1', {flex: 1})
_responsiveRule(util, 'f-2', {flex: 2})
_responsiveRule(util, 'f-3', {flex: 3})
_responsiveRule(util, 'f-4', {flex: 4})
_responsiveRule(util, 'f-5', {flex: 5})
_responsiveRule(util, 'f-6', {flex: 6})
_responsiveRule(util, 'f-7', {flex: 7})
_responsiveRule(util, 'f-8', {flex: 8})
_responsiveRule(util, 'f-9', {flex: 9})
_responsiveRule(util, 'f-10', {flex: 10})
_responsiveRule(util, 'f-11', {flex: 11})
_responsiveRule(util, 'f-12', {flex: 12})

export const flexStyle: Style = {layers: {util}}
