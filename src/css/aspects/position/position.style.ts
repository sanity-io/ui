import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'position-absolute', {position: 'absolute'})
_responsiveRule(util, 'position-fixed', {position: 'fixed'})
_responsiveRule(util, 'position-relative', {position: 'relative'})
_responsiveRule(util, 'position-static', {position: 'static'})
_responsiveRule(util, 'position-sticky', {position: 'sticky'})

export const positionStyle: Style = {layers: {util}}
