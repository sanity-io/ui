import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'

const util: StyleRules = {}

_responsiveRule(util, 'block', {
  nest: {'&:not([hidden])': {display: 'block'}},
})

_responsiveRule(util, 'flex', {
  nest: {'&:not([hidden])': {display: 'flex'}},
})

_responsiveRule(util, 'grid', {
  nest: {'&:not([hidden])': {display: 'grid'}},
})

_responsiveRule(util, 'inline-block', {
  nest: {'&:not([hidden])': {display: 'inline-block'}},
})

_responsiveRule(util, 'inline-flex', {
  nest: {'&:not([hidden])': {display: 'inline-flex'}},
})

_responsiveRule(util, 'inline-grid', {
  nest: {'&:not([hidden])': {display: 'inline-grid'}},
})

_responsiveRule(util, 'none', {
  nest: {'&:not([hidden])': {display: 'none'}},
})

export const displayStyle: Style = {layers: {util}}
