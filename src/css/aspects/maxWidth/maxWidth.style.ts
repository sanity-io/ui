import {_responsiveRule} from '../../_responsiveRule'
import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'max-w-0', {maxWidth: vars.container[0]})
_responsiveRule(util, 'max-w-1', {maxWidth: vars.container[1]})
_responsiveRule(util, 'max-w-2', {maxWidth: vars.container[2]})
_responsiveRule(util, 'max-w-3', {maxWidth: vars.container[3]})
_responsiveRule(util, 'max-w-4', {maxWidth: vars.container[4]})
_responsiveRule(util, 'max-w-5', {maxWidth: vars.container[5]})
_responsiveRule(util, 'max-w-auto', {maxWidth: 'none'})
_responsiveRule(util, 'max-w-fill', {maxWidth: '100%'})

export const maxWidthStyle: Style = {layers: {util}}
