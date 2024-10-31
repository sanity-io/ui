import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'flex-justify-flex-start', {justifyContent: 'flex-start'})
_responsiveRule(util, 'flex-justify-flex-end', {justifyContent: 'flex-end'})
_responsiveRule(util, 'flex-justify-center', {justifyContent: 'center'})
_responsiveRule(util, 'flex-justify-space-between', {justifyContent: 'space-between'})
_responsiveRule(util, 'flex-justify-space-around', {justifyContent: 'space-around'})
_responsiveRule(util, 'flex-justify-space-evenly', {justifyContent: 'space-evenly'})

export const flexJustifyStyle: Style = {layers: {util}}
