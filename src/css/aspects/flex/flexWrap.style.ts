import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'flex-nowrap', {flexWrap: 'nowrap'})
_responsiveRule(util, 'flex-wrap', {flexWrap: 'wrap'})
_responsiveRule(util, 'flex-wrap-reverse', {flexWrap: 'wrap-reverse'})

export const flexWrapStyle: Style = {layers: {util}}
