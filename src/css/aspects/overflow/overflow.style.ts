import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'overflow-visible', {overflow: 'visible'})
_responsiveRule(util, 'overflow-hidden', {overflow: 'hidden'})
_responsiveRule(util, 'overflow-scroll', {overflow: 'scroll'})
_responsiveRule(util, 'overflow-auto', {overflow: 'auto'})

export const overflowStyle: Style = {layers: {util}}
