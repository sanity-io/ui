import {_responsiveRule} from '../../_responsiveRule'
import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'border', {border: `1px solid ${vars.color.border}`})
_responsiveRule(util, 'border-t', {borderTop: `1px solid ${vars.color.border}`})
_responsiveRule(util, 'border-r', {borderRight: `1px solid ${vars.color.border}`})
_responsiveRule(util, 'border-b', {borderBottom: `1px solid ${vars.color.border}`})
_responsiveRule(util, 'border-l', {borderLeft: `1px solid ${vars.color.border}`})

export const borderStyle: Style = {layers: {util}}
