import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const util: StyleRules = {}

_responsiveRule(util, 'r-0', {borderRadius: vars.radius[0]})
_responsiveRule(util, 'r-1', {borderRadius: vars.radius[1]})
_responsiveRule(util, 'r-2', {borderRadius: vars.radius[2]})
_responsiveRule(util, 'r-3', {borderRadius: vars.radius[3]})
_responsiveRule(util, 'r-4', {borderRadius: vars.radius[4]})
_responsiveRule(util, 'r-5', {borderRadius: vars.radius[5]})
_responsiveRule(util, 'r-6', {borderRadius: vars.radius[6]})
_responsiveRule(util, 'r-full', {borderRadius: '9999px'})

export const radiusStyle: Style = {layers: {util}}
