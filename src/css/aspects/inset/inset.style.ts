import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'inset-0', {top: 0, left: 0, right: 0, bottom: 0})
_responsiveRule(util, 'top-0', {top: 0})
_responsiveRule(util, 'right-0', {right: 0})
_responsiveRule(util, 'bottom-0', {bottom: 0})
_responsiveRule(util, 'left-0', {left: 0})

export const insetStyle: Style = {layers: {util}}
